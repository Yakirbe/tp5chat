import { useMessageStore } from '../store/messageStore';
import { MessageType } from '../types';

export const useMessages = () => {
  const { 
    messages, 
    isThinking, 
    currentStep,
    addMessage,
    setStep,
    permissions
  } = useMessageStore();

  const sendMessage = async (content: string) => {
    if (!permissions.isGranted) {
      console.warn('Permissions not granted');
      return;
    }

    // ... existing send message logic
  };

  return { 
    messages, 
    isThinking,
    currentStep,
    setStep,
    addMessage: (content: string, type: MessageType, preview?: any) => {
      if (!isThinking) {
        addMessage(content, type, preview);
      }
    },
    sendMessage,
    isPermissionGranted: permissions.isGranted,
  };
};