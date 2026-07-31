from app.schemas.schemas import PostGenerationRequest
from app.utils.sanitizer import sanitize_input

class PromptBuilder:
    @staticmethod
    def build_social_prompt(req: PostGenerationRequest) -> str:
        # Platform Specific Style Guidelines
        platform_guides = {
            "instagram": "Instagram Style: Focus on visual storytelling, high emotional engagement, and creative hooks. Use space formatting to make it readable. Maximum emoji density.",
            "linkedin": "LinkedIn Style: Professional, corporate, value-driven, and highly structured (use lists or bullet points). Focus on B2B insights, leadership, growth, and industry tips. Keep emoji density to a minimum.",
            "facebook": "Facebook Style: Community-focused, friendly, welcoming, and interactive. Encourage shares and comments by asking open-ended questions.",
            "x (twitter)": "X / Twitter Style: Highly character-restricted (maximum 280 characters for the hook + caption + cta + hashtags). Must be extremely punchy, concise, and bold. Minimize filler words.",
            "threads": "Threads Style: Highly conversational, informal, authentic, and interactive. Write as if talking directly to a friend in a thread."
        }

        platform_key = req.platform.lower()
        platform_guide = platform_guides.get(platform_key, "Write engaging content suitable for modern audiences.")

        # Length guidelines
        length_guides = {
            "short": "Short: 1-2 concise sentences (approx 50-100 characters).",
            "medium": "Medium: 3-5 structured sentences (approx 150-300 characters).",
            "long": "Long: Detailed post with sections, bullet points, or paragraphs (approx 500-1000 characters)."
        }
        length_guide = length_guides.get(req.post_length.lower(), "Medium length.")

        # Emoji Density
        emoji_guides = {
            "none": "Do NOT include any emojis under any circumstances.",
            "low": "Use at most 1-2 subtle emojis.",
            "medium": "Use a moderate amount of relevant emojis (approx 3-5 emojis).",
            "high": "Include plenty of emojis to highlight bullet points and increase readability."
        }
        emoji_guide = emoji_guides.get(req.emoji_usage.lower(), "Moderate emojis.")

        # Sanitize user string inputs explicitly before building prompt
        safe_topic = sanitize_input(req.topic)
        safe_description = sanitize_input(req.description)
        safe_goal = sanitize_input(req.campaign_goal)
        safe_platform = sanitize_input(req.platform)
        safe_tone = sanitize_input(req.tone)
        safe_audience = sanitize_input(req.target_audience)

        cta_instruction = ""
        if req.include_cta:
            cta_instruction = f"Provide a clear, engaging Call to Action (CTA) matching the campaign goal: '{safe_goal}'."
        else:
            cta_instruction = "Do not write an explicit Call to Action section."

        hashtag_instruction = ""
        if req.include_hashtags:
            hashtag_instruction = "Generate 3-5 highly relevant hashtags. If the input contains keywords, prioritize them."
        else:
            hashtag_instruction = "Do not include any hashtags in the output."

        prompt = f"""You are a professional SaaS social media manager and copywriter.
Generate exactly {req.num_variations} variations of a social media post in a valid, parsable JSON format.

Input Parameters:
- Topic: {safe_topic}
- Description: {safe_description}
- Campaign Goal: {safe_goal}
- Target Platform: {safe_platform}
- Writing Tone: {safe_tone}
- Target Audience: {safe_audience}
- Length Target: {req.post_length}
- Emoji Density: {req.emoji_usage}

Formatting Instructions:
1. {platform_guide}
2. {length_guide}
3. {emoji_guide}
4. {cta_instruction}
5. {hashtag_instruction}
6. Provide a 'character_count' field which represents the length of the hook + caption + cta combined.
7. Provide a 'reading_time' estimation (e.g. '12s', '5s', '35s') based on standard reading speed of 200 words per minute.

Strict JSON Response Format:
Your output must be a single JSON object (with no markdown wrappers, no backticks, no markdown formatting fences, and no text before or after the JSON). The JSON must conform exactly to this schema:
{{
  "posts": [
    {{
      "hook": "An attention-grabbing first line or hook.",
      "caption": "The main body/caption of the post matching the tone and length instructions.",
      "cta": "The call to action text (leave empty string if include_cta is false).",
      "hashtags": ["list", "of", "hashtags"] (leave empty list if include_hashtags is false),
      "character_count": 180 (integer representing the character count of hook+caption+cta),
      "reading_time": "12s" (string representing reading time)
    }}
  ]
}}

Generate exactly {req.num_variations} variations inside the 'posts' array. Return ONLY the JSON object.
"""
        return prompt
