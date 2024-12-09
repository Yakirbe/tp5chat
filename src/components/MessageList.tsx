import React, { useEffect, useRef, useState } from 'react';
import { useMessageStore } from '../store/messageStore';
import { MessageType, ContentType } from '../types';
import { MessageContentHandler } from './MessageHandlers';

const MessageList: React.FC = () => {
  const { messages } = useMessageStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRunCommand = async (command: string) => {
    // TODO: Implement command execution
    console.log('Running command:', command);
  };

  // Filter out spinner messages that have a next message
  const visibleMessages = messages.filter((message, index) => {
    if (message.preview?.type === ContentType.Spinner) {
      // Hide spinner if there's a next message
      return index === messages.length - 1;
    }
    return true;
  });

  return (
    <div className="flex-1 overflow-hidden relative">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto p-4 space-y-4"
      >
        {visibleMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === MessageType.User ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] space-y-2 ${
                message.type === MessageType.User
                  ? 'items-end'
                  : 'items-start'
              }`}
            >
              {message.preview ? (
                <MessageContentHandler 
                  content={message.preview} 
                  onRunCommand={handleRunCommand}
                />
              ) : (
                <div
                  className={`rounded-lg p-3 ${
                    message.type === MessageType.User
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <MessageContentHandler 
                    content={{
                      type: ContentType.Text,
                      text: message.content
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Invisible element for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll to bottom"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MessageList;