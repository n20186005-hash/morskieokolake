import { getMessages, getTranslations } from 'next-intl/server';

interface StoryItem {
  id: string;
  kind: 'legend' | 'figure' | 'heritage';
  title: string;
  text: string;
}

const KIND_COLORS: Record<string, string> = {
  legend: '#7a5a2d',
  figure: '#2a5ca6',
  heritage: '#2d7a4f',
};

export default async function StoriesSection() {
  const t = await getTranslations('stories');
  const messages = (await getMessages()) as any;
  const items = (messages?.stories?.items ?? []) as StoryItem[];

  if (items.length === 0) return null;

  return (
    <section id="stories" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        {t.has('subtitle') && (
          <p className="text-base leading-relaxed max-w-3xl mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {items.map((story) => {
            const color = KIND_COLORS[story.kind] || '#2d5a3d';
            return (
              <article
                key={story.id}
                className="rounded-2xl p-6 sm:p-7 flex flex-col"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px dashed var(--border-color)',
                }}
              >
                <span
                  className="self-start mb-4 text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${color}12`, color }}
                >
                  {t(`kinds.${story.kind}`)}
                </span>
                <h3
                  className="font-display text-xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {story.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {story.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
