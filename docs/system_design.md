# System Design Flow

### Registration Flow
1. User completes OAuth or JWT Email auth.
2. User inserted into MongoDB. `plan` defaults to 'free', `role` defaults to 'user'.

### Resume Intelligence Generation
1. Client POSTs text content + Target Role context.
2. Request hits Express `aiRoutes`.
3. Route delegates to `intelligenceController`.
4. Controller utilizes `PluginSystem` orchestrator.
5. Orchestrator triggers specific local plugin logic, resolving via local heuristics OR external LLM APIs (OpenAI/Anthropic).
6. Sanitized output flows back to Client, rendered iteratively in UI.

### Analytics Polling
1. Express rate-limits API polling.
2. Heatmap interactions on Client (e.g., hover events) tally locally.
3. Every X minutes, Client fires silent `PUT /api/resumes/:id/heatmap` to update metrics.
4. Recruiter panel pulls aggregated `heatmapTracking` stats.
