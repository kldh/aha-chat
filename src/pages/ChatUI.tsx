import React from 'react';
import { Button } from "@/components/ui/button"
import MessageList from '@/components/MessageList';
import InputComponent from '@/components/InputComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useAIChat from '@/hooks/useAIChat';
import { Provider } from '@/constants/provider';
import { Settings, X } from 'lucide-react';
import SettingsPage from '@/pages/SettingsPage';
import { GlobalDrawer } from '@/components/GlobalDrawer';
import ProviderSettings from '@/components/ProviderSettings';
import { useSettingsStore } from '@/stores/settingsStore';

const ChatUI: React.FC = () => {
  const allModels = useSettingsStore.getState().getModels();

  const { messages, provider, apiKey, sendMessage, changeModel } = useAIChat();

  const handleOpenSettings = () => {
    GlobalDrawer.open({
      title: 'Cài đặt',
      children: <SettingsPage />
    });
  };

  const handleSendMessage = (message: string) => {
    if (!apiKey) {
      GlobalDrawer.open({
        title: 'Cài đặt',
        children: <ProviderSettings provider={provider} />
      });
      return;
    }
    sendMessage(message);
  };
  const handleModelChange = (idx: string) => {
    const a = allModels[Number(idx)];
    console.log(a)
    changeModel(a);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto min-h-dvh flex flex-col justify-start p-4">
        <div className="flex-1">
          <div className="w-full flex justify-between space-x-2 items-center pb-3">
            <div className="flex flex-1">
              <Select onValueChange={handleModelChange} defaultValue={"0"}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Chọn nhà cung cấp" />
                </SelectTrigger>
                <SelectContent>
                  {allModels.map((item: { model: string, provider: Provider }, idx: number) => (
                    <SelectItem key={idx} value={idx.toString()}>
                      {`${item.model}(${item.provider})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
            <Button variant="ghost" onClick={handleOpenSettings}>
              <Settings className="w-5 h-5" />
            </Button>
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
