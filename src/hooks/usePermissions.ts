import { useState } from 'react';
import { PermissionStatus } from '../types';

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<PermissionStatus>({});
  const [showPermissionRequest, setShowPermissionRequest] = useState(false);
  const [currentDataSource, setCurrentDataSource] = useState<string | null>(null);

  const requestPermission = (dataSourceId: string) => {
    if (!permissions[dataSourceId]) {
      setCurrentDataSource(dataSourceId);
      setShowPermissionRequest(true);
    }
  };

  const grantPermission = (dataSourceId: string) => {
    setPermissions(prev => ({ ...prev, [dataSourceId]: true }));
    setShowPermissionRequest(false);
    setCurrentDataSource(null);
  };

  const denyPermission = () => {
    setShowPermissionRequest(false);
    setCurrentDataSource(null);
  };

  return {
    permissions,
    showPermissionRequest,
    currentDataSource,
    requestPermission,
    grantPermission,
    denyPermission
  };
};