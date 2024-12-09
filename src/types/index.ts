export type DataSource = {
  id: string;
  name: string;
  type: 'desktop' | 'provider';
  description: string;
  requiresPermission: boolean;
  icon: string;
};

export enum MessageType {
  User = 'user',
  Assistant = 'assistant',
  System = 'system'
}

export enum ContentType {
  Text = 'text',
  Image = 'image',
  CodeBlock = 'code_block',
  Terminal = 'terminal',
  UserData = 'user_data',
  VendorData = 'vendor_data',
  Spinner = 'spinner'
}

export enum PreviewType {
  Terminal = 'terminal',
  Image = 'image',
  Code = 'code',
  Screenshot = 'screenshot'
}

export interface BaseContent {
  type: ContentType;
}

export interface TextContent extends BaseContent {
  type: ContentType.Text;
  text: string;
}

export interface ImageContent extends BaseContent {
  type: ContentType.Image;
  capture?: {
    imageUrl: string;
    timestamp: number;
    dimensions: {
      width: number;
      height: number;
    };
  };
  requestCapture?: boolean;
}

export interface CodeBlockContent extends BaseContent {
  type: ContentType.CodeBlock;
  code: string;
  language: string;
  filename?: string;
}

export interface TerminalStep {
  command: string;
  output?: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}

export interface TerminalContent extends BaseContent {
  type: ContentType.Terminal;
  steps: TerminalStep[];
  current_step: number;
  status: 'pending' | 'running' | 'completed' | 'error';
}

export interface UserDataContent extends BaseContent {
  type: ContentType.UserData;
  data: any;
  source: string;
  timestamp: number;
}

export interface VendorDataContent extends BaseContent {
  type: ContentType.VendorData;
  data: any;
  vendor: string;
  timestamp: number;
}

export interface SpinnerContent extends BaseContent {
  type: ContentType.Spinner;
  text: string;
  duration: number; // milliseconds
}

export interface MessagePreview {
  type: PreviewType;
  content?: string;
  command?: string;
  output?: string;
  status?: 'pending' | 'running' | 'completed' | 'error';
  capture?: ScreenCapture;
  steps?: TerminalStep[];
  current_step?: number;
}

export interface ScreenCapture {
  imageUrl: string;
  timestamp: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export type MessageContent = 
  | TextContent
  | ImageContent
  | CodeBlockContent
  | TerminalContent
  | UserDataContent
  | VendorDataContent
  | SpinnerContent;

export interface MockMessage {
  role: MessageType;
  content: MessageContent;
  delay?: number; // Optional delay before showing this message (milliseconds)
}

export interface Message {
  content: string;
  type: MessageType;
  timestamp: number;
  preview?: MessageContent;
}

export type PermissionType = 'once' | 'always';

export type PermissionStatus = {
  [key: string]: boolean;
};