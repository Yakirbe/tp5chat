import React, { useEffect, useRef } from 'react';
import Message from './Message';
import ThinkingSpinner from './ThinkingSpinner';
import { useMessages } from '../hooks/useMessages';

const MessageList: React.FC = () => {
  const { messages, isThinking } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {isThinking && (
        <div className="flex justify-start">
          <ThinkingSpinner />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;