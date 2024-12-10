import React from 'react';
import { TextMessage as TextMessageType } from '../../types/messages';

interface Props {
  message: TextMessageType;
}

export const TextMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className={`message ${message.speaker === 'User' ? 'user-message' : 'agent-message'}`}>
      <div className="message-header">{message.speaker}</div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};
