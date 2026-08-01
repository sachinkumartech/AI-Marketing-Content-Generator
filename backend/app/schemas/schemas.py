import re
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional, Any
from datetime import datetime
from app.utils.sanitizer import sanitize_input

# Password complexity regex rules
PASSWORD_UPPERCASE_RE = re.compile(r'[A-Z]')
PASSWORD_LOWERCASE_RE = re.compile(r'[a-z]')
PASSWORD_DIGIT_RE = re.compile(r'[0-9]')
PASSWORD_SPECIAL_RE = re.compile(r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>/?]')


# --- User Authentication Schemas ---

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128, description="Password must be 8-128 characters and include uppercase, lowercase, digit, and special character")
    full_name: Optional[str] = Field(None, max_length=100)

    @field_validator('password')
    @classmethod
    def validate_password_complexity(cls, v: str) -> str:
        if not PASSWORD_UPPERCASE_RE.search(v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not PASSWORD_LOWERCASE_RE.search(v):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not PASSWORD_DIGIT_RE.search(v):
            raise ValueError("Password must contain at least one digit.")
        if not PASSWORD_SPECIAL_RE.search(v):
            raise ValueError("Password must contain at least one special character.")
        return v

    @field_validator('full_name', mode='before')
    @classmethod
    def sanitize_strings(cls, v: Optional[str]) -> Optional[str]:
        if v is not None:
            return sanitize_input(v)
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1, max_length=128)

    @field_validator('email', mode='before')
    @classmethod
    def trim_email(cls, v: str) -> str:
        if isinstance(v, str):
            return v.strip().lower()
        return v


class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[str] = None


# --- Advanced Social Media Generator Schemas ---

class PostGenerationRequest(BaseModel):
    topic: str = Field(..., min_length=2, max_length=150)
    description: str = Field(..., min_length=5, max_length=1000)
    campaign_goal: str = Field("Brand Awareness", max_length=100)
    platform: str = Field("LinkedIn", max_length=50)
    tone: str = Field("Professional", max_length=50)
    target_audience: str = Field("General Audience", max_length=150)
    age_group: str = Field("25-34", max_length=50)
    industry: str = Field("Technology", max_length=100)
    brand_name: str = Field("Aethera", max_length=100)
    product_name: str = Field("Aethera SaaS", max_length=100)
    keywords: str = Field("AI, Marketing, SaaS", max_length=200)
    competitor: Optional[str] = Field(None, max_length=100)
    call_to_action: str = Field("Sign up for a free account", max_length=200)
    language: str = Field("English", max_length=50)
    creativity_level: str = Field("High", max_length=50)
    post_length: str = Field("Medium", max_length=50)
    emoji_usage: str = Field("Medium", max_length=50)
    num_variations: int = Field(3, ge=1, le=5)
    include_hashtags: bool = True
    include_cta: bool = True
    image_style: str = Field("Photorealistic", max_length=100)
    image_aspect_ratio: str = Field("1:1", max_length=20)
    image_mood: str = Field("Vibrant", max_length=50)
    brand_colors: str = Field("#00f0ff, #bd00ff", max_length=100)
    logo_url: Optional[str] = Field(None, max_length=500)

    @field_validator(
        'topic', 'description', 'campaign_goal', 'platform', 'tone', 'target_audience',
        'age_group', 'industry', 'brand_name', 'product_name', 'keywords', 'competitor',
        'call_to_action', 'language', 'creativity_level', 'post_length', 'emoji_usage',
        'image_style', 'image_aspect_ratio', 'image_mood', 'brand_colors', 'logo_url',
        mode='before'
    )
    @classmethod
    def sanitize_field(cls, v: Any) -> Any:
        return sanitize_input(v)


class PostVariation(BaseModel):
    platform: str
    title: str
    hook: str
    caption: str
    cta: str
    hashtags: List[str] = []
    seo_keywords: List[str] = []
    character_count: int
    reading_time: str
    best_posting_time: str
    suggested_audience: str
    engagement_tips: str
    image_prompt: str
    negative_prompt: str
    suggested_image_style: str
    suggested_color_palette: List[str] = []
    alt_text: str
    image_title: str
    image_url: Optional[str] = None
    engagement_score: int
    virality_score: int
    brand_consistency_score: int
    readability_score: int
    ai_score: int


