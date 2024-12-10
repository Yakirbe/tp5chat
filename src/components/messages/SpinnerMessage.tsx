import React, { useEffect, useState } from 'react';
import { DialogStep } from '../../data/dialogSteps';

interface Props {
  message: DialogStep;
  onComplete?: () => void;
}

export const SpinnerMessage: React.FC<Props> = ({ message, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, message.duration || 3000);

    return () => clearTimeout(timer);
  }, [onComplete, message.duration]);

  if (!isVisible) return null;

  return (
    <div className="message spinner-message">
      <div className="spinner">
        <div className="spinner-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="spinner-text">{message.message}</div>
      </div>
    </div>
  );
};
