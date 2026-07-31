import logging
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status, Response
from app.schemas.schemas import (
    EmailGenerationRequest, EmailResponse, EmailHistoryResponse,
    FavoriteRequest, RegenerateRequest, ExportEmailRequest, EmailVariation, SendGmailRequest
)
from app.services.email_service import email_service
from app.utils.exporter import export_email_to_pdf, export_email_to_txt
from app.auth.auth import get_current_user
from app.models.models import User

logger = logging.getLogger("email_router")
router = APIRouter()

@router.post("/generate", response_model=EmailResponse)
async def generate_emails(req: EmailGenerationRequest, current_user: User = Depends(get_current_user)):
    try:
        return await email_service.generate_campaign(req)
    except Exception as e:
        logger.error(f"AI Email Generation Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="AI Email Generation service failed. Please try again."
        )

@router.post("/regenerate", response_model=List[EmailVariation])
async def regenerate_email(req: RegenerateRequest, current_user: User = Depends(get_current_user)):
    try:
        res = await email_service.regenerate_variation(req.id, req.variation_index)
        return res["posts"]
    except Exception as e:
        logger.error(f"Email Variation Regeneration Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Email Variation Regeneration failed."
        )

@router.get("/history", response_model=List[EmailHistoryResponse])
async def get_history_logs(current_user: User = Depends(get_current_user)):
    history_entries = await email_service.get_history()
    results = []
    for entry in history_entries:
        posts_list = entry.generated_content.get("posts", []) if isinstance(entry.generated_content, dict) else entry.generated_content
        results.append(
            EmailHistoryResponse(
                id=str(entry.id),
                campaign_name=entry.campaign_name,
                email_type=entry.email_type,
                target_audience=entry.target_audience,
                product_name=entry.product_name,
                generated_content=posts_list,
                favorite=entry.favorite,
                created_at=entry.created_at
            )
        )
    return results

@router.delete("/history/{id}", status_code=status.HTTP_200_OK)
async def delete_log_entry(id: str, current_user: User = Depends(get_current_user)):
    success = await email_service.delete_history_entry(id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email history log not found."
        )
    return {"success": True, "message": "Archived log deleted successfully."}

@router.post("/favorite", status_code=status.HTTP_200_OK)
async def toggle_log_favorite(req: FavoriteRequest, current_user: User = Depends(get_current_user)):
    success = await email_service.toggle_favorite(req.id, req.favorite)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email history log not found."
        )
    return {"success": True, "message": "Favorite status updated."}

@router.post("/export/pdf")
def export_pdf(req: ExportEmailRequest, current_user: User = Depends(get_current_user)):
    pdf_bytes = export_email_to_pdf(req.post.dict(), req.campaign_name)
    headers = {
        'Content-Disposition': f'attachment; filename="aethera_email_{req.campaign_name.replace(" ", "_")}.pdf"'
    }
    return Response(content=pdf_bytes, media_type="application/pdf", headers=headers)

@router.post("/export/txt")
def export_txt(req: ExportEmailRequest, current_user: User = Depends(get_current_user)):
    txt_content = export_email_to_txt(req.post.dict(), req.campaign_name)
    headers = {
        'Content-Disposition': f'attachment; filename="aethera_email_{req.campaign_name.replace(" ", "_")}.txt"'
    }
    return Response(content=txt_content, media_type="text/plain", headers=headers)

@router.post("/send-gmail", status_code=status.HTTP_200_OK)
def send_gmail(req: SendGmailRequest, current_user: User = Depends(get_current_user)):
    try:
        email_service.send_gmail_email(
            sender_email=req.sender_email,
            app_password=req.app_password,
            recipient_email=req.recipient_email,
            subject=req.subject,
            body=req.body
        )
        return {"success": True, "message": "Email sent successfully via Gmail."}
    except Exception as e:
        logger.error(f"Gmail SMTP Delivery Error for {req.sender_email}: {str(e)}")
        # Mask exception string to prevent leaking app password or internal network details
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Gmail SMTP Delivery Failed. Please verify your sender email, app password, and recipient address."
        )
