import React from 'react';
import { Button } from "@/components/ui/button"
import MessageList from '@/components/MessageList';
import InputComponent from '@/components/InputComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useAIChat from '@/hooks/useAIChat';
import { Provider } from '@/constants/provider';
import { Settings, } from 'lucide-react';
import { GlobalDrawer } from '@/components/GlobalDrawer';
import ProviderConfig from '@/container/setting/ProviderConfig';
import { modelConfig, useSettingsStore } from '@/stores/settingsStore';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SettingsUI } from '@/container/setting/SettingsUI';
import { toast } from 'sonner';
import { SelectCurrentModel } from './setting/SelectCurrentModel';

const ChatUI: React.FC = () => {
  
  const { messages, provider, apiKey, sendMessage } = useAIChat();

  const handleOpenSettings = () => {
    GlobalDrawer.open({
      title: 'Cài đặt',
      children: <SettingsUI />
    });
  };

  const handleSendMessage = (message: string) => {
    if (!apiKey) {
      GlobalDrawer.open({
        title: 'Cài đặt',
        children: <div className="p-4"><ProviderConfig provider={provider} /></div>
      });
      return;
    }
    sendMessage(message);
  };
  
  

  return (
    <>
      <div className="w-full max-w-2xl mx-auto min-h-dvh flex flex-col justify-start p-4">
        <div className="flex-1">
          <div className="w-full flex justify-between space-x-2 items-center pb-3">
            <div className="flex flex-1">
            <SelectCurrentModel />
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
        <div>
          <InputComponent onSendMessage={handleSendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatUI;
