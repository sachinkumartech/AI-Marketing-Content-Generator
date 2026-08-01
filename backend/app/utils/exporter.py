from io import BytesIO
from app.schemas.schemas import PostVariation, EmailVariation
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def export_to_txt(post: PostVariation, topic: str, platform: str) -> str:
    content = []
    content.append("=" * 60)
    content.append(f"AETHERA AI MARKETING AGENT - SOCIAL CAMPAIGN RECORD")
    content.append("=" * 60)
    content.append(f"Topic: {topic}")
    content.append(f"Platform: {platform}")
    content.append(f"Generated Title: {post.title}")
    content.append("-" * 60)
    content.append(f"HOOK:\n{post.hook}")
    content.append("-" * 60)
    content.append(f"CAPTION BODY:\n{post.caption}")
    content.append("-" * 60)
    content.append(f"CALL TO ACTION:\n{post.cta}")
    content.append("-" * 60)
    content.append(f"HASHTAGS:\n{' '.join(post.hashtags)}")
    content.append(f"SEO KEYWORDS:\n{', '.join(post.seo_keywords)}")
    content.append("-" * 60)
    content.append(f"AI IMAGE GENERATION PARAMETERS:")
    content.append(f"Style: {post.suggested_image_style}")
    content.append(f"Prompt:\n{post.image_prompt}")
    content.append(f"Negative Prompt:\n{post.negative_prompt}")
    content.append(f"Alt Text:\n{post.alt_text}")
    content.append("-" * 60)
    content.append(f"CAMPAIGN ANALYTICS:")
    content.append(f"Engagement Score: {post.engagement_score}%")
    content.append(f"Virality Score: {post.virality_score}%")
    content.append(f"Brand Consistency: {post.brand_consistency_score}%")
    content.append(f"Readability Score: {post.readability_score}%")
    content.append(f"Overall AI Score: {post.ai_score}%")
    content.append("=" * 60)
    return "\n\n".join(content)

def export_to_pdf(post: PostVariation, topic: str, platform: str) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()
    
    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#bd00ff'),
        spaceAfter=15
    )
    
    section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#00f0ff'),
        spaceBefore=10,
        spaceAfter=5
    )
    
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#333333'),
        spaceAfter=10
    )

    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#666666')
    )

    story = []
    
    # Header block
    story.append(Paragraph(f"Aethera AI Generated Post: {post.title}", title_style))
    story.append(Paragraph(f"<b>Campaign Topic:</b> {topic} &nbsp;|&nbsp; <b>Platform:</b> {platform}", meta_style))
    story.append(Spacer(1, 15))
    
    # Hook
    story.append(Paragraph("HOOK / ATTENTION TRIGGER", section_title))
    story.append(Paragraph(post.hook, body_style))
    story.append(Spacer(1, 10))
    
    # Caption Body
    story.append(Paragraph("CAPTION BODY", section_title))
    story.append(Paragraph(post.caption.replace('\n', '<br/>'), body_style))
    story.append(Spacer(1, 10))
    
    # CTA
    story.append(Paragraph("CALL TO ACTION (CTA)", section_title))
    story.append(Paragraph(post.cta, body_style))
    story.append(Spacer(1, 10))
    
    # Tags & SEO
    story.append(Paragraph("HASHTAGS & SEO KEYWORDS", section_title))
    story.append(Paragraph(f"<b>Hashtags:</b> {' '.join(post.hashtags)}", body_style))
    story.append(Paragraph(f"<b>SEO Focus:</b> {', '.join(post.seo_keywords)}", body_style))
    story.append(Spacer(1, 10))
    
    # Visual Prompt Parameters
    story.append(Paragraph("AI VISUAL GENERATION PARAMETERS", section_title))
    story.append(Paragraph(f"<b>Style:</b> {post.suggested_image_style}", body_style))
    story.append(Paragraph(f"<b>Prompt:</b> {post.image_prompt}", body_style))
    story.append(Paragraph(f"<b>Negative:</b> {post.negative_prompt}", body_style))
    story.append(Paragraph(f"<b>Alt Description:</b> {post.alt_text}", body_style))
    story.append(Spacer(1, 15))
    
    # Scores Grid Table
    data = [
        ["Engagement", "Virality", "Consistency", "Readability", "AI Score"],
        [f"{post.engagement_score}%", f"{post.virality_score}%", f"{post.brand_consistency_score}%", f"{post.readability_score}%", f"{post.ai_score}%"]
    ]
    t = Table(data, colWidths=[100]*5)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#030014')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#00f0ff')),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f5f5f5')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#eaeaea'))
    ]))
    story.append(t)
    
    doc.build(story)
    return buffer.getvalue()

