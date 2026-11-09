Below is a more professional, polished, and enterprise-grade version of your README. I've preserved your original project information, features, technologies, API endpoints, architecture, setup instructions, deployment details, author credits, and overall meaning.

I've only improved the presentation, formatting, headings, consistency, and professional tone. No original functionality or project details have intentionally been changed.

Writing

# AI Marketing Content Generator

### Enterprise-Grade AI-Powered Marketing Automation Platform

An end-to-end AI marketing content generation platform built with **FastAPI, React 19, Vite, Groq Cloud, Llama 3.3 70B Versatile, and MongoDB**. Generate high-quality, conversion-focused marketing content across multiple platforms in seconds.

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F05032?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Beanie-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## Table of Contents

- Overview
- Key Features
  - AI Social Media Post Generator
  - AI Marketing Email Generator
  - AI Product Description Generator
  - AI Advertisement Generator
  - Authentication and Session Security
  - Generation History and Document Export
- Application Screenshots
- Technology Stack
- Project Architecture
- Getting Started
- Environment Variables
- API Documentation
- Production Deployment
  - Render Deployment
  - Vercel Deployment
- Use Cases
- Future Roadmap
- Contributing
- License
- Author and Acknowledgments

---

## Overview

**AI Marketing Content Generator** is a full-stack generative AI platform designed to simplify and accelerate modern marketing workflows.

Built for marketing teams, digital agencies, e-commerce businesses, startups, freelancers, and content creators, the platform brings multiple AI-powered content creation capabilities together in a unified dashboard.

Instead of relying on separate tools for different marketing activities, users can brainstorm, generate, refine, optimize, and export professional marketing content from a single application.

Powered by **Groq's high-performance inference engine** and **Llama 3.3 70B Versatile**, the platform delivers fast AI-generated content with intelligent context awareness, customizable writing tones, and platform-specific formatting.

The application combines a modern React frontend with an asynchronous FastAPI backend, secure authentication, MongoDB-based persistence, and downloadable document exports.

## Key Features

### 1\. AI Social Media Post Generator

Create engaging, platform-specific social media content designed to improve audience engagement and brand visibility.

**Supported Platforms**

- Instagram
- LinkedIn
- Facebook
- Twitter (X)

**Generation Capabilities**

- Engaging social media captions.
- Relevant and trending hashtags.
- Contextual emoji suggestions.
- High-impact calls-to-action (CTAs).

**Customization Options**

- Professional, Casual, Witty, Urgency, and Informative tones.
- Target audience and demographic customization.
- Platform-specific character constraints.
- Content tailored to individual social media channels.

### 2\. AI Marketing Email Generator

Generate professional, persuasive, and conversion-focused email campaigns using customizable marketing frameworks.

**Supported Campaign Types**

- Promotional offers.
- Product launch announcements.
- Welcome and onboarding emails.
- Recurring newsletters.
- Sales pitches.
- Cold outreach.
- Follow-up emails.

**Generation Capabilities**

- Multiple email subject line variations.
- Preview text generation.
- Structured email body content.
- Customizable writing tones.
- Dynamic calls-to-action.

### 3\. AI Product Description Generator

Create compelling e-commerce product descriptions that communicate product value and support purchasing decisions.

**Key Capabilities**

- SEO-optimized product descriptions.
- Automatic integration of target focus keywords.
- Product feature breakdowns.
- Benefit-oriented bullet points.
- Short and persuasive product one-liners.
- Comprehensive long-form descriptions.

### 4\. AI Advertisement Generator

Generate advertising copy tailored to different advertising networks and campaign objectives.

**Supported Advertising Platforms**

- Google Search Ads.
- Google Display Ads.
- Facebook Ads.
- Instagram Sponsored Posts.
- LinkedIn Ads.

**Generation Capabilities**

- Attention-grabbing headlines.
- Persuasive primary advertising text.
- Secondary descriptions.
- Engaging marketing hooks.
- Platform-specific calls-to-action.
- Multi-platform advertising copy.

### 5\. Authentication and Session Security

A secure authentication system designed to manage user accounts and protect application resources.

**Security Features**

- JWT-based authentication.
- Password hashing using `passlib` and `bcrypt`.
- Secure access-token generation and verification.
- MongoDB Atlas integration.
- Asynchronous database operations using Beanie ODM and Motor.
- In-memory fallback caching.
- Graceful database reconnection handling.

