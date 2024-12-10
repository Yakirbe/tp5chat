export type Speaker = 'Support Agent' | 'Technical Support Agent' | 'User' | 'System';

export interface BaseMessage {
  id: string;
  timestamp: Date;
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  speaker: Speaker;
  content: string;
}

export interface ImageMessage extends BaseMessage {
  type: 'image';
  image: string;
  width: number;
  height: number;
}

export interface ActionButtonsMessage extends BaseMessage {
  type: 'action_buttons';
  buttons: string[];
}

export interface SpinnerMessage extends BaseMessage {
  type: 'spinner';
  text: string;
  duration?: number;
}

export interface ScreenshotMessage extends BaseMessage {
  type: 'screenshot';
  image: string;
  width: number;
  height: number;
}

export interface TableMessage extends BaseMessage {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export type ChatMessage = TextMessage | ImageMessage | ActionButtonsMessage | SpinnerMessage | ScreenshotMessage | TableMessage;

export const createMessage = {
  text: (speaker: Speaker, content: string): TextMessage => ({
    id: `text-${Date.now()}-${Math.random()}`,
    type: 'text',
    speaker,
    content,
    timestamp: new Date()
  }),

  image: (image: string, width: number, height: number): ImageMessage => ({
    id: `image-${Date.now()}-${Math.random()}`,
    type: 'image',
    image,
    width,
    height,
    timestamp: new Date()
  }),

  actionButtons: (buttons: string[]): ActionButtonsMessage => ({
    id: `buttons-${Date.now()}-${Math.random()}`,
    type: 'action_buttons',
    buttons,
    timestamp: new Date()
  }),

  spinner: (text: string): SpinnerMessage => ({
    id: `spinner-${Date.now()}-${Math.random()}`,
    type: 'spinner',
    text,
    timestamp: new Date()
  }),

  screenshot: (image: string, width: number, height: number): ScreenshotMessage => ({
    id: `screenshot-${Date.now()}-${Math.random()}`,
    type: 'screenshot',
    image,
    width,
    height,
    timestamp: new Date()
  }),

  table: (headers: string[], rows: string[][]): TableMessage => ({
    id: `table-${Date.now()}-${Math.random()}`,
    type: 'table',
    headers,
    rows,
    timestamp: new Date()
  })
}; 