class GenerationResponse(BaseModel):
    success: bool
    posts: List[PostVariation]


class HistoryResponse(BaseModel):
    id: str
    topic: str
    description: str
    platform: str
    tone: str
    campaign_goal: str
    target_audience: Optional[str] = None
    generated_content: List[PostVariation]
    image_prompt: Optional[str] = None
    favorite: bool
    created_at: datetime

    class Config:
        from_attributes = True


class FavoriteRequest(BaseModel):
    id: str = Field(..., min_length=1, max_length=100)
    favorite: bool

    @field_validator('id', mode='before')
    @classmethod
    def sanitize_id(cls, v: Any) -> Any:
        return sanitize_input(v)


class RegenerateRequest(BaseModel):
    id: str = Field(..., min_length=1, max_length=100)
    variation_index: int = Field(..., ge=0, le=10)

    @field_validator('id', mode='before')
    @classmethod
    def sanitize_id(cls, v: Any) -> Any:
        return sanitize_input(v)


class ExportRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=200)
    platform: str = Field(..., min_length=1, max_length=50)
    post: PostVariation

    @field_validator('topic', 'platform', mode='before')
    @classmethod
    def sanitize_export_fields(cls, v: Any) -> Any:
        return sanitize_input(v)


# --- Advertisement Generator Schemas ---

class AdvertisementGenerationRequest(BaseModel):
    campaign_name: str = Field(..., min_length=2, max_length=150)
    objective: str = Field(..., max_length=100)
    brand_name: str = Field(..., max_length=100)
    product_name: str = Field(..., max_length=100)
    industry: str = Field(..., max_length=100)
    company_description: str = Field(..., min_length=5, max_length=1000)
    website_url: Optional[str] = Field(None, max_length=500)
    target_audience: str = Field(..., max_length=150)
    age_group: str = Field(..., max_length=50)
    gender: str = Field(..., max_length=50)
    location: str = Field(..., max_length=100)
    interests: str = Field(..., max_length=200)
    income_level: str = Field(..., max_length=50)
    occupation: str = Field(..., max_length=100)
    platform: str = Field(..., max_length=50)
    ad_type: str = Field(..., max_length=50)
    tone: str = Field(..., max_length=50)
    language: str = Field(..., max_length=50)
    creativity_level: str = Field(..., max_length=50)
    brand_voice: str = Field(..., max_length=100)
    emotional_trigger: str = Field(..., max_length=100)
    marketing_framework: str = Field(..., max_length=100)
    budget: str = Field(..., max_length=50)
    campaign_duration: str = Field(..., max_length=50)
    call_to_action: str = Field(..., max_length=200)
    competitor: Optional[str] = Field(None, max_length=100)
    keywords: str = Field(..., max_length=200)
    usp: str = Field(..., max_length=300)
    pain_points: str = Field(..., max_length=500)
    benefits: str = Field(..., max_length=500)
    image_style: str = Field(..., max_length=100)
    image_aspect_ratio: str = Field(..., max_length=20)
    image_mood: str = Field(..., max_length=50)
    brand_colors: str = Field(..., max_length=100)
    logo_url: Optional[str] = Field(None, max_length=500)
    num_variations: int = Field(3, ge=1, le=5)
    output_length: str = Field("Medium", max_length=50)

    @field_validator(
        'campaign_name', 'objective', 'brand_name', 'product_name', 'industry',
        'company_description', 'website_url', 'target_audience', 'age_group',
        'gender', 'location', 'interests', 'income_level', 'occupation', 'platform',
        'ad_type', 'tone', 'language', 'creativity_level', 'brand_voice',
        'emotional_trigger', 'marketing_framework', 'budget', 'campaign_duration',
        'call_to_action', 'competitor', 'keywords', 'usp', 'pain_points', 'benefits',
        'image_style', 'image_aspect_ratio', 'image_mood', 'brand_colors', 'logo_url',
        'output_length', mode='before'
    )
    @classmethod
    def sanitize_field(cls, v: Any) -> Any:
        return sanitize_input(v)


