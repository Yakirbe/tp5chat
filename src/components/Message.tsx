import React from 'react';
import classNames from 'classnames';
import { Message as MessageType } from '../types';
import DataPreview from './DataPreview';
import TerminalPreview from './TerminalPreview';
import SystemInfoPreview from './SystemInfoPreview';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const content = message.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < message.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  const renderPreview = () => {
    if (!message.preview) return null;

    if (message.preview.type === 'terminal') {
      return (
        <TerminalPreview
          content={message.preview.content}
          command={message.preview.command}
          onAccept={message.preview.requiresAction ? () => {} : undefined}
          onReject={message.preview.requiresAction ? () => {} : undefined}
        />
      );
    }

    if (message.preview.type === 'system') {
      return <SystemInfoPreview />;
    }

    return (
      <DataPreview
        type={message.preview.type}
        content={message.preview.content}
      />
    );
  };

  return (
    <div
      className={classNames('flex', {
        'justify-end': message.type === 'user',
        'justify-start': message.type === 'ai' || message.type === 'success'
      })}
    >
      <div
        className={classNames('max-w-[80%]', {
          'space-y-2': message.preview
        })}
      >
        <div
          className={classNames('rounded-lg p-3 whitespace-pre-wrap', {
            'bg-blue-600 text-white': message.type === 'user',
            'bg-gray-100': message.type === 'ai',
            'bg-yellow-100': message.type === 'system',
            'bg-red-100': message.type === 'error',
            'bg-green-100': message.type === 'success'
          })}
        >
          {content}
        </div>
        {renderPreview()}
      </div>
    </div>
  );
};

export default Message;