import { useState } from 'react';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Anthropic } from '@anthropic-ai/sdk';
import { Groq } from 'groq-sdk';
import { CohereClient } from 'cohere-ai';
import { useSettingsStore } from '@/stores/settingsStore';

interface Message {
    content: string;
    isUser: boolean;
}

interface Config {
    model: string;
    apiKey?: string;
    provider: string;
}

const useAIChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const { model, provider } = useSettingsStore(state => state.currentModel);

    const apiKey = useSettingsStore(state => state.providers[provider].apiKey);

    const sendMessage = async (message: string) => {
        setMessages(prevMessages => [...prevMessages, { content: message, isUser: true }]);

        let response = '';

        try {
            switch (provider) {
                case 'openai':
                    response = await handleOpenAI(message, { model, apiKey, provider });
                    break;
                case 'azure':
                    response = await handleAzure(message, { model, apiKey, provider });
                    break;
                case 'anthropic':
                    response = await handleAnthropic(message, { model, apiKey, provider });
                    break;
                case 'google':
                    response = await handleGoogle(message, { model, apiKey, provider });
                    break;
                case 'groq':
                    response = await handleGroq(message, { model, apiKey, provider });
                    break;
                case 'cohere':
                    response = await handleCohere(message, { model, apiKey, provider });
                    break;
                default:
                    throw new Error('Nhà cung cấp không được hỗ trợ');
            }
        } catch (error) {
            console.error('Lỗi trong sendMessage:', error);
            response = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định';
        }

        setMessages(prevMessages => [...prevMessages, { content: response, isUser: false }]);
    };

    return {
        messages,
        provider,
        model,
        apiKey,
        setMessages,
        sendMessage, 
    };
};


async function handleOpenAI(message: string, config: Config): Promise<string> {
    const openai = new OpenAI({ apiKey: config.apiKey, dangerouslyAllowBrowser: true });
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: config.model || 'gpt-4',
    });
    return completion.choices[0].message.content || '';
}

async function handleAzure(message: string, config: Config): Promise<string> {
    const openai = new OpenAI({ apiKey: config.apiKey, dangerouslyAllowBrowser: true });
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: config.model || 'gpt-4',
    });
    return completion.choices[0].message.content || '';
}

async function handleAnthropic(message: string, config: Config): Promise<string> {
    const anthropic = new Anthropic({ apiKey: config.apiKey });
    const completion = await anthropic.completions.create({
        model: config.model || 'claude-2',
        prompt: message,
        max_tokens_to_sample: 300,
    });
    return completion.completion;
}


async function handleGoogle(message: string, config: Config): Promise<string> {
    if(!config?.apiKey) {
        throw Error;
    }
    const genAI = new GoogleGenerativeAI(config.apiKey);
    const modelAI = genAI.getGenerativeModel({ model: config.model });
    const result = await modelAI.generateContent(message);
    const response = await result.response;
    return response.text();
}

async function handleGroq(message: string, config: Config): Promise<string> {
    if(!config?.apiKey) {
        throw Error;
    }
    const groq = new Groq({ apiKey: config.apiKey, dangerouslyAllowBrowser: true });
    const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: config.model,
    });
    return completion.choices[0].message.content || '';
}

async function handleCohere(message: string, config: Config): Promise<string> {
    if(!config?.apiKey) {
        throw Error;
    }
    const cohere = new CohereClient({
        token: config.apiKey!,
    });
    const response = await cohere.generate({
        prompt: message,
        model: config.model || 'command',
    });
    return response.generations[0].text;
}

export default useAIChat;
