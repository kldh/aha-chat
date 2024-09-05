import { modelConfig, useSettingsStore } from "@/stores/settingsStore";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { useMemo } from "react";

export const SelectCurrentModel = (props: { className?: string}) => {
    const currentModel = useSettingsStore(state => state.currentModel);
    const setCurrentModel = useSettingsStore(state => state.setCurrentModel);
    const getModels = useSettingsStore(state => state.getModels);
    const allModels = useMemo(() => getModels(), [getModels]);
        
    const handleSetCurrentModel = (newValue: string) => {
        const newCurrentModel = allModels.find((m: modelConfig) => `${m.model}(${m.provider})` === newValue);
        if (!newCurrentModel) {
            toast("Có lỗi khi chọn mô hình mặc định")
            return;
        }
        setCurrentModel(newCurrentModel);
    }
    const currentModelID = `${currentModel.model}(${currentModel.provider})`;

    return (<Select value={currentModelID} onValueChange={handleSetCurrentModel}>
        <SelectTrigger className={props?.className}>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {allModels.map((m: modelConfig, idx: number) => {
                const mID = `${m.model}(${m.provider})`;
                return (
                    <SelectItem key={idx} value={mID}>{mID}</SelectItem>
                )
            })}
        </SelectContent>
    </Select>)
}