### 6\. Generation History and Document Export

Manage previously generated marketing content and export completed work into professional document formats.

**History Management**

- Persistent generation history.
- Retrieve previously generated content.
- Review and reuse generated marketing assets.
- Real-time history reload.

**Document Export**

- PDF document generation using `reportlab`.
- Microsoft Word document generation using `python-docx`.
- Formatted document headers.
- Generation metadata.
- Timestamps and structured content.

---

## Application Screenshots

Explore the application's interface and its core AI-powered generation modules.

### Dashboard and Landing Page

\!Aethera Landing Page

### Social Media Generator

\!Social Suite

### Marketing Email Generator

\!Email Engine

### Product Description Generator

\!Product Copy AI

### Advertisement Generator

\!Ad Campaign Builder

---

## Technology Stack

The platform uses a modern full-stack architecture combining high-performance backend services, a responsive frontend, generative AI, and persistent data storage.

| Category | Technology | Purpose |
| --- | --- | --- |
| Frontend Framework | React 19 | Component-based user interface |
| Build Tool | Vite 5 | Fast development and optimized builds |
| Routing | React Router DOM v6 | Client-side navigation |
| Icons | Lucide Icons | Modern vector iconography |
| Styling | CSS3 | Responsive styling and animations |
| Backend Framework | FastAPI 0.115+ | Asynchronous REST API |
| Programming Language | Python 3.10+ | Backend application development |
| Primary AI Engine | Groq Cloud SDK | High-speed LLM inference |
| Language Model | Llama 3.3 70B Versatile | AI-powered content generation |
| Secondary AI Engine | Google Generative AI (Gemini Flash) | Client-side fallback and assistant support |
| Database | MongoDB Atlas | Persistent document storage |
| ODM | Beanie + Motor | Asynchronous database operations |
| Authentication | JWT | Token-based authentication |
| Password Security | Passlib + bcrypt | Password hashing |
| PDF Export | ReportLab | PDF document generation |
| Word Export | python-docx | DOCX document generation |
| Deployment | Render | Backend and frontend deployment |
| Deployment | Vercel | Monorepo serverless deployment |

---

## Project Architecture

The application follows a modular full-stack architecture that separates frontend components, backend services, AI integrations, authentication, database operations, and document-generation utilities.

text

```text
AI-Marketing-Content-Generator/
│
├── .github/                         # GitHub workflows and configuration
│
├── api/
│   └── index.py                     # Vercel serverless entry point
│
├── backend/
│   ├── app/
│   │   ├── ai/                      # Groq AI client integration
│   │   ├── auth/                    # JWT authentication and password security
│   │   ├── config/                  # Application settings and environment loader
│   │   ├── database/                # MongoDB Motor client and Beanie setup
│   │   ├── models/                  # Beanie document models
│   │   ├── prompts/                 # AI system and task prompts
│   │   ├── routers/                 # Authentication and generation endpoints
│   │   ├── schemas/                 # Pydantic validation schemas
│   │   ├── services/                # Business logic and AI generation pipelines
│   │   ├── utils/                   # PDF, DOCX and utility functions
│   │   └── main.py                  # FastAPI application entry point
│   │
│   ├── .env.example                 # Backend environment template
│   └── requirements.txt             # Python dependencies
│
├── frontend/
│   ├── public/                      # Static public assets
│   │
│   ├── src/
│   │   ├── assets/                  # Branding, icons and hero images
│   │   ├── components/              # Reusable UI components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── layouts/                 # Application page layouts
│   │   ├── pages/                   # Application pages
│   │   ├── routes/                  # Client-side routing
│   │   ├── services/                # Axios API client and communication
│   │   ├── styles/                  # Global and modular CSS
│   │   ├── utils/                   # Gemini client and fallback handlers
│   │   ├── App.jsx                  # Main React application
│   │   └── main.jsx                 # React root entry point
│   │
│   ├── .env.example                 # Frontend environment template
│   ├── package.json                 # NPM dependencies and scripts
│   └── vite.config.js               # Vite configuration
│
├── screenshots/                     # Application screenshots
│
├── .gitignore                       # Git exclusion configuration
├── render.yaml                      # Render Blueprint configuration
├── vercel.json                      # Vercel deployment configuration
└── README.md                        # Project documentation
```

---

## Getting Started

