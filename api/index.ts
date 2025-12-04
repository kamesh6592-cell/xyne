import { handle } from 'hono/vercel'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Import server routes - we'll need to make these compatible with serverless
// For now, let's create a comprehensive API structure that matches the original

const app = new Hono().basePath('/api')

// Configure CORS
app.use('*', cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', 
    'https://xyne.vercel.app',
    /\.vercel\.app$/,
  ],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  credentials: true,
}))

// Create v1 routes group to match original API structure
const v1 = new Hono()

// Health check
v1.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Placeholder endpoints that return appropriate responses for development
v1.get('/me', async (c) => {
  return c.json({ 
    id: 'demo-user', 
    email: 'demo@example.com', 
    name: 'Demo User',
    role: 'user' 
  })
})

// Search endpoints
v1.post('/search', async (c) => {
  return c.json({
    results: [],
    total: 0,
    message: 'Search service not yet implemented in serverless mode'
  })
})

v1.get('/search', async (c) => {
  return c.json({
    results: [],
    total: 0,
    message: 'Search service not yet implemented in serverless mode'
  })
})

// Chat endpoints
v1.post('/chat', async (c) => {
  return c.json({
    id: 'demo-chat',
    response: 'This is a demo response. Full chat functionality is not yet implemented in serverless mode.',
    timestamp: new Date().toISOString()
  })
})

v1.post('/chat/stop', async (c) => {
  return c.json({ success: true })
})

// Agent endpoints
v1.get('/agents', async (c) => {
  return c.json({
    agents: [],
    message: 'Agent service not yet implemented in serverless mode'
  })
})

// Admin endpoints (placeholder)
v1.get('/admin/chats', async (c) => {
  return c.json({ chats: [], total: 0 })
})

v1.get('/admin/agents', async (c) => {
  return c.json({ agents: [] })
})

// Connectors endpoints
v1.get('/connectors/all', async (c) => {
  return c.json({ connectors: [] })
})

// Datasources endpoints
v1.get('/datasources', async (c) => {
  return c.json({ datasources: [] })
})

// CL (Collections) endpoints
v1.get('/cl', async (c) => {
  return c.json({ collections: [] })
})

// Workspace endpoints
v1.get('/workspace/users', async (c) => {
  return c.json({ users: [] })
})

// Messages endpoints
v1.get('/messages/participants', async (c) => {
  return c.json({ participants: [] })
})

// Channels endpoints
v1.get('/channels/:channelId', async (c) => {
  return c.json({ channel: null })
})

// Calls endpoints
v1.post('/calls/initiate', async (c) => {
  return c.json({ callId: 'demo-call', status: 'initiated' })
})

// Autocomplete endpoint
v1.post('/autocomplete', async (c) => {
  return c.json({ suggestions: [] })
})

// Tuning endpoints
v1.get('/tuning/datasets', async (c) => {
  return c.json({ datasets: [] })
})

// Workflow endpoints
v1.get('/workflow/executions/:executionId', async (c) => {
  return c.json({ execution: null })
})

// Slack endpoints
v1.get('/slack/documents', async (c) => {
  return c.json({ documents: [] })
})

// Ingestion endpoints
v1.get('/ingestion/status', async (c) => {
  return c.json({ status: 'idle' })
})

// OAuth endpoints
v1.post('/oauth/create', async (c) => {
  return c.json({ success: false, message: 'OAuth not implemented in serverless mode' })
})

// Mount v1 routes
app.route('/v1', v1)

// Also mount routes directly under /api for compatibility
app.route('/', v1)

// Catch-all for unimplemented endpoints
app.all('*', (c) => {
  return c.json({ 
    error: 'Endpoint not implemented in serverless mode',
    path: c.req.path,
    method: c.req.method
  }, 501)
})

export default handle(app)