import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Provider } from '@/constants/provider';
import { useSettingsStore } from '@/stores/settingsStore';

interface ProviderSettingsProps {
  provider: Provider;
}

const ProviderSettings: React.FC<ProviderSettingsProps> = ({ provider }) => {
  const { providers, setProviderConfig } = useSettingsStore();
  const [newModel, setNewModel] = useState<string>('');

  const config = providers[provider];

  const handleConfigChange = (field: string, value: string) => {
    setProviderConfig(provider, { [field]: value });
  };

  const handleAddModel = () => {
    if (newModel.trim() && !config.models.includes(newModel.trim())) {
      const updatedModels = [...config.models, newModel.trim()];
      setProviderConfig(provider, { models: updatedModels });
      setNewModel('');
    }
  };

  const handleRemoveModel = (modelToRemove: string) => {
    const updatedModels = config.models.filter(model => model !== modelToRemove);
    setProviderConfig(provider, { models: updatedModels });
  };

  return (
    <div className="space-y-4 p-2">
      <Input
        type="text"
        value={config.apiKey}
        onChange={(e) => handleConfigChange('apiKey', e.target.value)}
        placeholder={`Nhập ${provider} API Key`}
        className="w-full"
      />
      <Input
        type="text"
        value={config.metadata.endpoint}
        onChange={(e) => handleConfigChange('metadata.endpoint', e.target.value)}
        placeholder={`Nhập ${provider} Endpoint`}
        className="w-full"
      />
      <Input
        type="text"
        value={config.metadata.description}
        onChange={(e) => handleConfigChange('metadata.description', e.target.value)}
        placeholder={`Nhập mô tả cho ${provider}`}
        className="w-full"
      />
      <div>
        <label className="block mb-2 font-medium">Models:</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {config.models.map((model) => (
            <Badge key={model} variant="secondary" className="px-2 py-1 text-sm">
              {model}
              <button 
                className="ml-2 text-xs hover:text-red-500"
                onClick={() => handleRemoveModel(model)}
                aria-label={`Xóa model ${model}`}
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            placeholder="Nhập model mới"
            className="flex-grow"
          />
          <Button onClick={handleAddModel}>Thêm</Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderSettings;
