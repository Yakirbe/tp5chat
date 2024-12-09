import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { MessageType, ContentType, MockMessage, MessageContent } from '../types';
import { useMessageStore } from '../store/messageStore';
import { captureScreen } from '../utils/screenCapture';
import mockData from '../data/mockSequence.json';

const sequence = mockData.sequence as MockMessage[];

const InputArea: React.FC = () => {
  const { addMessage, currentStep, setStep } = useMessageStore();
  const [terminalStep, setTerminalStep] = useState(0);
  const [activeMessage, setActiveMessage] = useState<MockMessage | null>(null);

  useEffect(() => {
    const handleKeyPress = async (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (activeMessage?.content.type === ContentType.Terminal) {
          // Handle terminal step progression
          const steps = (activeMessage.content as any).steps;
          if (terminalStep < steps.length - 1) {
            setTerminalStep(prev => prev + 1);
            addMessage(activeMessage.role, {
              ...activeMessage.content,
              current_step: terminalStep + 1
            });
          } else {
            // Move to next message when terminal steps are complete
            setTerminalStep(0);
            setActiveMessage(null);
            if (currentStep < sequence.length - 1) {
              setStep(currentStep + 1);
            }
          }
        } else if (currentStep < sequence.length) {
          const message = sequence[currentStep];

          // Handle screen capture request
          if (message.content.type === ContentType.Image && 'requestCapture' in message.content) {
            console.log('Initiating screen capture...');
            const capture = await captureScreen();
            if (capture) {
              console.log('Screen captured successfully');
              addMessage(message.role, {
                type: ContentType.Image,
                capture
              });
            } else {
              console.log('Screen capture failed');
              addMessage(MessageType.User, {
                type: ContentType.Text,
                text: "Sorry, I couldn't capture the screen."
              });
            }
            setStep(currentStep + 1);
          } else if (message.content.type === ContentType.Terminal) {
            // Start terminal sequence
            setActiveMessage(message);
            addMessage(message.role, {
              ...message.content,
              current_step: 0
            });
          } else {
            // Handle regular messages
            addMessage(message.role, message.content);
            setStep(currentStep + 1);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, addMessage, setStep, terminalStep, activeMessage]);

  const getPlaceholder = () => {
    if (activeMessage?.content.type === ContentType.Terminal) {
      const steps = (activeMessage.content as any).steps;
      return `Press Enter to run step ${terminalStep + 1}/${steps.length}...`;
    }
    return `Press Enter to continue (${currentStep}/${sequence.length})...`;
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value=""
          readOnly
          placeholder={getPlaceholder()}
          className="flex-1 p-3 border rounded-lg bg-gray-50 text-gray-400"
        />
        <button
          className="p-3 bg-gray-100 text-gray-400 rounded-lg"
          disabled
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default InputArea;