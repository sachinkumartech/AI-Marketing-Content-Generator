# 🚀 AI Marketing Content Generator

> **An enterprise-grade, full-stack AI marketing automation platform built with FastAPI, React 19, Vite, and Groq LLMs (Llama 3.3 70B Versatile) to generate high-converting marketing assets in seconds.**

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F05032?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2F%20Beanie-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

## 📑 Table of Contents

- [📌 Overview](#-overview)
- [✨ Key Features](#-key-features)
  - [📱 AI Social Media Post Generator](#-ai-social-media-post-generator)
  - [📧 AI Marketing Email Generator](#-ai-marketing-email-generator)
  - [🛍️ AI Product Description Generator](#️-ai-product-description-generator)
  - [📢 AI Advertisement Generator](#-ai-advertisement-generator)
  - [🔐 Authentication & Session Security](#-authentication--session-security)
  - [📄 History & Document Exporting](#-history--document-exporting)
- [🖼️ Application Screenshots](#️-application-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Architecture](#-project-architecture)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [🔐 Environment Variables Guide](#-environment-variables-guide)
- [📡 API Documentation](#-api-documentation)
- [🚀 Production Deployment](#-production-deployment)
  - [Deploy to Render (Blueprint)](#-deploy-to-render-blueprint)
  - [Deploy to Vercel (Monorepo Serverless)](#-deploy-to-vercel-monorepo-serverless)
- [🎯 Use Cases](#-use-cases)
- [🔮 Future Roadmap](#-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Authors & Acknowledgments](#-authors--acknowledgments)

---

## 📌 Overview

**AI Marketing Content Generator** is an end-to-end generative AI platform designed for marketing teams, e-commerce sellers, growth agencies, startups, and creators. Instead of juggling multiple disjointed AI tools, users can brainstorm, write, optimize, format, and export multi-channel marketing campaigns from a single dashboard.

Powered by **Groq's ultra-low latency inference engine** running **Llama 3.3 70B Versatile**, the application delivers near-instantaneous content generation with intelligent context-awareness, tone matching, and platform-specific constraints.

---

## ✨ Key Features

### 📱 AI Social Media Post Generator
Craft compelling, scroll-stopping social copy tailored specifically for each channel:
- **Supported Channels:** Instagram, LinkedIn, Facebook, Twitter (X).
- **Generation Outputs:** Captions, targeted & trending hashtags, contextual emojis, and high-impact Calls-to-Action (CTAs).
- **Customization:** Tone selection (Professional, Casual, Witty, Urgency, Informative), target demographic tuning, and character constraint adherence.

### 📧 AI Marketing Email Generator
Generate high-converting email copy with customizable frameworks:
- **Campaign Types:** Promotional offers, product launch announcements, onboarding/welcome series, recurring newsletters, sales pitches, cold outreach, and follow-ups.
- **Attributes:** Subject line variations, preview text, body copy structuring, tone selection, and dynamic CTA buttons.

### 🛍️ AI Product Description Generator
Generate persuasive, conversion-focused e-commerce product copy:
- **SEO Optimized:** Automatic integration of target focus keywords.
- **Formatting Options:** Bullet-point benefits, key feature breakdowns, punchy one-liners, and comprehensive long-form descriptions.

### 📢 AI Advertisement Generator
Build multi-platform ad campaigns ready for ad networks:
- **Ad Networks:** Google Search & Display Ads, Facebook Ads, Instagram Sponsored Posts, LinkedIn Ads.
- **Copy Components:** Attention-grabbing headlines, primary text, secondary descriptions, hooks, and platform-compliant CTAs.

### 🔐 Authentication & Session Security
- Robust JWT-based authentication (`python-jose` / `passlib` with `bcrypt`).
- MongoDB Atlas integration via the **Beanie ODM** (asynchronous Motor driver).
- Secure fallback memory-cache and graceful reconnection handling for high availability.

### 📄 History & Document Exporting
- Persistent generation history with real-time reload and review.
- Export generated copy directly into downloadable **PDF** and **DOCX** files with formatted headers, metadata, and timestamps.

---

## 🖼️ Application Screenshots

### 🏠 Dashboard & Landing Page
![Aethera Landing Page](./screenshots/Screenshot%202026-07-17%20194127_2.jpg)

### 📱 Social Media Generator
![Social Suite](./screenshots/Screenshot%202026-07-17%20194244_2.png)

### 📧 Marketing Email Generator
![Email Engine](./screenshots/Screenshot%202026-07-17%20194258_2.png)

### 🛍️ Product Description Generator
![Product Copy AI](./screenshots/Screenshot%202026-07-17%20194312_2.png)

### 📢 Advertisement Generator
![Ad Campaign Builder](./screenshots/Screenshot%202026-07-17%20194334_2.png)

---

## 🛠️ Tech Stack

| Domain | Technology / Library | Description |
|---|---|---|
| **Frontend Framework** | React 19 + Vite 5 | Fast HMR, component-driven UI architecture |
| **Routing & UI** | React Router DOM v6, Lucide Icons | Client-side routing, modern vector iconography |
| **Styling** | Modular CSS3 + Responsive Design | Sleek dark-mode aesthetic with custom animations |
| **Backend Framework** | FastAPI (Python 3.10+) | High-performance asynchronous REST API |
| **LLM Inference** | Groq Cloud SDK (`llama-3.3-70b-versatile`) | Blazing fast LPU inference for real-time streaming |
| **Secondary AI Engine** | Google Generative AI (Gemini Flash) | Client-side fallback / assistant support |
| **Database & ODM** | MongoDB + Beanie ODM (Motor) | Async document-based storage for users & history |
| **Security & Auth** | JWT (`python-jose`) + `passlib` (`bcrypt`) | Secure token-based authentication |
| **Document Exporting** | `reportlab` (PDF) + `python-docx` (DOCX) | Server-side formatted file generation |
| **Deployment Targets** | Render (Blueprint), Vercel (Serverless) | Production containerized and serverless environments |

---

## 📂 Project Architecture

```text
AI-Marketing-Content-Generator/
├── .github/                     # GitHub workflows and config
├── api/
│   └── index.py                 # Serverless WSGI/ASGI entrypoint for Vercel
├── backend/
│   ├── app/
│   │   ├── ai/                  # AI client integration (Groq client wrapper)
│   │   ├── auth/                # Security, JWT tokens, bcrypt password hashing
│   │   ├── config/              # Application settings & environment loader
│   │   ├── database/            # MongoDB Motor client & Beanie setup
│   │   ├── models/              # Beanie ODM Document models
│   │   ├── prompts/             # Engineered system & task prompts
│   │   ├── routers/             # API endpoints (Auth, Social, Ad, Email)
│   │   ├── schemas/             # Pydantic validation schemas
│   │   ├── services/            # Business logic & AI generation pipelines
│   │   ├── utils/               # Export utilities (PDF, DOCX) & helpers
│   │   └── main.py              # FastAPI application factory & middleware
│   ├── .env.example             # Template for backend environment variables
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── assets/              # Branding, icons, hero images
│   │   ├── components/          # Reusable UI components (Navbar, Modals, 3D Canvas)
│   │   ├── hooks/               # Custom React hooks (useAuth, useToast, etc.)
│   │   ├── layouts/             # Page layouts
│   │   ├── pages/               # Views (SocialMedia, Email, Ad, History, Profile)
│   │   ├── routes/              # Client routing configuration
│   │   ├── services/            # Axios API client & communication layer
│   │   ├── styles/              # Global & modular CSS styles
│   │   ├── utils/               # Gemini client & mock AI fallback handlers
│   │   ├── App.jsx              # Main App entrypoint
│   │   └── main.jsx             # React root mounting
│   ├── .env.example             # Template for frontend environment variables
│   ├── package.json             # NPM dependencies & scripts
│   └── vite.config.js           # Vite build configuration
├── screenshots/                 # Application preview screenshots
├── .gitignore                   # Comprehensive secrets & artifact exclusion rules
├── render.yaml                  # Render Blueprint definition (backend + frontend)
├── vercel.json                  # Vercel Monorepo deployment specification
└── README.md                    # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Python**: `3.10` or higher
- **Node.js**: `18.0` or higher (along with `npm` or `pnpm`)
- **MongoDB**: A running local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URI.
- **Groq API Key**: Obtain a free API key from [Groq Console](https://console.groq.com/).

---

### 1. Clone Repository

```bash
git clone https://github.com/sachinkumartech/AI-Marketing-Content-Generator.git
cd AI-Marketing-Content-Generator
```

---

### 2. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   - **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **macOS / Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your credentials:
   ```env
   DATABASE_URL=mongodb://localhost:27017
   GROQ_API_KEY=your_groq_api_key_here
   JWT_SECRET=your_jwt_secret_here
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```

5. **Start the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
   - API is live at: `http://127.0.0.1:8000`
   - Interactive Swagger API docs: `http://127.0.0.1:8000/docs`
   - ReDoc documentation: `http://127.0.0.1:8000/redoc`

---

### 3. Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install NPM dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Configure `.env` as needed:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Optional)* To override the backend connection URL in local development:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   - Access the web interface in your browser: `http://localhost:5173`

---

## 🔐 Environment Variables Guide

> [!IMPORTANT]
> Never commit actual `.env` files or secret keys to version control. The repository's `.gitignore` is pre-configured to strictly ignore all `.env` files while preserving `.env.example` templates.

### Backend (`backend/.env`)

| Variable | Required | Description | Example / Default |
|---|---|---|---|
| `DATABASE_URL` | **Yes** | MongoDB connection string (Local or MongoDB Atlas) | `mongodb://localhost:27017` or `mongodb+srv://...` |
| `GROQ_API_KEY` | **Yes** | API key for Groq Cloud LLM inference | `gsk_...` |
| `JWT_SECRET` | **Yes** | High-entropy secret key for signing JWT tokens | Random string (e.g., `openssl rand -hex 32`) |
| `JWT_ALGORITHM` | No | Cryptographic algorithm for JWT encoding | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | Expiration duration for access tokens | `60` |
| `CORS_ORIGINS` | No | Allowed CORS origin URLs (comma-separated or `*`) | `*` |
| `ENVIRONMENT` | No | Current deployment environment | `development` or `production` |

### Frontend (`frontend/.env`)

| Variable | Required | Description | Example / Default |
|---|---|---|---|
| `VITE_API_BASE_URL` | No | URL to the deployed backend server | `http://127.0.0.1:8000` (defaults to current domain) |
| `GEMINI_API_KEY` | No | Optional Google Gemini key for frontend assist | `AIza...` |

---

## 📡 API Documentation

Interactive OpenAPI documentation is generated automatically by FastAPI at `/docs`. Below is a quick overview of primary endpoints:

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Authenticate user & receive access token |
| `GET` | `/api/auth/me` | Fetch currently authenticated user profile |

### Social Media Generator (`/api/social-media`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/social-media/generate` | Generate social post with hashtags & emojis |
| `GET` | `/api/social-media/history` | Retrieve user's social post generation history |
| `POST` | `/api/social-media/export/pdf` | Export generated post to a formatted PDF |
| `POST` | `/api/social-media/export/docx` | Export generated post to a Word DOCX |

### Advertisement Generator (`/api/advertisement`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/advertisement/generate` | Generate multi-platform advertising copy |
| `GET` | `/api/advertisement/history` | Retrieve user's advertising copy history |
| `POST` | `/api/advertisement/export/pdf` | Export ad copy to PDF |
| `POST` | `/api/advertisement/export/docx` | Export ad copy to DOCX |

### Email Generator (`/api/email`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/email/generate` | Generate marketing & sales emails |
| `GET` | `/api/email/history` | Retrieve user's email generation history |
| `POST` | `/api/email/export/pdf` | Export email draft to PDF |
| `POST` | `/api/email/export/docx` | Export email draft to DOCX |

### System & Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check endpoint returning API status |

---

## 🚀 Production Deployment

### 🌐 Deploy to Render (Blueprint)

This repository includes a native `render.yaml` Blueprint specification that deploys the Python FastAPI Web Service and Vite static site together:

1. Log into your [Render Dashboard](https://dashboard.render.com/).
2. Select **New +** > **Blueprint**.
3. Connect this repository (`AI-Marketing-Content-Generator`).
4. Render automatically parses `render.yaml` and prepares two services:
   - **`ai-marketing-backend`**: FastAPI web service running Python 3.11.
   - **`ai-marketing-frontend`**: Vite React static site with SPA routing.
5. Provide your production environment variables in the Render dashboard:
   - `DATABASE_URL`: Your MongoDB Atlas URI.
   - `GROQ_API_KEY`: Your production Groq API Key.
6. Click **Apply**. Render will automatically provision, build, and link both services.

---

### ⚡ Deploy to Vercel (Monorepo Serverless)

The project includes a root `vercel.json` file configuring both the React frontend and serverless Python backend:

1. Import your repository into the [Vercel Dashboard](https://vercel.com/new).
2. Leave **Root Directory** as the root (`/`).
3. Under **Environment Variables**, supply:
   - `DATABASE_URL`
   - `GROQ_API_KEY`
   - `JWT_SECRET`
   - `JWT_ALGORITHM` (`HS256`)
   - `ACCESS_TOKEN_EXPIRE_MINUTES` (`60`)
4. Click **Deploy**. Vercel will build the frontend assets and route `/api/*` requests through the serverless FastAPI handler in `api/index.py`.

---

## 🎯 Use Cases

- 📈 **Digital Marketing Agencies:** Accelerate content turnaround times for multiple client brands.
- 🛒 **E-Commerce Brands:** Instantly produce SEO product descriptions and Facebook/Instagram ads at scale.
- 🚀 **Startups & Founders:** Launch marketing campaigns, product launches, and cold outreach without a dedicated copywriter.
- 👨‍💻 **Freelancers & Copywriters:** Overcome writer's block and generate multiple copy variations and hooks.
- 🎥 **Creators & Influencers:** Generate targeted captions, hashtags, and engagement hooks for social channels.

---

## 🔮 Future Roadmap

- [ ] Multi-lingual generation across 25+ global languages.
- [ ] AI Brand Voice Memory & Custom Persona Training.
- [ ] Automated Full-Funnel Campaign Planner.
- [ ] Direct Social Publishing via official platform APIs.
- [ ] AI-assisted Graphic & Image Generation (FLUX / Stable Diffusion).
- [ ] Built-in A/B Testing & Copy Performance Analytics.

---

## 🤝 Contributing

Contributions are welcomed and greatly appreciated!

1. Fork the Project.
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes:
   ```bash
   git commit -m "feat: Add AmazingFeature"
   ```
4. Push to the Branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Authors & Acknowledgments

- **Sachin Kumar** ([@sachinkumartech](https://github.com/sachinkumartech))
- Built with ❤️ using [FastAPI](https://fastapi.tiangolo.com/), [React](https://react.dev/), and [Groq Cloud](https://groq.com/).

---

<p align="center">
  ⭐ If you found this project helpful, please consider giving it a star on GitHub! ⭐
</p>
