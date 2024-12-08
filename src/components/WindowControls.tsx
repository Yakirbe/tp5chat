import React from 'react';
import { FiMinimize2, FiMaximize2, FiX } from 'react-icons/fi';

interface WindowControlsProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

const WindowControls: React.FC<WindowControlsProps> = ({
  isMinimized,
  onMinimize,
  onClose
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onMinimize}
        className="hover:bg-blue-700 p-1 rounded"
      >
        {isMinimized ? <FiMaximize2 /> : <FiMinimize2 />}
      </button>
      <button 
        onClick={onClose}
        className="hover:bg-blue-700 p-1 rounded"
      >
        <FiX />
      </button>
    </div>
  );
};

export default WindowControls;