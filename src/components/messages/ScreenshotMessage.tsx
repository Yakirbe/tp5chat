import React from 'react';
import { ScreenshotMessage as ScreenshotMessageType } from '../../types/messages';

interface Props {
  message: ScreenshotMessageType;
}

export const ScreenshotMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="message screenshot-message">
      <div className="screenshot-timestamp">Screenshot taken at: {new Date(message.timestamp).toLocaleTimeString()}</div>
      <div className="screenshot-container">
        <img 
          src={message.image} 
          alt="Screenshot" 
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}; 