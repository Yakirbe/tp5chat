import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useMessages } from '../hooks/useMessages';
import { mockSequence } from '../data/mockSequence';
import { usePermissionStore } from '../store/permissionStore';
import { MessageType } from '../types';

const InputArea: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, isThinking, currentStep, setStep } = useMessages();
  const { permissions, setCurrentDataSource, setShowPermissionRequest } = usePermissionStore();

  const handleMockSequence = () => {
    console.log('Current step:', currentStep); // Debug log
    const nextMessage = mockSequence[currentStep];
    if (nextMessage) {
      if (nextMessage.requiresPermission && !permissions[nextMessage.requiresPermission]) {
        setCurrentDataSource(nextMessage.requiresPermission);
        setShowPermissionRequest(true);
        return;
      }

      addMessage(nextMessage.content, nextMessage.type as MessageType, nextMessage.preview);
      if (nextMessage.action) {
        nextMessage.action();
      }
      setStep(currentStep + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === 'ArrowDown') && !isThinking) {
      e.preventDefault();
      
      if (input.trim()) {
        addMessage(input.trim(), 'user');
        setInput('');
      } else {
        handleMockSequence();
      }
    }
  };

  return (
    <form className="border-t bg-white p-4" onSubmit={e => e.preventDefault()}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Press Enter or Down Arrow to continue the conversation..."
          disabled={isThinking}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          autoFocus
        />
        <button
          type="button"
          disabled={isThinking || !input.trim()}
          onClick={() => {
            if (input.trim()) {
              addMessage(input.trim(), 'user');
              setInput('');
            }
          }}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default InputArea;