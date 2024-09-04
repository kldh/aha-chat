import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Provider } from '@/constants/provider';
import { ProviderConfig } from '@/types';
import { openAIConfig, anthropicConfig, groqConfig, googleConfig } from '@/constants/defaultSetting';

export interface modelConfig { model: string; provider: Provider }
interface SettingsState {
  providers: {
    [key in Provider]: ProviderConfig;
  };
  defaultProvider: Provider,
  setDefaultProvider: (provider: Provider) => void,
  setProviderConfig: (provider: Provider, config: Partial<ProviderConfig>) => void,
  getModels: () => modelConfig[],
  currentModel: modelConfig,
  setCurrentModel: (newModelConfig: modelConfig) => void,
  responseLanguage: string;
  systemPrompt: string;
  temperature: number;
  presencePenalty: number;
  frequencyPenalty: number;
  topP: number;
  topK: number;
  maxTokens: number;
  safetySettings: boolean;
  promptCaching: boolean;
  setResponseLanguage: (lang: string) => void;
  setSystemPrompt: (prompt: string) => void;
  setTemperature: (temp: number) => void;
  setPresencePenalty: (penalty: number) => void;
  setFrequencyPenalty: (penalty: number) => void;
  setTopP: (value: number) => void;
  setTopK: (value: number) => void;
  setMaxTokens: (tokens: number) => void;
  setSafetySettings: (enabled: boolean) => void;
  setPromptCaching: (enabled: boolean) => void;
}

const initialProviderConfig: ProviderConfig = {
  apiKey: '',
  models: [],
  config: {},
  metadata: {
    logo: '',
    endpoint: '',
    description: '',
  },
};


export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      defaultProvider: Provider.OpenAI,
      setDefaultProvider: (provider: Provider) => set({ defaultProvider: provider }),
      providers: {
        [Provider.OpenAI]: openAIConfig,
        [Provider.Anthropic]: anthropicConfig,
        [Provider.Groq]: groqConfig,
        [Provider.Google]: googleConfig,
        ...Object.fromEntries(
          Object.values(Provider)
            .filter(provider => ![Provider.OpenAI, Provider.Anthropic, Provider.Groq, Provider.Google].includes(provider))
            .map(provider => [provider, { ...initialProviderConfig }])
        ),
      } as { [key in Provider]: ProviderConfig },

      setProviderConfig: (provider, config) =>
        set((state) => ({
          providers: {
            ...state.providers,
            [provider]: {
              ...state.providers[provider],
              ...config,
            },
          },
        })),
      getModels: () => {
        const state = get();
        return Object.entries(state.providers).flatMap(([provider, config]) =>
          config.models.map(model => ({
            model,
            provider: provider as Provider
          }))
        );
      },
      currentModel: { model: 'gpt-4o-mini', provider: Provider.OpenAI },
      setCurrentModel: (newModelConfig) => set({ currentModel: newModelConfig }),
      responseLanguage: 'Tiếng Việt',
      systemPrompt: 'You are helpful assistant',
      temperature: 0.7,
      presencePenalty: 0,
      frequencyPenalty: 0,
      topP: 1,
      topK: 50,
      maxTokens: 2048,
      safetySettings: false,
      promptCaching: false,
      setResponseLanguage: (lang) => set({ responseLanguage: lang }),
      setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
      setTemperature: (temp) => set({ temperature: temp }),
      setPresencePenalty: (penalty) => set({ presencePenalty: penalty }),
      setFrequencyPenalty: (penalty) => set({ frequencyPenalty: penalty }),
      setTopP: (value) => set({ topP: value }),
      setTopK: (value) => set({ topK: value }),
      setMaxTokens: (tokens) => set({ maxTokens: tokens }),
      setSafetySettings: (enabled) => set({ safetySettings: enabled }),
      setPromptCaching: (enabled) => set({ promptCaching: enabled }),

    }),
    {
      name: 'settings-storage',
    }
  )
);