class AdVariation(BaseModel):
    headline: str
    primary_text: str
    description: str
    cta: str
    hook: str
    marketing_framework_used: str
    psychological_trigger: str
    target_audience_fit: str
    pain_points: str
    benefits: str
    usp: str
    seo_keywords: List[str] = []
    google_keywords: List[str] = []
    hashtags: List[str] = []
    estimated_ctr: str
    estimated_conversion_score: int
    ad_quality_score: int
    virality_score: int
    image_prompt: str
    negative_prompt: str
    suggested_color_palette: List[str] = []
    alt_text: str
    video_prompt: str
    carousel_ideas: str
    best_posting_time: str
    id: Optional[str] = None


class AdvertisementResponse(BaseModel):
    success: bool
    posts: List[AdVariation]


class AdvertisementHistoryResponse(BaseModel):
    id: str
    campaign_name: Optional[str] = None
    platform: Optional[str] = None
    objective: Optional[str] = None
    product: Optional[str] = None
    brand: Optional[str] = None
    audience: Optional[str] = None
    generated_content: List[AdVariation]
    image_prompt: Optional[str] = None
    favorite: bool
    created_at: datetime

    class Config:
        from_attributes = True


# --- Email Generator Schemas ---

class EmailGenerationRequest(BaseModel):
    campaign_name: str = Field(..., min_length=2, max_length=150)
    email_type: str = Field("Cold Outreach", max_length=50)
    target_audience: str = Field(..., max_length=150)
    product_name: str = Field(..., max_length=100)
    value_proposition: str = Field(..., max_length=500)
    call_to_action: str = Field(..., max_length=200)
    tone: str = Field("Professional", max_length=50)
    sender_name: str = Field("Aethera Team", max_length=100)
    sender_role: str = Field("Marketing", max_length=100)
    company_name: str = Field("Aethera", max_length=100)
    personalization_instructions: Optional[str] = Field(None, max_length=500)
    email_length: str = Field("Short", max_length=50)
    subject_line_style: str = Field("Curiosity", max_length=50)
    num_variations: int = Field(3, ge=1, le=5)

    @field_validator(
        'campaign_name', 'email_type', 'target_audience', 'product_name',
        'value_proposition', 'call_to_action', 'tone', 'sender_name', 'sender_role',
        'company_name', 'personalization_instructions', 'email_length', 'subject_line_style',
        mode='before'
    )
    @classmethod
    def sanitize_field(cls, v: Any) -> Any:
        return sanitize_input(v)


class EmailVariation(BaseModel):
    subject_line: str
    preheader: str
    salutation: str
    body_paragraphs: List[str]
    call_to_action_text: str
    sign_off: str
    ps_note: Optional[str] = None
    spam_word_score: int
    readability_score: int
    estimated_open_rate: str
    estimated_click_rate: str
    psychological_framework: str
    id: Optional[str] = None


class EmailResponse(BaseModel):
    success: bool
    posts: List[EmailVariation]


class EmailHistoryResponse(BaseModel):
    id: str
    campaign_name: str
    email_type: str
    target_audience: str
    product_name: str
    generated_content: List[EmailVariation]
    favorite: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ExportEmailRequest(BaseModel):
    campaign_name: str = Field(..., min_length=1, max_length=150)
    post: EmailVariation

    @field_validator('campaign_name', mode='before')
    @classmethod
    def sanitize_field(cls, v: Any) -> Any:
        return sanitize_input(v)


class SendGmailRequest(BaseModel):
    sender_email: EmailStr
    app_password: str = Field(..., min_length=1, max_length=100)
    recipient_email: EmailStr
    subject: str = Field(..., min_length=1, max_length=250)
    body: str = Field(..., min_length=1, max_length=10000)

    @field_validator('subject', 'body', mode='before')
    @classmethod
    def sanitize_field(cls, v: Any) -> Any:
        return sanitize_input(v)
