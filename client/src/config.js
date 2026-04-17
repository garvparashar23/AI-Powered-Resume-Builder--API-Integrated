// This configuration file makes deploying to Vercel/Render seamless.
// Locally it defaults to your localhost backend.
// In production (Vercel), you just set the Environment Variable: VITE_API_URL=https://your-backend-url.com/api
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
