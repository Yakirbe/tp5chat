import React from 'react';
import { ImageMessage as ImageMessageType } from '../../types/messages';

interface Props {
  message: ImageMessageType;
}

export const ImageMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="message image-message" style={{ maxWidth: message.width }}>
      <img 
        src={message.image} 
        alt="Screenshot" 
        width={message.width}
        height={message.height}
        loading="lazy"
      />
    </div>
  );
};
