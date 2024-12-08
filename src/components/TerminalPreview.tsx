import React from 'react';
import { FiTerminal } from 'react-icons/fi';

interface TerminalPreviewProps {
  content: string;
  command?: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const TerminalPreview: React.FC<TerminalPreviewProps> = ({
  content,
  command,
  onAccept,
  onReject
}) => {
  return (
    <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-700">
        <div className="flex items-center gap-2 text-gray-200">
          <FiTerminal className="w-4 h-4" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        {command && (
          <div className="flex gap-2">
            <button
              onClick={onReject}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reject
            </button>
            <button
              onClick={onAccept}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
            >
              Accept
            </button>
          </div>
        )}
      </div>
      <pre className="p-3 text-sm text-gray-200 overflow-x-auto">
        {command && <span className="text-green-400">$ {command}</span>}
        {command && '\n'}
        {content}
      </pre>
    </div>
  );
}

export default TerminalPreview;