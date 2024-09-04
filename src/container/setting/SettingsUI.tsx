import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSetting } from './GeneralSetting';
import ProviderSetting from './ProviderSetting';
import { SyncSetting } from './SyncSetting';
import { AccountSetting } from './AccountSetting';

export function SettingsUI() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('Settings')}</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">{t('General')}</TabsTrigger>
          <TabsTrigger value="provider">{t('Provider')}</TabsTrigger>
          <TabsTrigger value="sync">{t('Sync')}</TabsTrigger>
          <TabsTrigger value="account">{t('Account')}</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSetting />
        </TabsContent>
        <TabsContent value="provider">
          <ProviderSetting />
        </TabsContent>
        <TabsContent value="sync">
          <SyncSetting />
        </TabsContent>
        <TabsContent value="account">
          <AccountSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
