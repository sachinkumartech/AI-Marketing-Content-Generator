import axios from 'axios';

const getApiBaseUrl = () => {
  let envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return `${window.location.origin}/api`;
    }
    return 'http://localhost:8000/api';
  }
  if (!envUrl.includes('://') && !envUrl.startsWith('/')) {
    envUrl = `https://${envUrl}`;
  }
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const API_BASE_URL = getApiBaseUrl();



const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ai_marketing_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Clear cached credentials on 401 Unauthorized without forcing full page reloads
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ai_marketing_token');
      localStorage.removeItem('ai_marketing_user');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (fullName, email, password) => {
    const response = await api.post('/auth/register', {
      email,
      password,
      full_name: fullName,
    });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.access_token) {
      localStorage.setItem('ai_marketing_token', response.data.access_token);
    }
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    localStorage.removeItem('ai_marketing_token');
    localStorage.removeItem('ai_marketing_user');
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

export const socialAPI = {
  generate: async (formData) => {
    const response = await api.post('/social-media/generate', {
      topic: formData.topic,
      description: formData.description,
      campaign_goal: formData.campaignGoal,
      platform: formData.platform,
      tone: formData.tone,
      target_audience: formData.targetAudience,
      age_group: formData.ageGroup,
      industry: formData.industry,
      brand_name: formData.brandName,
      product_name: formData.productName,
      keywords: formData.keywords,
      competitor: formData.competitor || null,
      call_to_action: formData.callToAction,
      language: formData.language,
      creativity_level: formData.creativityLevel,
      post_length: formData.postLength,
      emoji_usage: formData.emojiUsage,
      num_variations: parseInt(formData.numVariations, 10),
      include_cta: formData.includeCta,
      include_hashtags: formData.includeHashtags,
      image_style: formData.imageStyle,
      image_aspect_ratio: formData.imageAspectRatio,
      image_mood: formData.imageMood,
      brand_colors: formData.brandColors,
      logo_url: formData.logoUrl || null,
    });
    return response.data;
  },
  regenerate: async (id, variationIndex) => {
    const response = await api.post('/social-media/regenerate', {
      id: id,
      variation_index: parseInt(variationIndex, 10),
    });
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/social-media/history');
    return response.data;
  },
  deleteHistory: async (id) => {
    const response = await api.delete(`/social-media/history/${id}`);
    return response.data;
  },
  favorite: async (id, isFavorite) => {
    const response = await api.post('/social-media/favorite', {
      id: id,
      favorite: isFavorite,
    });
    return response.data;
  },
  exportPdf: async (post, topic, platform) => {
    const response = await api.post(
      '/social-media/export/pdf',
      { post, topic, platform },
      { responseType: 'blob' }
    );
    return response.data;
  },
  exportTxt: async (post, topic, platform) => {
    const response = await api.post(
      '/social-media/export/txt',
      { post, topic, platform },
      { responseType: 'blob' }
    );
    return response.data;
  },
};

export const advertisementAPI = {
  generate: async (formData) => {
    const response = await api.post('/advertisement/generate', {
      campaign_name: formData.campaignName,
      objective: formData.objective,
      brand_name: formData.brandName,
      product_name: formData.productName,
      industry: formData.industry,
      company_description: formData.companyDescription,
      website_url: formData.websiteUrl || null,
      target_audience: formData.targetAudience,
      age_group: formData.ageGroup,
      gender: formData.gender,
      location: formData.location,
      interests: formData.interests,
      income_level: formData.incomeLevel,
      occupation: formData.occupation,
      platform: formData.platform,
      ad_type: formData.adType,
      tone: formData.tone,
      language: formData.language,
      creativity_level: formData.creativityLevel,
      brand_voice: formData.brandVoice,
      emotional_trigger: formData.emotionalTrigger,
      marketing_framework: formData.marketingFramework,
      budget: formData.budget,
      campaign_duration: formData.campaignDuration,
      call_to_action: formData.callToAction,
      competitor: formData.competitor || null,
      keywords: formData.keywords,
      usp: formData.usp,
      pain_points: formData.painPoints,
      benefits: formData.benefits,
      image_style: formData.imageStyle,
      image_aspect_ratio: formData.imageAspectRatio,
      image_mood: formData.imageMood,
      brand_colors: formData.brandColors,
      logo_url: formData.logoUrl || null,
      num_variations: parseInt(formData.numVariations, 10),
      output_length: formData.outputLength,
    });
    return response.data;
  },
  regenerate: async (id, variationIndex) => {
    const response = await api.post('/advertisement/regenerate', {
      id: id,
      variation_index: parseInt(variationIndex, 10),
    });
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/advertisement/history');
    return response.data;
  },
  deleteHistory: async (id) => {
    const response = await api.delete(`/advertisement/history/${id}`);
    return response.data;
  },
  favorite: async (id, isFavorite) => {
    const response = await api.post('/advertisement/favorite', {
      id: id,
      favorite: isFavorite,
    });
    return response.data;
  },
  exportPdf: async (post, topic, platform) => {
    const response = await api.post(
      '/advertisement/export/pdf',
      { post, topic, platform },
      { responseType: 'blob' }
    );
    return response.data;
  },
  exportTxt: async (post, topic, platform) => {
    const response = await api.post(
      '/advertisement/export/txt',
      { post, topic, platform },
      { responseType: 'blob' }
    );
    return response.data;
  },
};

export const emailAPI = {
  generate: async (formData) => {
    const response = await api.post('/email/generate', {
      campaign_name: formData.campaignName,
      email_type: formData.emailType,
      target_audience: formData.targetAudience,
      product_name: formData.productName,
      value_proposition: formData.valueProposition,
      call_to_action: formData.callToAction,
      tone: formData.tone,
      sender_name: formData.senderName,
      sender_role: formData.senderRole,
      company_name: formData.companyName,
      personalization_instructions: formData.personalizationInstructions || null,
      email_length: formData.emailLength,
      subject_line_style: formData.subjectLineStyle,
      num_variations: parseInt(formData.numVariations, 10),
    });
    return response.data;
  },
  regenerate: async (id, variationIndex) => {
    const response = await api.post('/email/regenerate', {
      id: id,
      variation_index: parseInt(variationIndex, 10),
    });
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/email/history');
    return response.data;
  },
  deleteHistory: async (id) => {
    const response = await api.delete(`/email/history/${id}`);
    return response.data;
  },
  favorite: async (id, isFavorite) => {
    const response = await api.post('/email/favorite', {
      id: id,
      favorite: isFavorite,
    });
    return response.data;
  },
  exportPdf: async (post, campaignName) => {
    const response = await api.post(
      '/email/export/pdf',
      { post, campaign_name: campaignName },
      { responseType: 'blob' }
    );
    return response.data;
  },
  exportTxt: async (post, campaignName) => {
    const response = await api.post(
      '/email/export/txt',
      { post, campaign_name: campaignName },
      { responseType: 'blob' }
    );
    return response.data;
  },
  sendGmail: async (emailData) => {
    const response = await api.post('/email/send-gmail', {
      sender_email: emailData.senderEmail,
      app_password: emailData.appPassword,
      recipient_email: emailData.recipientEmail,
      subject: emailData.subject,
      body: emailData.body,
    });
    return response.data;
  },
};

export default api;
