import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUp, Plus } from 'lucide-react';

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
    <div>
      <div className="mx-auto w-full p-2 border border-solid border-b-0 border-gray-300 rounded-t-xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Button variant="secondary" type="button" className="text-gray-400 rounded-full h-fit p-2">
            <Plus className="w-4 h-4" />
          </Button>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Asking me..."
            className="flex-grow p-0 outline-none ring-0 border-none text-lg"
          />
          <Button type="submit" className="rounded-full h-fit p-2">
            <ArrowUp className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InputComponent;
