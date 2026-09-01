import { getLocale, getTranslations } from 'next-intl/server';

/* Open-Meteo (free, no API key) — Morskie Oko lake coordinates (same as JSON-LD geo). */
const WEATHER_LAT = 49.197141;
const WEATHER_LON = 20.071253;
/* Cache the server-side response for 30 minutes (ISR revalidation). */
const REVALIDATE_SECONDS = 1800;

type OpenMeteoCurrent = {
  temperature_2m?: number;
  relative_humidity_2m?: number;
  apparent_temperature?: number;
  precipitation?: number;
  weather_code?: number;
  wind_speed_10m?: number;
  wind_direction_10m?: number;
};

type OpenMeteoDaily = {
  time?: string[];
  weather_code?: number[];
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  precipitation_probability_max?: number[];
};

type OpenMeteoResponse = {
  current?: OpenMeteoCurrent;
  daily?: OpenMeteoDaily;
};

/* WMO weather interpretation codes → localized copy key. */
function conditionKey(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1) return 'mainlyClear';
  if (code === 2) return 'partlyCloudy';
  if (code === 3) return 'overcast';
  if (code >= 45 && code <= 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 65) return 'rain';
  if (code === 66 || code === 67) return 'freezingRain';
  if (code >= 71 && code <= 75) return 'snow';
  if (code === 77) return 'snowGrains';
  if (code >= 80 && code <= 82) return 'showers';
  if (code === 85 || code === 86) return 'snowShowers';
  if (code >= 95) return 'thunderstorm';
  return 'unknown';
}

function iconVariant(key: string): string {
  if (key === 'clear') return 'clear';
  if (key === 'mainlyClear' || key === 'partlyCloudy') return 'partly';
  if (key === 'fog') return 'fog';
  if (
    key === 'rain' ||
    key === 'drizzle' ||
    key === 'freezingRain' ||
    key === 'showers'
  )
    return 'rain';
  if (key === 'snow' || key === 'snowGrains' || key === 'snowShowers')
    return 'snow';
  if (key === 'thunderstorm') return 'storm';
  return 'cloud';
}

function windDirKey(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return dirs[index];
}

