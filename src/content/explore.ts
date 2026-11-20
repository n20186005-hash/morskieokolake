import data from './explore-data.json';
import type { Locale } from '@/i18n/routing';

export const attractions = data;
export type Attraction = (typeof attractions)[number];

export const park = 'https://tpn.gov.pl/';
export const trailUpdates = 'https://tpn.gov.pl/komunikat-turystyczny';
export const parkMap = 'https://geoportaltatry.pl/';
export const parkAdmission = 'https://tpn.gov.pl/wstep-do-parku';

const facilitySources: Record<string, { name: string; url: string }> = {
  'roztoka-shelter': { name: 'Schronisko PTTK w Dolinie Roztoki', url: 'https://www.schroniskoroztoka.pl/' },
  'five-lakes-shelter': { name: 'Schronisko Górskie PTTK', url: 'https://piecstawow.pl/' },
  murowaniec: { name: 'Schronisko PTTK Murowaniec', url: 'https://www.murowaniec.com/' },
  'ornak-shelter': { name: 'Schronisko PTTK na Hali Ornak', url: 'https://www.zakopane.pl/strefa-turystyczna/turystyka/schroniska-gorskie/schronisko-na-hali-ornak' },
  'kasprowy-wierch': { name: 'Polskie Koleje Linowe (PKL)', url: 'https://www.pkl.pl/kasprowy-wierch/kasprowy-wierch.html' },
  'wiktorowki': { name: 'Dominikanie · Wiktorówki', url: 'https://wiktorowki.dominikanie.pl/' },
  'chocholowska-valley': { name: 'Wspólnota Leśna Uprawnionych Ośmiu Wsi', url: 'https://schroniska.pttk.pl/portal/pl/szlaki/info/3,dolina_chocholowska.html' },
  'chocholowska-meadow': { name: 'Wspólnota Leśna Uprawnionych Ośmiu Wsi', url: 'https://schroniska.pttk.pl/portal/pl/szlaki/info/3,dolina_chocholowska.html' },
};

export const getFacility = (slug: string) => facilitySources[slug];

export function attractionMap(place: Attraction) {
  const region = place.area.split(' · ')[0];
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${region}, Tatry, Polska`)}`;
}

export function relatedAttractions(place: Attraction) {
  return attractions.filter((other) => other.slug !== place.slug && other.area === place.area).slice(0, 4);
}

