import { DataSource } from '../types';

export const dataSources: DataSource[] = [
  {
    id: 'system',
    name: 'System Information',
    type: 'desktop',
    description: 'Access to system information and environment',
    requiresPermission: true,
    icon: '💻'
  },
  {
    id: 'screen',
    name: 'Screen',
    type: 'desktop',
    description: 'Access to screen content',
    requiresPermission: true,
    icon: '🖥️'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    type: 'desktop',
    description: 'Access to terminal output',
    requiresPermission: true,
    icon: '⌨️'
  },
  {
    id: 'filesystem',
    name: 'File System',
    type: 'desktop',
    description: 'Access to file system',
    requiresPermission: true,
    icon: '📁'
  },
  {
    id: 'browser',
    name: 'Web Browser',
    type: 'desktop',
    description: 'Access to browser data',
    requiresPermission: true,
    icon: '🌐'
  },
  {
    id: 'knowledge',
    name: 'Knowledge Base',
    type: 'provider',
    description: 'Access to Wiz knowledge base',
    requiresPermission: false,
    icon: '📚'
  },
  {
    id: 'logs',
    name: 'System Logs',
    type: 'provider',
    description: 'Access to internal logs',
    requiresPermission: false,
    icon: '📋'
  }
];