import React from 'react';
import { Button } from "@/components/ui/button"
import MessageList from '@/components/MessageList';
import InputComponent from '@/components/InputComponent';
import useAIChat from '@/hooks/useAIChat';
import { Settings, } from 'lucide-react';
import { GlobalDrawer } from '@/components/GlobalDrawer';
import ProviderConfig from '@/container/setting/ProviderConfig';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SettingsUI } from '@/container/setting/SettingsUI';
import { SelectCurrentModel } from './setting/SelectCurrentModel';

const ChatUI: React.FC = () => {
  
  const { messages, provider, apiKey, sendMessage } = useAIChat();

  const handleOpenSettings = () => {
    GlobalDrawer.open({
      title: 'Cài đặt',
      containerClassName: "h-[calc(100vh-20px)] max-w-2xl",
      children: <SettingsUI />
    });
  };

  const handleSendMessage = (message: string) => {
    if (!apiKey) {
      GlobalDrawer.open({
        title: 'Cài đặt',
        children: <ProviderConfig provider={provider} />
      });
      return;
    }
    sendMessage(message);
  };
  
  

  return (
    <>
      <div className="w-full max-w-2xl mx-auto min-h-dvh flex flex-col justify-start">
        <div className="flex-1">
          <div className="w-full flex justify-between space-x-2 items-center p-4">
            <div className="flex flex-1">
            <SelectCurrentModel className="w-56 p-2" />
            </div>
            <div className="flex justify-end items-center space-x-2">
              <Button variant="ghost" onClick={handleOpenSettings}>
                <Settings className="w-5 h-5" />
              </Button>
              <LanguageSwitcher />
            </div>

          </div>
          <div>
            <MessageList messages={messages} />
          </div>
        </div>
        <div className="mx-auto w-full p-4 pb-3 bg-gray-300 rounded-t-xl">
          <InputComponent onSendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatUI;
