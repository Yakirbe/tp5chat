import React from 'react';
import { FiCpu } from 'react-icons/fi';
import { useSystemStore } from '../store/systemStore';
import { usePermissionStore } from '../store/permissionStore';

const SystemInfoPreview: React.FC = () => {
  const { systemInfo } = useSystemStore();
  const { permissions } = usePermissionStore();

  if (!permissions.system) {
    return (
      <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200">
          <FiCpu className="w-4 h-4" />
          <span className="text-sm font-medium">System Information</span>
        </div>
        <div className="p-3 text-sm text-gray-200">
          Permission required to access system information
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200">
        <FiCpu className="w-4 h-4" />
        <span className="text-sm font-medium">System Information</span>
      </div>
      <pre className="p-3 text-sm text-gray-200 overflow-x-auto">
{`Operating System: ${systemInfo.os}
Node.js Version: ${systemInfo.nodeVersion}
NPM Version: ${systemInfo.npmVersion}
Shell: ${systemInfo.shell}
Locale: ${systemInfo.locale}
Timezone: ${systemInfo.timezone}
Memory: ${systemInfo.memory}
CPU: ${systemInfo.cpu}`}
      </pre>
    </div>
  );
};

export default SystemInfoPreview;