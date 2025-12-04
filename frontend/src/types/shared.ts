// Shared types for frontend - copied from server for production build compatibility

export enum Apps {
  GoogleDrive = "google_drive",
  Gmail = "gmail",
  GoogleCalendar = "google_calendar", 
  Slack = "slack",
  OneDrive = "onedrive",
  MicrosoftGraph = "microsoft_graph",
  Outlook = "outlook",
  OutlookCalendar = "outlook_calendar"
}

export enum AuthType {
  OAuth = "oauth",
  ServiceAccount = "service_account",
  ApiKey = "api_key"
}

export enum ConnectorStatus {
  Active = "active",
  Inactive = "inactive",
  Error = "error",
  Pending = "pending"
}

export enum UserRole {
  Admin = "admin",
  User = "user"
}

export enum UploadStatus {
  Pending = "pending",
  Processing = "processing", 
  Completed = "completed",
  Failed = "failed"
}

export enum ApiKeyScopes {
  Read = "read",
  Write = "write",
  Admin = "admin"
}

export interface PublicUser {
  id: string
  email: string
  name?: string
  role: UserRole
}

export interface PublicWorkspace {
  id: string
  name: string
}

export interface SelectPublicAgent {
  id: string
  name: string
  description?: string
}

export interface SelectPublicChat {
  id: string
  title: string
  createdAt: Date
}

export interface UserMetadata {
  id: string
  email: string
  role: UserRole
}

export enum UserWorkflowRole {
  Admin = "admin",
  User = "user"
}

export interface VespaGetResult {
  id: string
  fields: Record<string, any>
}

export interface VespaDataSourceFile {
  id: string
  filename: string
  content: string
}

export interface Entity {
  id: string
  type: string
  name: string
}

// Search result types
export interface SearchResultDiscriminatedUnion {
  type: string
  id: string
  title: string
  content?: string
  chunks_summary?: any[]
  score?: number
  source?: string
  url?: string
  metadata?: Record<string, any>
}

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  timestamp: Date
  sources?: any[]
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

// Additional types that might be needed
export type AppType = any
export type WebSocketApp = any