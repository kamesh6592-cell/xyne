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

export enum IngestionType {
  Automatic = "automatic",
  Manual = "manual",
  Scheduled = "scheduled"
}

export enum UserWorkflowRole {
  Admin = "admin",
  User = "user"
}

export enum ConnectorType {
  GoogleDrive = "google_drive",
  Gmail = "gmail", 
  Slack = "slack",
  OneDrive = "onedrive"
}

export enum FileType {
  PDF = "pdf",
  DOC = "doc",
  DOCX = "docx",
  TXT = "txt",
  IMAGE = "image"
}

// Interfaces
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

export interface DriveEntity {
  id: string
  name: string
  mimeType?: string
}

export interface GooglePeopleEntity {
  id: string
  names?: Array<{ displayName: string }>
  emailAddresses?: Array<{ value: string }>
}

export interface CalendarEntity {
  id: string
  summary: string
  start?: { dateTime: string }
  end?: { dateTime: string }
}

export interface SystemEntity {
  id: string
  type: string
  name: string
}

export interface DataSourceEntity {
  id: string
  name: string
  type: string
}

export interface WebSearchEntity {
  id: string
  title: string
  url: string
  snippet?: string
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

// Utility functions
export function isMailAttachment(entity: any): boolean {
  return entity && entity.type === 'mail_attachment'
}

export function getFileType(filename: string): FileType {
  const extension = filename.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'pdf':
      return FileType.PDF
    case 'doc':
    case 'docx':
      return FileType.DOCX
    case 'txt':
      return FileType.TXT
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return FileType.IMAGE
    default:
      return FileType.TXT
  }
}

export function isValidFile(filename: string): boolean {
  const validExtensions = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'gif']
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? validExtensions.includes(extension) : false
}

// Additional types that might be needed
export type AppType = any
export type WebSocketApp = any