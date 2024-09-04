import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Provider } from '@/constants/provider';
import { useSettingsStore } from '@/stores/settingsStore';
import ProviderSettings from '@/components/ProviderSettings';

const SettingsPage: React.FC = () => {
    const { providers, defaultProvider, setDefaultProvider } = useSettingsStore();
    console.log(providers);
    
    const handleSaveDefaultProvider = (provider: Provider) => {
        setDefaultProvider(provider);
        alert('Nhà cung cấp mặc định đã được lưu!');
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Cài đặt ứng dụng</h1>

            <Accordion type="single" collapsible className="mb-4">
                {Object.keys(providers).map((provider) => (
                    <AccordionItem key={provider} value={provider}>
                        <AccordionTrigger>{provider} Cài đặt</AccordionTrigger>
                        <AccordionContent>
                            <ProviderSettings provider={provider as Provider} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="mb-4">
                <label htmlFor="defaultProvider" className="block mb-2">Nhà cung cấp mặc định:</label>
                <div className="flex items-center space-x-2">
                    <Select onValueChange={(value) => handleSaveDefaultProvider(value as Provider)} value={defaultProvider}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn nhà cung cấp mặc định" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(providers).map((provider) => (
                                <SelectItem key={provider} value={provider}>
                                    {provider}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
