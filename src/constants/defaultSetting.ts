import { ProviderConfig } from "../types";

export const openAIConfig: ProviderConfig = {
  apiKey: '',
  models: [
    'gpt-4o',
    'gpt-4-o-mini',
    'gpt-4-32k',
    'gpt-4-32k-0314',
    'gpt-3.5-turbo',
  ],
  config: {},
  metadata: {
    logo: '/path/to/openai-logo.png',
    endpoint: 'https://api.openai.com/v1',
    description: 'OpenAI API',
  },
};

export const anthropicConfig: ProviderConfig = {
  apiKey: '',
  models: ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-haiku-20240307', 'claude-3-sonnet-20240229'],
  config: {},
  metadata: {
    logo: 'data:image/webp;base64,UklGRsACAABXRUJQVlA4ILQCAACQDwCdASo4ADgAPjEOjEYiEREJgCADBLSAZsVbF72eyP7O5d76TnKfhAy5Ted/zP0Lf83rDX85/WD1x84vzr/2PcI/k39U/23XmUO+8s3I99CFkenUkV/fMqhvX+aH3Ps69PbuOc1u558UWmhAt+vKHWgHjlRq39OTt7DccxajrIP1+IWAAP7/GvAO9iQmT/7fjBC2WPrB/6oO1oDwQbhswIqhXiTiugXk30SXI80dOpEYtkXPsxc8MPrZNI59qEItj01bvgNmQ44nTq5MRfR4xU3G4D4DfW/9Sf/KA3NuCBb+YZ8Jq9jakCo0qF72G9w5gK++GZ40ve6XzLQ0ByP57uTUGHkckIw7/i2rtrg+MYjcWkDfOcsshhirwEP4GzA/sfiIcOSgV2A1wLuOr12ib98nlUkj5sDD7ONE0659Y5XHjdvkC7dAstbn7Ob/YqnGUbN9t6/XsbftNalTCUJxAxVtSf+Vf/qCVLpHsHw9npMTiWsmSMA8r3JWNTAS1+uI9jRN1k+jrCff+6XuLDUSsugNXF9tRMRiT3Yjr6ZemNFm5TJiAaMO2NgTi55KTEN8ZtKok3LkMlk+Eb8zFfO4MB1win2XnD8tlZ/FGN/5X5D4v3b0k0BXOzCL5LgBNkgsXfWKfuupvkf4Vz2UYl3xvWnNf47ig4kIAAqKJYL67f/Sw85bbJe+1A0o0F0QDw3MDqaj18GZ93u+KqRX2dXybzDjf5PJRFoFN13NPqn5M/EAv4B4SZ2NPzrooGEHbsD6sHnOcAu/fbYGf2E2OuJOLKPHce2AjSogPpise2ED2qhVuhGvay1yhreYdGyXWWOR89yL+6OfLIfii3zN+6zzfxblZUD8Y51+/Lll9ZI43dS9uTp3YsjukO6wyDNXZnyOq80StPCfLABdLcvfLBGrDDAAAA==',
    endpoint: 'https://api.anthropic.com',
    description: 'Anthropic API',
  },
};

export const groqConfig: ProviderConfig = {
  apiKey: '',
  models: ['llama2-70b-4096', 'mixtral-8x7b-32768', 'gemma2-9b-it', 'llama3-groq-70b-8192-tool-use-preview', 'llama-3.1-70b-versatile' ],
  config: {},
  metadata: {
    logo: '/path/to/groq-logo.png',
    endpoint: 'https://api.groq.com/v1',
    description: 'Groq API',
  },
};

export const googleConfig: ProviderConfig = {
  apiKey: '',
  models: ['gemini-1.5-flash-latest','gemini-1.5-pro-latest', 'gemini-pro'],
  config: {},
  metadata: {
    logo: '/path/to/google-logo.png',
    endpoint: 'https://generativelanguage.googleapis.com',
    description: 'Google AI API',
  },
};
