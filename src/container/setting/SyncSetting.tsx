import { useTranslation } from 'react-i18next';

export function SyncSetting() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('Sync Settings')}</h2>
      {/* Thêm các cài đặt đồng bộ hóa ở đây */}
    </div>
  );
}
