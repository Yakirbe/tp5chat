import { Message } from '../types';

export const formatTimestamp = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

export const generateMessageId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createMessage = (
  content: string,
  type: Message['type'],
  dataSources?: string[]
): Message => {
  return {
    id: generateMessageId(),
    content,
    type,
    timestamp: new Date(),
    dataSources
  };
};