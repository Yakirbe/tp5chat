import React, { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import PermissionModal from './components/PermissionModal';
import { useMessageStore } from './store/messageStore';

function App() {
  const [showModal, setShowModal] = useState(false);
  const { permissions, setPermissions, initializeChat } = useMessageStore();

  useEffect(() => {
    // Check for stored permissions first
    const storedPermissions = localStorage.getItem('aiAssistantPermissions');
    if (storedPermissions === 'always') {
      setPermissions(true, 'always');
      initializeChat();
    } else if (!permissions.isRequested) {
      setShowModal(true);
    }
  }, [permissions.isRequested]);

  const handleGrantPermissions = (type: 'once' | 'always') => {
    if (type === 'always') {
      localStorage.setItem('aiAssistantPermissions', 'always');
    }
    setPermissions(true, type);
    setShowModal(false);
    initializeChat();
  };

  const handleDenyPermissions = () => {
    setPermissions(false, 'once');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ChatWindow />
      {showModal && (
        <PermissionModal
          onGrant={handleGrantPermissions}
          onDeny={handleDenyPermissions}
        />
      )}
    </div>
  );
}

export default App;