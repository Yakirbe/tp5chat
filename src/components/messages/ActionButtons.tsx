import React from 'react';
import { ActionButtonsMessage } from '../../types/messages';

interface Props {
  message: ActionButtonsMessage;
  onAction: (button: string) => void;
}

export const ActionButtons: React.FC<Props> = ({ message, onAction }) => {
  const getButtonStyle = (choice: string) => {
    return choice.toLowerCase() === 'done' ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'red', color: 'white' }
  }

  return (
    <div className="message action-buttons-message">
      <div className="action-buttons">
        {message.buttons.map((button, index) => (
          <button
            key={`${button}-${index}`}
            onClick={() => onAction(button)}
            className="action-button"
            style={getButtonStyle(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};