def export_ad_to_txt(post: dict, topic: str, platform: str) -> str:
    headline = post.get('headline', '')
    primary_text = post.get('primary_text', post.get('primaryText', ''))
    description = post.get('description', '')
    cta = post.get('cta', '')
    image_prompt = post.get('image_prompt', '')
    framework = post.get('marketing_framework_used', '')
    trigger = post.get('psychological_trigger', '')
    ctr = post.get('estimated_ctr', '')
    quality_score = post.get('ad_quality_score', 95)
    
    content = []
    content.append("=" * 60)
    content.append("AETHERA AI MARKETING AGENT - ADVERTISEMENT CAMPAIGN RECORD")
    content.append("=" * 60)
    content.append(f"Topic: {topic}")
    content.append(f"Platform: {platform}")
    content.append(f"Headline: {headline}")
    content.append("-" * 60)
    content.append(f"PRIMARY TEXT:\n{primary_text}")
    content.append("-" * 60)
    content.append(f"DESCRIPTION:\n{description}")
    content.append("-" * 60)
    content.append(f"CALL TO ACTION BUTTON:\n{cta}")
    content.append("-" * 60)
    content.append(f"MARKETING FRAMEWORK: {framework}")
    content.append(f"PSYCHOLOGICAL TRIGGER: {trigger}")
    content.append("-" * 60)
    content.append(f"IMAGE PROMPT:\n{image_prompt}")
    content.append("-" * 60)
    content.append("PERFORMANCE METRICS:")
    content.append(f"Estimated CTR: {ctr}")
    content.append(f"Ad Quality Score: {quality_score}/100")
    content.append("=" * 60)
    return "\n\n".join(content)

def export_ad_to_pdf(post: dict, topic: str, platform: str) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#ff007a'),
        spaceAfter=15
    )
    
    section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#00f0ff'),
        spaceBefore=10,
        spaceAfter=5
    )
    
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#333333'),
        spaceAfter=10
    )

    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#666666')
    )

    story = []
    
    headline = post.get('headline', '')
    primary_text = post.get('primary_text', post.get('primaryText', ''))
    description = post.get('description', '')
    cta = post.get('cta', '')
    image_prompt = post.get('image_prompt', '')
    framework = post.get('marketing_framework_used', '')
    trigger = post.get('psychological_trigger', '')
    ctr = post.get('estimated_ctr', '2.4%')
    quality_score = post.get('ad_quality_score', 95)
    
    story.append(Paragraph(f"Aethera AI Generated Ad: {headline}", title_style))
    story.append(Paragraph(f"<b>Campaign Topic:</b> {topic} &nbsp;|&nbsp; <b>Platform:</b> {platform}", meta_style))
    story.append(Spacer(1, 15))
    
    story.append(Paragraph("PRIMARY AD TEXT", section_title))
    story.append(Paragraph(primary_text.replace('\n', '<br/>'), body_style))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("DESCRIPTION & CTA", section_title))
    story.append(Paragraph(f"<b>Description:</b> {description}", body_style))
    story.append(Paragraph(f"<b>CTA Button:</b> {cta}", body_style))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("STRATEGY & FRAMEWORK", section_title))
    story.append(Paragraph(f"<b>Marketing Framework:</b> {framework}", body_style))
    story.append(Paragraph(f"<b>Psychological Trigger:</b> {trigger}", body_style))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("IMAGE GENERATION PROMPT", section_title))
    story.append(Paragraph(f"<i>\"{image_prompt}\"</i>", body_style))
    story.append(Spacer(1, 15))
    
    data = [
        ["Estimated CTR", "Ad Quality Score"],
        [f"{ctr}", f"{quality_score}/100"]
    ]
    t = Table(data, colWidths=[250]*2)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#030014')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#ff007a')),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f5f5f5')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#eaeaea'))
    ]))
    story.append(t)
    
    doc.build(story)
    return buffer.getvalue()

