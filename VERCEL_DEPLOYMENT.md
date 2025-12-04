# Xyne Vercel Deployment Guide

## Overview
This project has been configured for deployment on Vercel with serverless functions for the API and a static frontend build.

## Project Structure
```
xyne/
├── api/                    # Vercel serverless functions
│   ├── index.ts           # Main API handler
│   ├── package.json       # API dependencies
│   └── tsconfig.json      # TypeScript config for API
├── frontend/              # React frontend
│   ├── src/               # Source code
│   ├── dist/              # Built frontend (generated)
│   └── package.json       # Frontend dependencies
├── vercel.json            # Vercel configuration
└── package.json           # Root package.json

```

## Deployment Steps

### 1. Prerequisites
- GitHub account with this repository
- Vercel account
- Node.js 18+ installed locally

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import this repository
4. Vercel will auto-detect the configuration and deploy

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd xyne
vercel --prod
```

### 3. Environment Variables (Optional)
Set these in Vercel Dashboard > Project Settings > Environment Variables:
- `NODE_ENV=production`

## Configuration Details

### Vercel Configuration (`vercel.json`)
- **Build Command**: `cd frontend && npm run build:vercel`
- **Output Directory**: `frontend/dist`
- **Install Command**: `cd frontend && npm install --legacy-peer-deps`
- **API Routes**: All `/api/*` routes are handled by serverless functions

### API Structure
The API is built with Hono and provides:
- `/api/health` - Health check endpoint
- `/api/search` - Search functionality (placeholder)
- `/api/chat` - Chat functionality (placeholder)
- Additional endpoints with mock responses for development

### Frontend Features
- React + TypeScript
- Vite build system
- TanStack Router for routing
- Tailwind CSS for styling
- Support for PDF viewing, file uploads, and more

## Development vs Production

### Development Mode
- Uses original server API structure
- WebSocket support
- Full type checking with shared types

### Production Mode (Vercel)
- Uses simplified serverless API
- No WebSocket (can be replaced with Server-Sent Events)
- Local type definitions for compatibility

## Customizing for Your Needs

### Adding Real API Functionality
1. Update `api/index.ts` to implement actual business logic
2. Add database connections and external service integrations
3. Implement authentication and authorization

### Environment-Specific Configuration
- Development: Uses `/api/v1` endpoints
- Production: Uses `/api` endpoints (serverless)
- Automatically detected based on hostname

## Troubleshooting

### Build Issues
- Ensure all dependencies are compatible with React 19
- Use `--legacy-peer-deps` flag for npm install
- Check Vercel build logs for specific errors

### API Issues
- Check Vercel Functions logs in the dashboard
- Ensure serverless functions don't exceed time/memory limits
- Verify environment variables are set correctly

## Performance Considerations
- Frontend bundle is optimized for production
- Large chunks are code-split automatically
- Static assets are served via Vercel's CDN
- API responses should be kept lightweight for serverless

## Next Steps
1. Replace placeholder API endpoints with real functionality
2. Set up database connections (consider serverless-friendly options)
3. Implement proper authentication
4. Add monitoring and error tracking
5. Configure custom domain if needed

## Support
For issues specific to the Xyne application, refer to the main README.md
For Vercel-specific issues, check [Vercel documentation](https://vercel.com/docs)