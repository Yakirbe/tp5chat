import React from 'react';
import { FiTerminal, FiMonitor, FiGlobe, FiDatabase } from 'react-icons/fi';

interface DataPreviewProps {
  type: 'terminal' | 'screen' | 'web' | 'data';
  content: string;
}

const DataPreview: React.FC<DataPreviewProps> = ({ type, content }) => {
  const icons = {
    terminal: FiTerminal,
    screen: FiMonitor,
    web: FiGlobe,
    data: FiDatabase
  };

  const Icon = icons[type];

  return (
    <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-200">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium capitalize">{type} Preview</span>
      </div>
      <pre className="p-3 text-sm text-gray-200 overflow-x-auto">
        {content}
      </pre>
    </div>
  );
};

export default DataPreview;