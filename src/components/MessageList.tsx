import React from 'react';

interface Message {
  content: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