export const exploreLabels = {
  en: {
    title: 'Explore the Polish Tatras', home: 'Morskie Oko home', map: 'View on Google Maps', about: 'About this place',
    park: 'Tatra National Park (Tatrzański Park Narodowy) oversees park trails and protected areas here.',
    facility: 'Local facility, service or land manager', basic: 'Basic information', area: 'Area', name: 'Polish name', approach: 'Approach waypoint',
    highlights: 'What to look for', walking: 'Access and walking route', arrival: 'Start by locating this approach waypoint on the park map:',
    route: 'Walking route at a glance', qRoute: 'Which waypoints should I check before leaving?',
    visit: 'Visiting and photography', photoTip: 'Use the marked trail or visitor area for your photo. Leave room for others to pass.',
    faq: 'Frequently asked questions', qAccess: 'Where can I verify access before setting out?',
    aAccess: 'Check the park bulletin for current trail access. For a building, service or separately ticketed area, also check the operator listed above.',
    qTickets: 'Where can I check tickets?', aTickets: 'Check park admission and any separate entry or service rules before travelling.',
    source: 'Sources', parkMap: 'Park trail map', updates: 'Park trail bulletin', admission: 'Park admission', file: 'Original photo and credits',
    placeReference: 'Place background', related: 'Continue exploring', conditions: 'Check trail status',
  },
  zh: {
    title: '探索波兰塔特拉山脉', home: '海洋之眼首页', map: '在 Google 地图查看', about: '关于景点',
    park: '塔特拉国家公园（Tatrzański Park Narodowy）负责此区域保护地及园内步道的管理。',
    facility: '设施、服务或土地管理方', basic: '基本信息', area: '所在区域', name: '波兰语名称', approach: '路线衔接点',
    highlights: '景观与观察重点', walking: '交通与步行路线', arrival: '先在国家公园步道图上定位此衔接点：',
    route: '步行路线节点', qRoute: '出发前要核对哪些路线节点？',
    visit: '游览及拍摄建议', photoTip: '在标记步道或访客区域拍摄，并为其他游客留出通行空间。',
    faq: '常见问题', qAccess: '出发前在哪里核对开放情况？',
    aAccess: '查看国家公园的步道公告。涉及建筑、交通服务或单独售票区域时，也请核对上方运营方的公告。',
    qTickets: '到哪里核对票务？', aTickets: '出发前核对公园入园要求和需要另购的设施或服务票券。',
    source: '资料来源', parkMap: '国家公园步道地图', updates: '国家公园步道公告', admission: '国家公园入园票', file: '照片原件与作者',
    placeReference: '景点背景资料', related: '继续探索', conditions: '查看步道开放情况',
  },
  pl: {
    title: 'Odkryj polskie Tatry', home: 'Strona główna Morskiego Oka', map: 'Zobacz w Mapach Google', about: 'O tym miejscu',
    park: 'Tatrzański Park Narodowy odpowiada za ochronę przyrody i zasady korzystania ze szlaków na tym obszarze.',
    facility: 'Zarządca obiektu, usługi lub terenu', basic: 'Informacje podstawowe', area: 'Rejon', name: 'Nazwa polska', approach: 'Punkt na trasie',
    highlights: 'Na co zwrócić uwagę', walking: 'Dojazd i dojście piesze', arrival: 'Na mapie TPN znajdź punkt orientacyjny na trasie:',
    route: 'Najważniejsze punkty trasy', qRoute: 'Jakie punkty sprawdzić przed wyjściem?',
    visit: 'Zwiedzanie i zdjęcia', photoTip: 'Rób zdjęcia w wyznaczonym miejscu lub ze szlaku, zostawiając przejście innym.',
    faq: 'Najczęstsze pytania', qAccess: 'Gdzie sprawdzić dostępność przed wyjściem?',
    aAccess: 'Sprawdź komunikat turystyczny TPN. Informacje o obiekcie, usłudze lub osobnym bilecie sprawdź u podanego zarządcy.',
    qTickets: 'Gdzie sprawdzić bilety?', aTickets: 'Sprawdź zasady wstępu do parku i ewentualne osobne opłaty przed wyjazdem.',
    source: 'Źródła', parkMap: 'Mapa szlaków TPN', updates: 'Komunikat turystyczny TPN', admission: 'Wstęp do TPN', file: 'Plik zdjęcia i autorstwo',
    placeReference: 'Informacje o miejscu', related: 'Odkrywaj dalej', conditions: 'Sprawdź stan szlaków',
  },
  ru: {
    title: 'Польские Татры', home: 'Главная страница Морского Ока', map: 'Открыть на Картах Google', about: 'Об этом месте',
    park: 'Татранский национальный парк (TPN) отвечает за охраняемую территорию и правила посещения троп.',
    facility: 'Управляющий объектом, услугой или территорией', basic: 'Основные сведения', area: 'Район', name: 'Польское название', approach: 'Ориентир на маршруте',
    highlights: 'На что обратить внимание', walking: 'Как добраться и пройти пешком', arrival: 'Найдите ориентир на карте троп парка:',
    route: 'Основные точки маршрута', qRoute: 'Какие точки маршрута проверить заранее?',
    visit: 'Посещение и съёмка', photoTip: 'Снимайте с тропы или площадки для посетителей и оставляйте проход свободным.',
    faq: 'Частые вопросы', qAccess: 'Где проверить, открыт ли маршрут?',
    aAccess: 'Посмотрите сообщения парка. Указанный выше оператор публикует сведения об объекте, услуге и отдельных билетах.',
    qTickets: 'Где узнать о билетах?', aTickets: 'Проверьте правила входа в парк и отдельные билеты на услуги перед поездкой.',
    source: 'Источники', parkMap: 'Карта троп парка', updates: 'Сообщения о тропах', admission: 'Вход в парк', file: 'Оригинал фотографии и автор',
    placeReference: 'Сведения о месте', related: 'Другие места рядом', conditions: 'Проверить состояние троп',
  },
  de: {
    title: 'Die polnische Tatra entdecken', home: 'Startseite Morskie Oko', map: 'In Google Maps ansehen', about: 'Über diesen Ort',
    park: 'Der Tatra-Nationalpark (TPN) betreut hier die Schutzgebiete und regelt die Nutzung der Parkwege.',
    facility: 'Verwaltung der Anlage, des Dienstes oder Geländes', basic: 'Grundinformationen', area: 'Gebiet', name: 'Polnischer Name', approach: 'Orientierungspunkt am Weg',
    highlights: 'Sehenswertes', walking: 'Anreise und Fußweg', arrival: 'Suche auf der Nationalparkkarte nach diesem Orientierungspunkt:',
    route: 'Wegpunkte im Überblick', qRoute: 'Welche Wegpunkte sollte ich vorab prüfen?',
    visit: 'Besuch und Fotografie', photoTip: 'Fotografiere vom markierten Weg oder Besucherbereich und halte den Durchgang frei.',
    faq: 'Häufige Fragen', qAccess: 'Wo kann ich den Zugang vorab prüfen?',
    aAccess: 'Lies den Wegehinweis des Nationalparks. Informationen zu Anlagen, Diensten und gesonderten Tickets findest du beim genannten Betreiber.',
    qTickets: 'Wo stehen die Eintrittsregeln?', aTickets: 'Prüfe vor der Anreise den Parkeintritt und mögliche zusätzliche Tickets.',
    source: 'Quellen', parkMap: 'Wanderkarte des Parks', updates: 'Wegehinweise des Parks', admission: 'Parkeintritt', file: 'Originalfoto und Urheber',
    placeReference: 'Hintergrund zum Ort', related: 'Weitere Ziele entdecken', conditions: 'Wegezustand prüfen',
  },
} satisfies Record<Locale, Record<string, string>>;

