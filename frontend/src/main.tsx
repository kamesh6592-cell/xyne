import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
// import App from './App.tsx'
import "./index.css"
import { RouterProvider, createRouter } from "@tanstack/react-router"
// Import the generated route tree
import { routeTree } from "@/routeTree.gen"
import { ThemeProvider } from "@/components/ThemeContext"
import { Toaster } from "@/components/ui/toaster"
import UploadProgressWidget from "@/components/UploadProgressWidget"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Add comprehensive error logging for debugging
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error, 'at', e.filename, e.lineno, e.colno)
  document.body.innerHTML += `<div style="background: red; color: white; padding: 10px;">Error: ${e.error?.message || 'Unknown error'}</div>`
})

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason)
  document.body.innerHTML += `<div style="background: orange; color: white; padding: 10px;">Promise rejection: ${e.reason}</div>`
})

// Log when the script starts
console.log('Main script starting...')

const queryClient = new QueryClient({})

// Create a new router instance
const router = createRouter({ routeTree })
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
  interface HistoryState {
    isQueryTyped: boolean
  }
}
const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Xyne App - Debug Mode</h1>
          <p>If you can see this, the basic React app is working!</p>
          <div style={{ marginTop: '20px' }}>
            <RouterProvider router={router} />
          </div>
        </div>
        <Toaster />
        <UploadProgressWidget />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
