import { useTranslation } from 'react-i18next';

export function AccountSetting() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('Account Settings')}</h2>
      {/* Thêm các cài đặt tài khoản ở đây */}
    </div>
  );
}
