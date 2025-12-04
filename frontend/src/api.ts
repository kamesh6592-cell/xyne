import { hc } from "hono/client"
import { authFetch } from "./utils/authFetch"

// For development, use the original API structure
// For production/Vercel, we'll use simplified serverless functions
const isDevelopment = process.env.NODE_ENV === 'development' || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost')

export const api = isDevelopment 
  ? hc<any>("/api/v1", { fetch: authFetch })
  : hc<any>("/api", { fetch: authFetch }) // Use serverless API for production

// For WebSocket - use SSE for production, WebSocket for development  
const { protocol, host } = typeof window !== 'undefined' ? window.location : { protocol: 'http:', host: 'localhost:3000' }
const wsProtocol = protocol === "https:" ? "wss" : "ws"
const wsUrl = `${wsProtocol}://${host}`

export const wsClient = isDevelopment ? hc<any>(wsUrl) : null
