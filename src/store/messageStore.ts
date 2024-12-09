import { create } from 'zustand';
import { Message, MessageType, MessageContent, ContentType } from '../types';

interface MessageState {
  messages: Message[];
  isThinking: boolean;
  currentStep: number;
  hasStarted: boolean;
  permissions: {
    isGranted: boolean;
    isRequested: boolean;
    type?: 'once' | 'always';
  };
  addMessage: (role: MessageType, content: MessageContent) => void;
  setThinking: (thinking: boolean) => void;
  incrementStep: () => void;
  setStep: (step: number) => void;
  setHasStarted: (started: boolean) => void;
  setPermissions: (granted: boolean, type: 'once' | 'always') => void;
  initializeChat: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => {
  const initializeChat = () => {
    const store = get();
    if (store.messages.length === 0) {
      store.addMessage(MessageType.Assistant, {
        type: ContentType.Text,
        text: "Hi! I'm your Monday.com AI Troubleshooter. I'll help you optimize and solve any issues with your Monday.com workspace and integrations. Press Enter to start."
      });
    }
  };

  return {
    messages: [],
    isThinking: false,
    currentStep: 0,
    hasStarted: false,
    permissions: {
      isGranted: false,
      isRequested: false,
    },

    setPermissions: (granted: boolean, type: 'once' | 'always') => {
      set({ permissions: { isGranted: granted, isRequested: true, type } });
      if (granted) {
        get().initializeChat();
      }
    },

    initializeChat,
    
    addMessage: (role, content) => 
      set((state) => ({
        messages: [...state.messages, {
          type: role,
          content: content.type === ContentType.Text ? content.text : '',
          preview: content.type !== ContentType.Text ? content : undefined,
          timestamp: Date.now()
        }]
      })),

    setThinking: (thinking) => set({ isThinking: thinking }),
    incrementStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    setStep: (step) => set({ currentStep: step }),
    setHasStarted: (started) => set({ hasStarted: started }),
  };
});