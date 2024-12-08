import { MessageType } from '../types';
import { mockPreviews } from './mockPreviews';

type MockMessage = {
  content: string;
  type: MessageType;
  requiresPermission?: string;
  action?: () => void;
  preview?: {
    type: 'terminal' | 'screen' | 'web' | 'data' | 'system';
    content: string;
    command?: string;
    requiresAction?: boolean;
  };
};

export const mockSequence: MockMessage[] = [
  {
    content: "I encountered a version mismatch error in the CLI. Can you help?",
    type: 'user'
  },
  {
    content: "I'll help you resolve this version mismatch error. First, I need to check your system information. Would you grant me access?",
    type: 'ai',
    action: () => window.requestPermission?.('system')
  },
  {
    content: "Yes, go ahead.",
    type: 'user'
  },
  {
    content: "Thank you. Let me analyze your system configuration:",
    type: 'ai',
    requiresPermission: 'system',
    preview: {
      type: 'system',
      content: ''
    }
  },
  {
    content: "I see you're running Node.js v16. Now, I need to check your terminal output. Would you grant me access?",
    type: 'ai',
    action: () => window.requestPermission?.('terminal')
  },
  {
    content: "Go ahead.",
    type: 'user'
  },
  {
    content: "I can see the error in your terminal. Let me analyze it:",
    type: 'ai',
    requiresPermission: 'terminal',
    preview: {
      type: 'terminal',
      content: mockPreviews.terminal,
      command: 'wiz-cli deploy'
    }
  },
  {
    content: "I understand the issue. You're running version 2.1.0 but need 3.0.0. Would you like me to check the changelog for breaking changes?",
    type: 'ai',
    action: () => window.requestPermission?.('knowledge')
  },
  {
    content: "Yes, please check.",
    type: 'user'
  },
  {
    content: "Here are the important changes in version 3.0.0:",
    type: 'ai',
    requiresPermission: 'knowledge',
    preview: {
      type: 'web',
      content: mockPreviews.browser
    }
  },
  {
    content: "I can help you upgrade safely. First, let me check our internal logs for any known issues with this upgrade path.",
    type: 'ai',
    action: () => window.requestPermission?.('logs')
  },
  {
    content: "Here's what I found in the logs:",
    type: 'ai',
    requiresPermission: 'logs',
    preview: {
      type: 'data',
      content: mockPreviews.logs
    }
  },
  {
    content: "I'll help you upgrade. Would you like me to run the upgrade command?",
    type: 'ai',
    preview: {
      type: 'terminal',
      content: 'This will update your CLI to version 3.0.0',
      command: 'npm install -g @wiz/cli@3.0.0',
      requiresAction: true
    }
  },
  {
    content: "Yes, please proceed.",
    type: 'user'
  },
  {
    content: "Running the upgrade process...",
    type: 'ai',
    preview: {
      type: 'terminal',
      content: mockPreviews.terminal + '\n\nUpgrading CLI...\nMigrating configuration...\nUpdate complete!'
    }
  },
  {
    content: "✅ Upgrade completed successfully! Here are the performance improvements:",
    type: 'success',
    preview: {
      type: 'data',
      content: mockPreviews.metrics
    }
  }
];