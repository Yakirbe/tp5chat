import create from 'zustand';

interface SystemInfo {
  os: string;
  nodeVersion: string;
  npmVersion: string;
  shell: string;
  locale: string;
  timezone: string;
  memory: string;
  cpu: string;
}

interface SystemState {
  systemInfo: SystemInfo;
  setSystemInfo: (info: Partial<SystemInfo>) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  systemInfo: {
    os: 'Linux x64',
    nodeVersion: 'v16.14.2',
    npmVersion: '8.5.0',
    shell: '/bin/zsh',
    locale: 'en-US',
    timezone: 'UTC',
    memory: '16GB',
    cpu: 'Intel(R) Core(TM) i7-10700K'
  },
  setSystemInfo: (info) => 
    set((state) => ({
      systemInfo: { ...state.systemInfo, ...info }
    }))
}));