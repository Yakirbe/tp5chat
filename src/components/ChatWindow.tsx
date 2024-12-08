import React from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import InputArea from './InputArea';
import PermissionRequest from './PermissionRequest';
import { usePermissionStore } from '../store/permissionStore';

const ChatWindow: React.FC = () => {
  const {
    showPermissionRequest,
    currentDataSource,
    setPermission,
    setShowPermissionRequest,
    setCurrentDataSource
  } = usePermissionStore();

  const handleGrantPermission = () => {
    if (currentDataSource) {
      setPermission(currentDataSource, true);
      setShowPermissionRequest(false);
      setCurrentDataSource(null);
    }
  };

  const handleDenyPermission = () => {
    setShowPermissionRequest(false);
    setCurrentDataSource(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gray-100"
    >
      <div className="container mx-auto h-screen max-w-4xl flex flex-col">
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-semibold">Wiz AI Companion</h1>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList />
          <InputArea />
        </div>

        {showPermissionRequest && currentDataSource && (
          <PermissionRequest
            dataSource={currentDataSource}
            onGrant={handleGrantPermission}
            onDeny={handleDenyPermission}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ChatWindow;