Follow the instructions below to configure and run the application locally.

### Prerequisites

Ensure the following software and services are available:

- **Python:** Version 3.10 or higher.
- **Node.js:** Version 18.0 or higher.
- **Package Manager:** npm or pnpm.
- **MongoDB:** Local MongoDB instance or MongoDB Atlas cluster.
- **Groq Account:** Required for LLM inference through the [Groq Console](<https://console.groq.com/>).

### 1\. Clone Repository

Clone the project and navigate to its root directory.

bash

```bash
git clone https://github.com/sachinkumartech/AI-Marketing-Content-Generator.git

cd AI-Marketing-Content-Generator
```

### 2\. Backend Setup

**Step 1: Navigate to the backend directory.**

bash

```bash
cd backend
```

**Step 2: Create and activate a virtual environment.**

Windows:

bash

```bash
python -m venv venv
venv\Scripts\activate
```

macOS / Linux:

bash

```bash
python3 -m venv venv
source venv/bin/activate
```

**Step 3: Install backend dependencies.**

bash

```bash
pip install -r requirements.txt
```

**Step 4: Configure environment variables.**

Create your environment configuration file:

bash

```bash
cp .env.example .env
```

Update the values according to your local environment and the configuration guide below.

**Step 5: Start the FastAPI development server.**

bash

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The backend will be available at:

| Resource | URL |
| --- | --- |
| API Base URL | http://127.0.0.1:8000 |
| Swagger Documentation | http://127.0.0.1:8000/docs |
| ReDoc Documentation | http://127.0.0.1:8000/redoc |

### 3\. Frontend Setup

Open a separate terminal.

**Step 1: Navigate to the frontend directory.**

bash

```bash
cd frontend
```

**Step 2: Install frontend dependencies.**

bash

```bash
npm install
```

**Step 3: Configure frontend environment variables.**

bash

```bash
cp .env.example .env
```

Update the environment variables according to your frontend configuration.

**Step 4: Start the Vite development server.**

bash

```bash
npm run dev
```

Access the application through your browser:

text

```text
http://localhost:5173
```

---

## Environment Variables

The application uses environment variables to manage API credentials, database connections, authentication settings, and service configurations.

**Important:** Never commit actual `.env` files or sensitive credentials to version control. The project's `.gitignore` is configured to exclude environment files while preserving `.env.example` templates.

### Backend Configuration

File: `backend/.env`

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | MongoDB local or Atlas connection string |
| `GROQ_API_KEY` | Groq Cloud API access key |
| `JWT_SECRET` | Secret key for JWT signing and verification |
| `JWT_ALGORITHM` | Cryptographic signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access-token expiration duration |
| `CORS_ORIGINS` | Allowed frontend origins |
| `ENVIRONMENT` | Application deployment environment |

Refer to `backend/.env.example` for the complete configuration template.

### Frontend Configuration

File: `frontend/.env`

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the FastAPI backend |
| `GEMINI_API_KEY` | API key for optional client-side generative features |

Refer to `frontend/.env.example` for the complete configuration template.

---

## API Documentation

The backend provides RESTful API endpoints powered by FastAPI.

Interactive API documentation is automatically generated and available through:

text

```text
http://127.0.0.1:8000/docs
```

### Authentication API

Base Route: `/api/auth`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user account |
| POST | `/api/auth/login` | Authenticate user and receive access token |
| GET | `/api/auth/me` | Retrieve authenticated user profile |

### Social Media Generator API

Base Route: `/api/social-media`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/social-media/generate` | Generate social media content with hashtags and emojis |
| GET | `/api/social-media/history` | Retrieve social media generation history |
| POST | `/api/social-media/export/pdf` | Export generated content as PDF |
| POST | `/api/social-media/export/docx` | Export generated content as DOCX |

### Advertisement Generator API

Base Route: `/api/advertisement`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/advertisement/generate` | Generate advertising copy for multiple platforms |
| GET | `/api/advertisement/history` | Retrieve advertising generation history |
| POST | `/api/advertisement/export/pdf` | Export advertising copy as PDF |
| POST | `/api/advertisement/export/docx` | Export advertising copy as DOCX |

### Marketing Email Generator API

Base Route: `/api/email`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/email/generate` | Generate marketing and sales emails |
| GET | `/api/email/history` | Retrieve email generation history |
| POST | `/api/email/export/pdf` | Export email content as PDF |
| POST | `/api/email/export/docx` | Export email content as DOCX |

### System and Health API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Health check endpoint returning API status |

---

## Production Deployment

The project supports two deployment approaches: Render Blueprint deployment and Vercel monorepo serverless deployment.

### 1\. Deploy to Render

The repository includes a `render.yaml` Blueprint configuration for deploying the FastAPI backend and React frontend together.

**Deployment Steps**

1. Open the [Render Dashboard](<https://dashboard.render.com/>).
2. Select **New + → Blueprint**.
3. Connect your GitHub repository: `AI-Marketing-Content-Generator`.
4. Render automatically reads the `render.yaml` configuration.
5. Configure the required production environment variables.
6. Click **Apply** to initiate deployment.

**Services Provisioned**

| Service | Description |
| --- | --- |
| `ai-marketing-backend` | FastAPI web service running Python 3.11 |
| `ai-marketing-frontend` | Vite React static site with SPA routing |

Render automatically provisions, builds, and connects the configured services.

### 2\. Deploy to Vercel

The project also includes a root-level `vercel.json` configuration supporting monorepo deployment.

**Deployment Steps**

1. Open the [Vercel Dashboard](<https://vercel.com/new>).
2. Import your GitHub repository.
3. Keep the **Root Directory** set to `/`.
4. Configure the required production environment variables from `backend/.env.example`.
5. Click **Deploy**.

**Deployment Architecture**

- React frontend assets are built and deployed through Vercel.
- API requests under `/api/*` are routed through the Python serverless handler.
- `api/index.py` serves as the FastAPI serverless entry point.

---

## Use Cases

The platform is designed to support a wide range of marketing and content creation workflows.

| Audience | Use Case |
| --- | --- |
| Digital Marketing Agencies | Accelerate content creation across multiple client brands |
| E-Commerce Businesses | Generate SEO-friendly product descriptions and advertising copy |
| Startups and Founders | Create product launches, marketing campaigns, and cold outreach |
| Freelancers and Copywriters | Generate content variations, marketing hooks, and campaign ideas |
| Creators and Influencers | Create social media captions, hashtags, and engagement-focused content |

---

## Future Roadmap

The following improvements represent the planned direction of the platform.

- [ ]Multilingual content generation across 25+ global languages.
- [ ]AI Brand Voice Memory and Custom Persona Training.
- [ ]Automated Full-Funnel Campaign Planner.
- [ ]Direct Social Publishing through official platform APIs.
- [ ]AI-Assisted Graphic and Image Generation using FLUX / Stable Diffusion.
- [ ]Built-in A/B Testing and Copy Performance Analytics.

---

## Contributing

Contributions, suggestions, and improvements are welcome.

To contribute to the project, follow these steps:

**1\. Fork the repository.**

**2\. Create a new feature branch.**

bash

```bash
git checkout -b feature/AmazingFeature
```

**3\. Commit your changes.**

bash

```bash
git commit -m "feat: Add AmazingFeature"
```

**4\. Push your branch.**

bash

```bash
git push origin feature/AmazingFeature
```

**5\. Open a Pull Request.**

Your contributions are appreciated and help improve the project.

---

## License

This project is distributed under the **MIT License**.

See the LICENSE file for additional information.

---

## Author and Acknowledgments

**Author**

**Sachin Kumar**

GitHub: [@sachinkumartech](<https://github.com/sachinkumartech>)

**Technologies and Acknowledgments**

Built with ❤️ using:

- [FastAPI](<https://fastapi.tiangolo.com/>)
- [React](<https://react.dev/>)
- [Groq Cloud](<https://groq.com/>)
- [MongoDB](<https://www.mongodb.com/>)
- [Vite](<https://vitejs.dev/>)

---

\<p align="center"\> \<strong\>If you find this project useful, consider giving it a ⭐ on GitHub\!\</strong\> \</p\>

\<p align="center"\> Made with ❤️ by Sachin Kumar \</p\>

What I've improved:

- More consistent enterprise-style headings and section hierarchy.
- Cleaner badges and technology presentation.
- Professional feature descriptions and API tables.
- Better spacing, code formatting, and architecture presentation.
- Consistent terminology throughout the README.
- Cleaner GitHub-friendly Markdown.

Note: All original screenshot paths, API routes, environment variable names, deployment configurations, and author details have been retained.
