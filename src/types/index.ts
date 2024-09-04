export interface ProviderConfig {
    apiKey: string;
    models: string[];
    config: any;
    metadata: {
      logo: string;
      endpoint: string;
      description: string;
    };
  }