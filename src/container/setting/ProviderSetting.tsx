import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Provider } from '@/constants/provider';
import { useSettingsStore } from '@/stores/settingsStore';
import ProviderConfig from '@/container/setting/ProviderConfig';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';

const ProviderSetting: React.FC = () => {
    const { providers } = useSettingsStore();

    return (
        <div>
            <Accordion type="single" collapsible className="mb-4">
                {Object.keys(providers).map((provider) => (
                    <AccordionItem key={provider} value={provider}>
                        <AccordionTrigger>{capitalizeFirstLetter(provider)}</AccordionTrigger>
                        <AccordionContent>
                            <ProviderConfig provider={provider as Provider} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* <div className="mb-4">
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
            </div> */}
        </div>
    );
};

export default ProviderSetting;
