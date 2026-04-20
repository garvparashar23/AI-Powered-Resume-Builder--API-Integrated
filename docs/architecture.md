# System Architecture

## Architecture Overview

The AI Resume Intelligence Platform utilizes a traditional MVC server architecture integrated with a robust Plugin Engine, extending conventional node logic into extensible components.

**Core Components:**
- **Frontend Layer**: React + Vite + Tailwind CSS + Redux/Context (SaaS-scale UI)
- **Backend Service Layer**: Express.js REST API with modular controllers.
- **Data Layer**: MongoDB (Mongoose ORM).
- **Intelligence Plugin Engine**: Extensible Node.js plugins for ATS matching, NLP tone rewriting, Job Matching, and Bias Checking.

## Infrastructure

The application is containerized utilizing Docker. 
- The backend is deployed on Render / AWS EC2.
- The frontend is served via Vercel.

## Extensibility 

The `src/plugins/` directory allows for hot-swapping new AI capabilities without breaking core CRUD schema. Each AI module acts independently, fetching generic context and responding with specialized data (ATS scores, Tone optimizations).
