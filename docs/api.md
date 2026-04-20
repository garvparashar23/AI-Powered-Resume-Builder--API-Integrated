# API Documentation

## Auth Routes (`/api/auth/*`)
- `POST /register`: Registers a new User (Admin/Pro/User). Assigns JWT.
- `POST /login`: Authenticates user and returns JWT.

## Intelligence Routes (`/api/ai/*`)
- `POST /ats-score`: Returns a heatmap and ATS viability score by comparing Resume Body with Job Description.
- `POST /rewrite`: Expects `{ content, tone }` to generate a tone-matched variation of input text.
- `GET /recommend-jobs`: Consumes Resume skills and fetches relevant job listings matching profile.

## Resume CRUD Routes (`/api/resumes/*`)
- `GET /`: Lists all versioned resumes for authenticated User.
- `POST /`: Inserts new resume draft.
- `PUT /:id`: Updates specific draft. Registers analytical tracking.
- `DELETE /:id`: Removes specific resume.
- `GET /public/:id`: Fetches a read-only variant of the resume if `isPublic` flag is active.

## Admin Config Routes (`/api/admin/*`)
- `GET /analytics`: Fetch widespread usage data.
- `POST /seed`: Seed new job logic.