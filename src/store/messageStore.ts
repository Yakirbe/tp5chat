import create from 'zustand';
import { Message, MessageType } from '../types';
import { createMessage } from '../utils/messageUtils';

interface MessageState {
  messages: Message[];
  isThinking: boolean;
  currentStep: number;
  hasStarted: boolean;
  addMessage: (content: string, type: MessageType, preview?: any) => void;
  setThinking: (thinking: boolean) => void;
  incrementStep: () => void;
  setStep: (step: number) => void;
  setHasStarted: (started: boolean) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  isThinking: false,
  currentStep: 0,
  hasStarted: false,
  addMessage: (content, type, preview) => 
    set((state) => ({
      messages: [...state.messages, { ...createMessage(content, type), preview }]
    })),
  setThinking: (thinking) => set({ isThinking: thinking }),
  incrementStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  setStep: (step) => set({ currentStep: step }),
  setHasStarted: (started) => set({ hasStarted: started }),
}));