import React from 'react';

interface PermissionModalProps {
  onGrant: (type: 'once' | 'always') => void;
  onDeny: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({ onGrant, onDeny }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold">System Access Request</h2>
        </div>
        
        <div className="mb-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-blue-700 font-medium">Read-Only Access</p>
            <p className="text-blue-600 text-sm">
              This AI assistant requires read-only access to provide assistance. It will never modify your system without explicit confirmation.
            </p>
          </div>

          <p className="text-gray-700 mb-4 font-medium">Required Access Permissions:</p>
          <ul className="space-y-3">
            {[
              { title: 'System Information', desc: 'Read system configuration and status' },
              { title: 'Terminal Output', desc: 'View command-line operation results' },
              { title: 'Network Activity', desc: 'Monitor API calls and web requests' },
              { title: 'Application Logs', desc: 'Access system and application logs' },
              { title: 'File System', desc: 'Read project files and directories' }
            ].map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-medium text-gray-700">{item.title}</span>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onDeny}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Deny
            </button>
            <button
              onClick={() => onGrant('once')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Allow Once
            </button>
            <button
              onClick={() => onGrant('always')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Always Allow
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            You can change these permissions at any time in the settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal; 