function parseDate(isoDate: string): Date {
  const [y, m, d] = isoDate.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function WeatherIcon({ variant, size = 22 }: { variant: string; size?: number }) {
  const svgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'flex-shrink-0',
  };

  switch (variant) {
    case 'clear':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.07" y2="7.07" />
          <line x1="16.93" y1="16.93" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.07" y2="16.93" />
          <line x1="16.93" y1="7.07" x2="19.07" y2="4.93" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="11" r="4" />
          <line x1="12" y1="2.5" x2="12" y2="4" />
          <line x1="18.5" y1="4.5" x2="17.4" y2="5.6" />
          <line x1="2.5" y1="11" x2="4" y2="11" />
          <path d="M8 18h9.5a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 8.2 8.6 4 4 0 0 0 8 18z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...svgProps}>
          <path d="M17.5 9H9a7 7 0 1 1 1.05-13.92A6 6 0 0 1 21 10.5A4.5 4.5 0 0 1 17.5 9z" />
          <line x1="4" y1="17" x2="20" y2="17" />
          <line x1="6" y1="21" x2="18" y2="21" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...svgProps}>
          <path d="M17.5 9H9a7 7 0 1 1 1.05-13.92A6 6 0 0 1 21 10.5A4.5 4.5 0 0 1 17.5 9z" />
          <line x1="8" y1="15" x2="6" y2="18" />
          <line x1="13" y1="15" x2="11" y2="18" />
          <line x1="18" y1="15" x2="16" y2="18" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...svgProps}>
          <path d="M17.5 9H9a7 7 0 1 1 1.05-13.92A6 6 0 0 1 21 10.5A4.5 4.5 0 0 1 17.5 9z" />
          <line x1="8" y1="16" x2="8" y2="18" />
          <line x1="12" y1="15" x2="12" y2="19" />
          <line x1="16" y1="16" x2="16" y2="18" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...svgProps}>
          <path d="M17.5 9H9a7 7 0 1 1 1.05-13.92A6 6 0 0 1 21 10.5A4.5 4.5 0 0 1 17.5 9z" />
          <polyline points="12 15 10 18 12.5 18 10.5 22" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <path d="M17.5 9H9a7 7 0 1 1 1.05-13.92A6 6 0 0 1 21 10.5A4.5 4.5 0 0 1 17.5 9z" />
        </svg>
      );
  }
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const locale = await getLocale();

  let data: OpenMeteoResponse | null = null;
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
      `&timezone=Europe%2FWarsaw&forecast_days=7`;
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { 'User-Agent': 'MorskieOkoGuide/1.0 (morskieokolake.com)' },
    });
    if (res.ok) {
      data = (await res.json()) as OpenMeteoResponse;
    }
  } catch {
    data = null;
  }

  if (!data?.current || !data?.daily) return null;

  const current = data.current;
  const daily = data.daily;
  const currentKey = conditionKey(current.weather_code ?? 0);
  const currentVariant = iconVariant(currentKey);
  const currentTemp = Math.round(current.temperature_2m ?? 0);
  const feelsLike = Math.round(current.apparent_temperature ?? currentTemp);
  const humidity = Math.round(current.relative_humidity_2m ?? 0);
  const windSpeed = Math.round(current.wind_speed_10m ?? 0);
  const windDir = windDirKey(current.wind_direction_10m ?? 0);
  const currentPrecip = Math.round((current.precipitation ?? 0) * 10) / 10;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const forecastDays = (daily.time ?? []).map((iso, i) => ({
    iso,
    label: dateFormatter.format(parseDate(iso)),
    key: conditionKey(daily.weather_code?.[i] ?? 0),
    variant: iconVariant(conditionKey(daily.weather_code?.[i] ?? 0)),
    max: Math.round(daily.temperature_2m_max?.[i] ?? 0),
    min: Math.round(daily.temperature_2m_min?.[i] ?? 0),
    precipProb: daily.precipitation_probability_max?.[i],
  }));

  return (
    <section id="weather" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-sm leading-relaxed mb-10 max-w-2xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </p>

        {/* Current conditions */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-10"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-5">
              <div style={{ color: 'var(--accent)' }}>
                <WeatherIcon variant={currentVariant} size={52} />
              </div>
              <div>
                <div className="font-display text-5xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                  {currentTemp}°C
                </div>
                <div className="mt-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {t(`conditions.${currentKey}`)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 flex-1 min-w-[260px]">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  {t('feelsLike')}
                </div>
                <div className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {feelsLike}°C
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  {t('humidity')}
                </div>
                <div className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {humidity}%
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  {t('wind')}
                </div>
                <div className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {windSpeed} km/h
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  {t('windDir')}
                </div>
                <div className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t(`dirs.${windDir}`)}
                </div>
              </div>
            </div>
          </div>

          {currentPrecip > 0 && (
            <div className="mt-5 pt-4 border-t text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              {t('precip')}: {currentPrecip} mm
            </div>
          )}
        </div>

        {/* Multi-day forecast */}
        <h3
          className="font-display text-xl font-semibold mb-5"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('forecast')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecastDays.map((day, i) => (
            <div
              key={day.iso}
              className="rounded-xl p-4 flex flex-col items-center text-center"
              style={{
                background: i === 0 ? 'var(--card-bg)' : 'var(--bg-tertiary)',
                border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--border-color)',
              }}
            >
              <div className="text-xs font-medium mb-2" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                {day.label}
              </div>
              <div style={{ color: 'var(--accent)' }}>
                <WeatherIcon variant={day.variant} size={24} />
              </div>
              <div className="text-sm mt-2 leading-snug min-h-[2.5rem]" style={{ color: 'var(--text-secondary)' }}>
                {t(`conditions.${day.key}`)}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {day.max}°
                </span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {day.min}°
                </span>
              </div>
              {typeof day.precipProb === 'number' && (
                <div className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {t('precipProb')}: {day.precipProb}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
