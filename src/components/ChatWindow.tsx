import React from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import InputArea from './InputArea';

const ChatWindow: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gray-100"
    >
      <div className="container mx-auto h-screen max-w-4xl flex flex-col">
        <div className="bg-white border-b shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <img 
                src="https://cdn.monday.com/images/logos/monday_logo_short.png"
                alt="Monday.com"
                className="h-8"
              />
              <div className="h-6 w-px bg-gray-300" />
              <span className="text-lg font-medium text-gray-800">
                AI Troubleshooter
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>Powered by</span>
              <div className="flex items-center ml-2">
                <img 
                  src="/tier5-logo.svg"
                  alt="Tier.5"
                  className="h-5"
                />
                <span className="ml-1 font-medium">Tier.5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList />
          <InputArea />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatWindow;