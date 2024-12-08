import React from 'react';

function AIChatHistory({ messages }) {
    const processedMessages = messages.reduce((acc, message, index) => {
        // Special handling for the first message - check if it's duplicated at the start
        if (index < 5 && index > 0) {
            // Check if this is one of the first 5 messages and matches the first message
            if (message.content === messages[0].content && 
                message.role === messages[0].role) {
                return acc;
            }
        }
        
        // Handle other consecutive duplicates
        if (index > 4 && message.content === messages[index - 1].content && 
            message.role === messages[index - 1].role) {
            return acc;
        }
        
        acc.push(message);
        return acc;
    }, []);

    return (
        <div className="chat-history">
            {processedMessages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                    <div className="message-content">{message.content}</div>
                </div>
            ))}
        </div>
    );
}

export default AIChatHistory; 