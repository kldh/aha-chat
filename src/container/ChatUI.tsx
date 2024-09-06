import React from 'react';
import MessageList from '@/components/MessageList';
import InputComponent from '@/components/InputComponent';
import useAIChat from '@/hooks/useAIChat';
import { GlobalDrawer } from '@/components/GlobalDrawer';
import ProviderConfig from '@/container/setting/ProviderConfig';
import { toast } from 'sonner';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Settings } from 'lucide-react';
import { SelectCurrentModel } from './setting/SelectCurrentModel';
import { SettingsUI } from './setting/SettingsUI';
import { Button } from '@/components/ui/button';

const ChatUI: React.FC = () => {

  const { messages, provider, apiKey, sendMessage } = useAIChat();


  const handleSendMessage = (message: string) => {
    if (!apiKey) {
      toast.error("Vùi lòng nhập api Key.", { position: 'top-center' })
      GlobalDrawer.open({
        title: 'Cài đặt',
        children: <ProviderConfig provider={provider} />
      });
      return;
    }
    sendMessage(message);
  };

  const handleOpenSettings = () => {
    GlobalDrawer.open({
      title: 'Cài đặt',
      containerClassName: "h-[calc(100vh-20px)] max-w-2xl",
      children: <SettingsUI />
    });
  };



  return (
    <>
      <div className="w-full max-w-2xl mx-auto min-h-dvh flex flex-col justify-start">
        <div className="flex-1">
          <div className="w-full flex justify-between space-x-2 items-center p-2">
            <div className="flex flex-1">
              <SelectCurrentModel className="w-52 h-auto px-2 py-1 text-sm text-left " />
            </div>
            <div className="flex justify-end items-center space-x-2">
              <Button variant="ghost" className="p-2 h-auto" onClick={handleOpenSettings}>
                <Settings className="w-4 h-4" />
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
          <MessageList messages={messages} />
        </div>

        <InputComponent onSendMessage={handleSendMessage} />

      </div>
    </>
  );
};

export default ChatUI;