def export_email_to_txt(post: dict, campaign_name: str) -> str:
    content = []
    content.append("=" * 60)
    content.append(f"AETHERA AI MARKETING AGENT - EMAIL CAMPAIGN RECORD")
    content.append("=" * 60)
    content.append(f"Campaign: {campaign_name}")
    content.append(f"Subject: {post.get('subject_line')}")
    content.append(f"Preheader: {post.get('preheader')}")
    content.append("-" * 60)
    content.append(f"SALUTATION:\n{post.get('salutation')}")
    content.append("-" * 60)
    content.append("BODY:")
    for idx, p in enumerate(post.get('body_paragraphs', [])):
        content.append(f"{p}")
    content.append("-" * 60)
    content.append(f"CALL TO ACTION:\n{post.get('call_to_action_text')}")
    content.append("-" * 60)
    content.append(f"SIGN OFF:\n{post.get('sign_off')}")
    if post.get('ps_note'):
        content.append(f"P.S. NOTE:\n{post.get('ps_note')}")
    content.append("-" * 60)
    content.append(f"CAMPAIGN ANALYTICS:")
    content.append(f"Spam Word Score: {post.get('spam_word_score')}/100")
    content.append(f"Readability Score: {post.get('readability_score')}/100")
    content.append(f"Est. Open Rate: {post.get('estimated_open_rate')}")
    content.append(f"Est. Click Rate: {post.get('estimated_click_rate')}")
    content.append(f"Psychological Framework: {post.get('psychological_framework')}")
    content.append("=" * 60)
    return "\n\n".join(content)

def export_email_to_pdf(post: dict, campaign_name: str) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#00f0ff'),
        spaceAfter=15
    )
    
    section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#bd00ff'),
        spaceBefore=10,
        spaceAfter=5
    )
    
    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#333333'),
        spaceAfter=10
    )

    meta_style = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#666666')
    )

    story = []
    
    # Header block
    story.append(Paragraph(f"Aethera AI Generated Email: {campaign_name}", title_style))
    story.append(Paragraph(f"<b>Subject:</b> {post.get('subject_line')}", meta_style))
    story.append(Paragraph(f"<b>Preheader:</b> {post.get('preheader')}", meta_style))
    story.append(Spacer(1, 15))
    
    # Salutation & Body
    story.append(Paragraph("EMAIL CONTENT", section_title))
    story.append(Paragraph(post.get('salutation', ''), body_style))
    
    for p in post.get('body_paragraphs', []):
        story.append(Paragraph(p, body_style))
        
    # CTA & Sign-off
    story.append(Paragraph(f"<b>CTA:</b> {post.get('call_to_action_text')}", body_style))
    story.append(Paragraph(post.get('sign_off', ''), body_style))
    
    if post.get('ps_note'):
        story.append(Paragraph(f"<i>P.S. {post.get('ps_note')}</i>", body_style))
    story.append(Spacer(1, 10))
    
    # Scores Grid Table
    data = [
        ["Spam Score", "Readability", "Open Rate", "Click Rate", "Framework"],
        [f"{post.get('spam_word_score')}/100", f"{post.get('readability_score')}/100", post.get('estimated_open_rate'), post.get('estimated_click_rate'), post.get('psychological_framework')]
    ]
    t = Table(data, colWidths=[100]*5)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#030014')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#00f0ff')),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor('#f5f5f5')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#eaeaea'))
    ]))
    story.append(t)
    
    doc.build(story)
    return buffer.getvalue()
