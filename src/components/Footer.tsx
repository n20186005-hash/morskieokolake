import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="px-4 py-8 text-center text-sm" style={{
      background: 'var(--bg-tertiary)',
      borderTop: '1px solid var(--border-color)',
      color: 'var(--text-muted)',
    }}>
      <p>{t('rights')}</p>
    </footer>
  );
}
