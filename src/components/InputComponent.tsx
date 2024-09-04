import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUp } from 'lucide-react';

interface InputComponentProps {
  onSendMessage: (message: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập tin nhắn của bạn..."
        className="flex-grow"
      />
      <Button type="submit" className="rounded-full h-fit p-3">
        <ArrowUp className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default InputComponent;