export const accessHubs: Record<string, { name: string; map: string }> = {
  'Morskie Oko · Dolina Roztoki': { name: 'Palenica Białczańska', map: 'Palenica Białczańska, Tatry, Polska' },
  'Rusinowa Polana · Waksmund': { name: 'Wierch Poroniec', map: 'Wierch Poroniec, Tatry, Polska' },
  'Kuźnice · Tatry Wysokie': { name: 'Kuźnice', map: 'Kuźnice, Zakopane, Polska' },
  'Zakopane · Regle': { name: 'Droga pod Reglami', map: 'Droga pod Reglami, Zakopane, Polska' },
  'Dolina Kościeliska': { name: 'Kiry', map: 'Kiry, Kościelisko, Polska' },
  'Dolina Chochołowska': { name: 'Siwa Polana', map: 'Siwa Polana, Witów, Polska' },
};

export function accessHub(place: Attraction) {
  if (place.slug === 'strazyska-valley' || place.slug === 'siklawica') {
    return { name: 'ul. Strążyska', map: 'Dolina Strążyska wejście, Zakopane, Polska' };
  }
  return accessHubs[place.area];
}

const dayWalk = {
  en: 'Plan a separate return leg. Check that you can get back to the trailhead with time for your booked transport.',
  zh: '单独安排返程。核对步行回程所需时间，并为预约的交通留出余量。',
  pl: 'Zaplanuj osobno drogę powrotną. Zostaw czas na dojście do wejścia na szlak i na transport.',
  ru: 'Заранее спланируйте возвращение. Оставьте время на дорогу к началу тропы и посадку на транспорт.',
  de: 'Plane den Rückweg separat. Rechne ausreichend Zeit bis zum Einstieg und zur Rückfahrt ein.',
};

const mountainWalk = {
  en: 'Treat the ridge or summit as a high-mountain outing. Check the park bulletin and terrain on the map before committing to a route. Choose a lower turnaround point if the conditions or your experience call for it.',
  zh: '把山口或山顶当作高山行程规划。出发前核对国家公园公告和地图地形，视天气与经验选择在较低处折返。',
  pl: 'Przełęcz lub szczyt zaplanuj jako wycieczkę wysokogórską. Sprawdź komunikat TPN i teren na mapie. W razie trudnych warunków wybierz niższy punkt nawrotu.',
  ru: 'Планируйте перевал или вершину как высокогорный маршрут. Проверьте сообщения парка и рельеф по карте. При сложных условиях выберите более низкую точку разворота.',
  de: 'Plane Pass oder Gipfel als Hochgebirgstour. Prüfe die Parkhinweise und das Gelände auf der Karte. Wähle bei schwierigen Bedingungen einen tieferen Umkehrpunkt.',
};

export function returnPlan(place: Attraction, locale: Locale) {
  const mountain = ['rysy', 'giewont', 'szpiglasowa-przelecz'].includes(place.slug);
  return (mountain ? mountainWalk : dayWalk)[locale];
}
