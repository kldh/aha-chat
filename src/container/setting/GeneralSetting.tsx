import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SelectCurrentModel } from './SelectCurrentModel';
import { useSettingsStore } from "@/stores/settingsStore";

const languages = [
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' },
];
const responseLanguages = ['Tiếng Việt', 'English', 'Français', 'Deutsch'];


export function GeneralSetting() {
    const { t, i18n } = useTranslation("common");

    const {
        responseLanguage,
        systemPrompt,
        temperature,
        presencePenalty,
        frequencyPenalty,
        topP,
        topK,
        maxTokens,
        safetySettings,
        promptCaching,
        setResponseLanguage,
        setSystemPrompt,
        setTemperature,
        setPresencePenalty,
        setFrequencyPenalty,
        setTopP,
        setTopK,
        setMaxTokens,
        setSafetySettings,
        setPromptCaching
    } = useSettingsStore();


    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <div className="space-y-3">
                <div className="flex flex-col space-y-2">
                    <label>{t('defaultModel')}</label>
                    <SelectCurrentModel />
                </div>

                <div className="flex flex-col space-y-2">
                    <label>{t('displayLanguage')}</label>
                    <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label>{t('responseLanguage')}</label>
                    <Select onValueChange={setResponseLanguage} defaultValue={responseLanguage}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {responseLanguages.map((lang) => (
                                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label>{t('systemPrompt')}</label>
                    <Textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder={t('Enter system prompt')}
                    />
                </div>


                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger><h2 className="text-xl font-bold">{t("aiConfig")}</h2></AccordionTrigger>
                        <AccordionContent>
                            <>

                                <div>
                                    <label>{t('temperature')}: {temperature}</label>
                                    <div className="p-3">
                                        <Slider
                                            value={[temperature]}
                                            onValueChange={(value) => setTemperature(value[0])}
                                            min={0}
                                            max={1}
                                            step={0.1}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>{t('Presence Penalty')}: {presencePenalty}</label>
                                    <div className="p-3">
                                        <Slider
                                            value={[presencePenalty]}
                                            onValueChange={(value) => setPresencePenalty(value[0])}
                                            min={-2}
                                            max={2}
                                            step={0.1}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>{t('frequencyPenalty')}: {frequencyPenalty}</label>
                                    <div className="p-3">
                                        <Slider
                                            value={[frequencyPenalty]}
                                            onValueChange={(value) => setFrequencyPenalty(value[0])}
                                            min={-2}
                                            max={2}
                                            step={0.1}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>{t('topP')}: {topP}</label>
                                    <div className="p-3">
                                        <Slider
                                            value={[topP]}
                                            onValueChange={(value) => setTopP(value[0])}
                                            min={0}
                                            max={1}
                                            step={0.05}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>{t('topK')}: {topK}</label>
                                    <div className="p-3">
                                        <Slider
                                            value={[topK]}
                                            onValueChange={(value) => setTopK(value[0])}
                                            min={0}
                                            max={100}
                                            step={1}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label>{t('maxTokens')}: {maxTokens}</label>
                                    <div className="p-3">
                                        <Slider
                                            value={[maxTokens]}
                                            onValueChange={(value) => setMaxTokens(value[0])}
                                            min={1}
                                            max={4096}
                                            step={1}
                                        />
                                    </div>
                                </div></>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="flex flex-col space-y-2">
                    <label>{t('safetySettings')}</label>
                    <Switch
                        checked={safetySettings}
                        onCheckedChange={setSafetySettings}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label>{t('promptCaching')}</label>
                    <Switch
                        checked={promptCaching}
                        onCheckedChange={setPromptCaching}
                    />
                </div>
            </div >
        </>
    );
}
