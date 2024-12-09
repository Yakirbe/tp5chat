import React from 'react';
import { MessagePreview as IMessagePreview, TerminalStep } from '../types';
import { 
  TerminalHandler, 
  ImageHandler, 
  CodeBlockHandler,
  DataLogHandler 
} from './MessageHandlers';

interface MessagePreviewProps {
  preview: IMessagePreview;
  onRunCommand?: (command: string) => void;
}

const MessagePreview: React.FC<MessagePreviewProps> = ({ preview, onRunCommand }) => {
  if (!preview) return null;

  switch (preview.type) {
    case 'terminal': {
      const defaultStep: TerminalStep = {
        command: preview.command || '',
        output: preview.output,
        status: preview.status || 'pending'
      };
      
      return (
        <TerminalHandler
          steps={preview.steps || [defaultStep]}
          current_step={preview.current_step || 0}
          status={preview.status || 'pending'}
          onRun={onRunCommand}
        />
      );
    }

    case 'image':
      return preview.capture ? <ImageHandler capture={preview.capture} /> : null;

    case 'code':
      return preview.content ? (
        <CodeBlockHandler
          code={preview.content}
          language="plaintext"
        />
      ) : null;

    default:
      return null;
  }
};

export default MessagePreview; 