import create from 'zustand';
import { PermissionStatus } from '../types';

interface PermissionState {
  permissions: PermissionStatus;
  showPermissionRequest: boolean;
  currentDataSource: string | null;
  setPermission: (dataSource: string, granted: boolean) => void;
  setShowPermissionRequest: (show: boolean) => void;
  setCurrentDataSource: (dataSource: string | null) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
  permissions: {},
  showPermissionRequest: false,
  currentDataSource: null,
  setPermission: (dataSource, granted) =>
    set((state) => ({
      permissions: { ...state.permissions, [dataSource]: granted }
    })),
  setShowPermissionRequest: (show) => set({ showPermissionRequest: show }),
  setCurrentDataSource: (dataSource) => set({ currentDataSource: dataSource }),
}));