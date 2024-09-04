import { useState } from 'react';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Anthropic } from '@anthropic-ai/sdk';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { Groq } from 'groq-sdk';
import { CohereClient } from 'cohere-ai';
import { useSettingsStore } from '@/stores/settingsStore';
import { Provider } from '@/constants/provider';

interface Message {
    content: string;
    isUser: boolean;
}

const useAIChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [models, setModel] = useState<string>(''); 
    const [provider, setProvider] = useState<Provider>(Provider.OpenAI);

    const setProviderConfig = useSettingsStore.getState().setProviderConfig;
    const apiKey = useSettingsStore(state => state.providers[provider].apiKey);
    const sendMessage = async (message: string) => {
        setMessages(prevMessages => [...prevMessages, { content: message, isUser: true }]);

        let response = '';

        try {
            switch (provider) {
                case 'openai':
                    response = await handleOpenAI(message);
                    break;
                case 'azure':
                    response = await handleAzure(message);
                    break;
                case 'anthropic':
                    response = await handleAnthropic(message);
                    break;
                case 'bedrock':
                    response = await handleBedrock(message);
                    break;
                case 'google':
                    response = await handleGoogle(message);
                    break;
                    break;
                case 'groq':
                    response = await handleGroq(message);
                    break;
                case 'cohere':
                    response = await handleCohere(message);
                    break;
                default:
                    throw new Error('Nhà cung cấp không được hỗ trợ');
            }
        } catch (error) {
            console.error('Lỗi trong sendMessage:', error);
            response = 'Xin lỗi, đã xảy ra lỗi khi xử lý tin nhắn của bạn.';
        }

        setMessages(prevMessages => [...prevMessages, { content: response, isUser: false }]);
    };

    const changeModel = (newValue: {model: string, provider: Provider}) => {
        setModel(newValue.model)
        setProvider(newValue.provider);
    };

    const updateApiKey = (newApiKey: string) => {
        setProviderConfig(provider, { apiKey: newApiKey });
    };

    return {
        messages,
        provider,
        apiKey,
        sendMessage,
        changeModel,
        updateApiKey,
    };
};

async function handleOpenAI(message: string): Promise<string> {
    const apiKey = useSettingsStore.getState().providers[Provider.OpenAI].apiKey;
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-4o',
    });
    return completion.choices[0].message.content || '';
}

async function handleAzure(message: string): Promise<string> {
    const apiKey = useSettingsStore.getState().providers[Provider.Azure].apiKey;
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-4o',
    });
    return completion.choices[0].message.content || '';
}

async function handleAnthropic(message: string): Promise<string> {
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });
    const completion = await anthropic.completions.create({
        model: 'claude-2',
        prompt: message,
        max_tokens_to_sample: 300,
    });
    return completion.completion;
}

async function handleBedrock(message: string): Promise<string> {
    const client = new BedrockRuntimeClient({ region: 'us-east-1' });
    const command = new InvokeModelCommand({
        modelId: 'anthropic.claude-v2',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            prompt: message,
            max_tokens_to_sample: 300,
        }),
    });
    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.completion;
}

async function handleGoogle(message: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
}

async function handleGroq(message: string): Promise<string> {
    const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });
    const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'mixtral-8x7b-32768',
    });
    return completion.choices[0].message.content || '';
}

async function handleCohere(message: string): Promise<string> {
    const cohere = new CohereClient({
        token: process.env.COHERE_API_KEY!,
    });
    const response = await cohere.generate({
        prompt: message,
        model: 'command',
    });
    return response.generations[0].text;
}

export default useAIChat;
