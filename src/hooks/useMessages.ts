import { useEffect } from 'react';
import { useMessageStore } from '../store/messageStore';
import { usePermissionStore } from '../store/permissionStore';
import { mockSequence } from '../data/mockSequence';
import { MessageType } from '../types';

export const useMessages = () => {
  const { 
    messages, 
    isThinking, 
    currentStep,
    addMessage,
    setStep
  } = useMessageStore();
  
  const { setCurrentDataSource, setShowPermissionRequest } = usePermissionStore();

  const requestPermission = (dataSourceId: string) => {
    setCurrentDataSource(dataSourceId);
    setShowPermissionRequest(true);
  };

  // Expose requestPermission to window for mock sequence
  window.requestPermission = requestPermission;

  return { 
    messages, 
    isThinking,
    currentStep,
    setStep,
    addMessage: (content: string, type: MessageType, preview?: any) => {
      if (!isThinking) {
        addMessage(content, type, preview);
      }
    }
  };
};