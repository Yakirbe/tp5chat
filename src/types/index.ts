export type DataSource = {
  id: string;
  name: string;
  type: 'desktop' | 'provider';
  description: string;
  requiresPermission: boolean;
  icon: string;
};

export type MessageType = 'user' | 'ai' | 'system' | 'error' | 'success';

export type Message = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  dataSources?: string[];
  preview?: {
    type: 'terminal' | 'screen' | 'web' | 'data' | 'system';
    content: string;
    command?: string;
    requiresAction?: boolean;
  };
};

export type PermissionStatus = {
  [key: string]: boolean;
};