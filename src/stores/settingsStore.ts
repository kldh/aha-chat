import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Provider } from '@/constants/provider';
import { ProviderConfig } from '@/types';
import { openAIConfig, anthropicConfig, groqConfig, googleConfig } from '@/constants/defaultSetting';

interface SettingsState {
  providers: {
    [key in Provider]: ProviderConfig;
  };
  defaultProvider: Provider,
  setDefaultProvider: (provider: Provider) => void,
  setProviderConfig: (provider: Provider, config: Partial<ProviderConfig>) => void,
  getModels: () => { model: string; provider: Provider }[];
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
    }),
    {
      name: 'settings-storage',
    }
  )
);

