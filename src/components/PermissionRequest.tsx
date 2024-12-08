import React from 'react';
import { Dialog } from '@headlessui/react';
import { dataSources } from '../data/dataSources';

interface PermissionRequestProps {
  dataSource: string;
  onGrant: () => void;
  onDeny: () => void;
}

const PermissionRequest: React.FC<PermissionRequestProps> = ({
  dataSource,
  onGrant,
  onDeny
}) => {
  const source = dataSources.find(s => s.id === dataSource);

  if (!source) return null;

  return (
    <Dialog open={true} onClose={onDeny} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm">
          <Dialog.Title className="text-lg font-medium mb-2">
            Permission Required
          </Dialog.Title>
          
          <Dialog.Description className="mb-4">
            Wiz AI Companion needs access to your {source.name.toLowerCase()} to help resolve your issue.
          </Dialog.Description>

          <div className="flex justify-end gap-2">
            <button
              onClick={onDeny}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Deny
            </button>
            <button
              onClick={onGrant}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Allow
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PermissionRequest;