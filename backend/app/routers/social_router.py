import logging
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, Response
from app.schemas.schemas import (
    PostGenerationRequest, GenerationResponse, HistoryResponse,
    FavoriteRequest, RegenerateRequest, ExportRequest
)
from app.services.social_service import social_service
from app.utils.exporter import export_to_pdf, export_to_txt
from app.auth.auth import get_current_user
from app.models.models import User

logger = logging.getLogger("social_router")
router = APIRouter()

@router.post("/generate", response_model=GenerationResponse)
async def generate_posts(req: PostGenerationRequest, current_user: User = Depends(get_current_user)):
    try:
        return await social_service.generate_campaign(req)
    except Exception as e:
        logger.error(f"AI Campaign Generation Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="AI Campaign Generation service failed. Please try again."
        )

@router.post("/regenerate", response_model=List[dict])
async def regenerate_post(req: RegenerateRequest, current_user: User = Depends(get_current_user)):
    try:
        res = await social_service.regenerate_variation(req.id, req.variation_index)
        return res["posts"]
    except Exception as e:
        logger.error(f"Variation Regeneration Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Variation Regeneration failed."
        )

@router.get("/history", response_model=List[HistoryResponse])
async def get_history_logs(current_user: User = Depends(get_current_user)):
    history_entries = await social_service.get_history()
    results = []
    for entry in history_entries:
        posts_list = entry.generated_content.get("posts", []) if isinstance(entry.generated_content, dict) else entry.generated_content
        results.append(
            HistoryResponse(
                id=str(entry.id),
                topic=entry.topic,
                description=entry.description,
                platform=entry.platform or "",
                tone=entry.tone or "",
                campaign_goal=entry.campaign_goal or "",
                target_audience=entry.target_audience,
                generated_content=posts_list,
                image_prompt=entry.image_prompt,
                favorite=entry.favorite,
                created_at=entry.created_at
            )
        )
    return results

@router.delete("/history/{id}", status_code=status.HTTP_200_OK)
async def delete_log_entry(id: str, current_user: User = Depends(get_current_user)):
    success = await social_service.delete_history_entry(id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign history log not found."
        )
    return {"success": True, "message": "Archived log deleted successfully."}

@router.post("/favorite", status_code=status.HTTP_200_OK)
async def toggle_log_favorite(req: FavoriteRequest, current_user: User = Depends(get_current_user)):
    success = await social_service.toggle_favorite(req.id, req.favorite)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Campaign history log not found."
        )
    return {"success": True, "message": "Favorite status updated."}

@router.post("/export/pdf")
def export_pdf(req: ExportRequest, current_user: User = Depends(get_current_user)):
    pdf_bytes = export_to_pdf(req.post, req.topic, req.platform)
    headers = {
        'Content-Disposition': f'attachment; filename="aethera_{req.platform.lower()}_post.pdf"'
    }
    return Response(content=pdf_bytes, media_type="application/pdf", headers=headers)

@router.post("/export/txt")
def export_txt(req: ExportRequest, current_user: User = Depends(get_current_user)):
    txt_content = export_to_txt(req.post, req.topic, req.platform)
    headers = {
        'Content-Disposition': f'attachment; filename="aethera_{req.platform.lower()}_post.txt"'
    }
    return Response(content=txt_content, media_type="text/plain", headers=headers)
