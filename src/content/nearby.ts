import type { Locale } from '@/i18n/routing';

export const nearbyTopics = ['mickiewicz-waterfalls', 'wlosienica'] as const;
export type NearbyTopic = (typeof nearbyTopics)[number];

export const nearbyFacts = {
  'mickiewicz-waterfalls': {
    name: 'Wodogrzmoty Mickiewicza',
    elevation: 1120,
    map: 'https://www.google.com/maps?cid=3417450835632082106',
    reviews: 'https://wanderlog.com/place/details/203311',
    count: 6945,
    photo: 'https://commons.wikimedia.org/wiki/File:Wodogrzmoty_Mickiewicza2.jpg',
    photographer: 'Aneta Pawska',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  },
  wlosienica: {
    name: 'Polana Włosienica',
    elevation: 1315,
    map: 'https://www.google.com/maps?cid=208580886014873188',
    reviews: 'https://wanderlog.com/place/details/7526005/w%C5%82osienica-polana',
    count: 29,
    photo: 'https://commons.wikimedia.org/wiki/File:W%C5%82osienica_a1.jpg',
    photographer: 'Jerzy Opioła',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
} satisfies Record<NearbyTopic, {
  name: string;
  elevation: number;
  map: string;
  reviews: string;
  count: number;
  photo: string;
  photographer: string;
  license: string;
  licenseUrl: string;
}>;

export const moduleLabels = {
  en: ['Nearby attractions', 'Basic information', 'Managed by', 'Getting there', 'Ratings and reviews', 'Google ratings via Wanderlog', 'Source checked 20 Nov 2026', 'See the lake’s visitor reviews', 'Elevation', 'Area', 'Reviews'],
  zh: ['周边景点', '基本信息', '管理主体', '交通方式', '评分与评价', 'Google 评分快照，由 Wanderlog 转录', '资料查阅于 2026 年 11 月 20 日', '查看海洋之眼湖的游客评价', '海拔', '所在区域', '条评价'],
  pl: ['Atrakcje w pobliżu', 'Informacje podstawowe', 'Zarządca', 'Dojazd i dojście', 'Oceny i opinie', 'Oceny Google udostępnione przez Wanderlog', 'Źródło sprawdzono 20.11.2026', 'Zobacz opinie o Morskim Oku', 'Wysokość', 'Obszar', 'opinii'],
  ru: ['Достопримечательности рядом', 'Основная информация', 'Управление', 'Как добраться', 'Оценки и отзывы', 'Оценки Google по данным Wanderlog', 'Источник проверен 20.11.2026', 'Отзывы посетителей озера', 'Высота', 'Район', 'отзывов'],
  de: ['Sehenswürdigkeiten in der Nähe', 'Grundinformationen', 'Verwaltung', 'Anreise und Zugang', 'Bewertungen', 'Google-Bewertungen laut Wanderlog', 'Quelle geprüft am 20.11.2026', 'Besucherbewertungen zum See', 'Höhe', 'Gebiet', 'Bewertungen'],
} satisfies Record<Locale, [string, string, string, string, string, string, string, string, string, string, string]>;

type NearbyCopy = { title: string; summary: string; sections: [string, string][] };

export const nearbyCopy = {
  en: {
    'mickiewicz-waterfalls': {
      title: 'Wodogrzmoty Mickiewicza waterfalls',
      summary: 'A cascade in the Roztoka valley, viewed from the stone bridge on the Morskie Oko trail.',
      sections: [
        ['What you can see from the bridge', 'The main viewpoint looks onto Pośredni Wodogrzmot, the middle cascade. Frame the falling water with the rock walls and trees from the bridge. Keep the walkway clear and stay behind the barrier.'],
        ['Walking from Palenica Białczańska', 'Enter at Palenica and follow the signed Morskie Oko route uphill to the bridge. You can return the same way or continue via Włosienica toward the lake. Check the park bulletin before setting out.'],
        ['Planning your stop', 'For a shorter outing, make the bridge your turnaround point. For a full lake visit, leave enough time to walk back to Palenica and reach your return bus.'],
      ],
    },
    wlosienica: {
      title: 'Włosienica clearing',
      summary: 'A mountain clearing below Morskie Oko with a view of the Mięguszowieckie peaks.',
      sections: [
        ['What to look for', 'The trees open out onto a view of the upper valley. Look for the ridgeline above the lake basin and frame it with the edge of the clearing.'],
        ['Getting to the clearing', 'Follow the Morskie Oko route uphill from Palenica via the Mickiewicz waterfalls. For the park’s electric shuttle, check which journeys serve Włosienica on your date. The final stretch to the lake is on foot.'],
        ['How to fit it into the walk', 'Pause here before the final ascent or stop on your way back down. If turning back here, use the same signed route to Palenica and check your return transport before leaving.'],
      ],
    },
  },
  zh: {
    'mickiewicz-waterfalls': {
      title: '米茨凯维奇瀑布',
      summary: '沿海洋之眼步道走到石桥，可以看到罗兹托卡山谷中的中段瀑布。',
      sections: [
        ['石桥上能看到什么', '石桥视野主要对着中段瀑布 Pośredni Wodogrzmot。拍摄时可将岩壁和林木一起纳入画面，请在护栏内取景并留出通行空间。'],
        ['从 Palenica Białczańska 步行', '从 Palenica 入口沿海洋之眼步道上行至石桥。可以原路返回，也可经 Włosienica 继续往湖边走。出发前查看国家公园的步道公告。'],
        ['怎样安排停留', '只想走一段短路线时，可以在石桥折返。若继续前往湖边，记得预留走回 Palenica 和搭乘返程巴士的时间。'],
      ],
    },
    wlosienica: {
      title: 'Włosienica 山间草甸',
      summary: '位于海洋之眼湖下方的开阔地，可望见 Mięguszowieckie 群峰。',
      sections: [
        ['草甸看点', '林道在这里打开视野。天气晴朗时可观察湖盆上方的山脊，拍照时可把草甸边缘作为前景。'],
        ['怎么到草甸', '从 Palenica 沿海洋之眼步道上行，途中经过米茨凯维奇瀑布。若考虑电动接驳，请先在公园页面查询当天停靠 Włosienica 的班次。草甸到湖边仍需步行。'],
        ['怎样排进行程', '可在最后一段上坡前休息，也可留到下山时停留。若在草甸折返，沿有标识的步道走回 Palenica，并提前核对回程交通。'],
      ],
    },
  },
  pl: {
    'mickiewicz-waterfalls': {
      title: 'Wodogrzmoty Mickiewicza',
      summary: 'Kaskady w dolinie Roztoki widoczne z kamiennego mostu na drodze do Morskiego Oka.',
      sections: [
        ['Widok z mostu', 'Z mostu najlepiej widać Pośredni Wodogrzmot. Na zdjęciu warto ująć również skalne ściany i drzewa. Fotografuj zza bariery i zostaw przejście innym turystom.'],
        ['Dojście z Palenicy Białczańskiej', 'Idź oznakowaną drogą w stronę Morskiego Oka aż do mostu. Możesz wrócić tą samą drogą albo iść dalej przez Włosienicę. Przed wyjściem sprawdź komunikat TPN.'],
        ['Jak zaplanować postój', 'Na krótszy spacer wybierz most jako punkt nawrotu. Jeśli idziesz nad jezioro, zostaw czas na powrót do Palenicy i dojście na przystanek.'],
      ],
    },
    wlosienica: {
      title: 'Polana Włosienica',
      summary: 'Polana poniżej Morskiego Oka z widokiem na Mięguszowieckie Szczyty.',
      sections: [
        ['Co widać z polany', 'Po wyjściu z lasu otwiera się widok na górną część doliny i grań nad jeziorem. Skraj polany dobrze sprawdza się jako pierwszy plan zdjęcia.'],
        ['Dojście i dojazd', 'Z Palenicy idź w stronę Morskiego Oka przez Wodogrzmoty Mickiewicza. Jeśli planujesz przejazd e-busem, sprawdź w TPN kursy do Włosienicy w wybranym dniu. Ostatni odcinek nad jezioro pokonasz pieszo.'],
        ['Postój w drodze nad jezioro', 'Odpocznij przed końcowym podejściem albo w drodze powrotnej. Jeśli kończysz spacer na polanie, wróć oznakowaną trasą do Palenicy i wcześniej sprawdź połączenie powrotne.'],
      ],
    },
  },
  ru: {
    'mickiewicz-waterfalls': {
      title: 'Водопады Мицкевича',
      summary: 'Каскады в долине Розтока, которые видно с каменного моста на тропе к Морскому Оку.',
      sections: [
        ['Что видно с моста', 'С моста лучше всего виден средний каскад. При съёмке можно включить в кадр скалы и деревья. Оставайтесь за ограждением и оставляйте проход свободным.'],
        ['Путь от Паленицы-Бялчанской', 'От входа идите по указателям к Морскому Оку до каменного моста. Можно вернуться той же дорогой или продолжить путь через Влосеницу. Перед выходом проверьте сообщения парка.'],
        ['Как запланировать остановку', 'Для короткой прогулки развернитесь у моста. Если идёте к озеру, оставьте время на спуск до Паленицы и обратный автобус.'],
      ],
    },
    wlosienica: {
      title: 'Поляна Влосеница',
      summary: 'Горная поляна ниже Морского Ока с видом на Менгушовецкие вершины.',
      sections: [
        ['Что видно с поляны', 'За деревьями открывается вид на верховья долины и хребет над озером. Край поляны можно использовать как передний план при съёмке.'],
        ['Как добраться', 'Идите от Паленицы к Морскому Оку мимо водопадов Мицкевича. Если выбираете электробус, проверьте рейсы до Влосеницы на сайте парка. Последний участок до озера нужно пройти пешком.'],
        ['Как запланировать остановку', 'Отдохните здесь перед последним подъёмом или на обратном пути. Если заканчиваете прогулку на поляне, вернитесь по размеченной тропе до Паленицы и проверьте обратный транспорт.'],
      ],
    },
  },
  de: {
    'mickiewicz-waterfalls': {
      title: 'Mickiewicz-Wasserfälle',
      summary: 'Wasserfälle im Roztoka-Tal, sichtbar von der Steinbrücke auf dem Weg zum Morskie Oko.',
      sections: [
        ['Blick von der Steinbrücke', 'Von der Brücke ist der mittlere Wasserfall am besten zu sehen. Felswände und Bäume geben dem Foto einen Rahmen. Bleib hinter dem Geländer und halte den Durchgang frei.'],
        ['Zu Fuß ab Palenica Białczańska', 'Folge den Wegweisern zum Morskie Oko bis zur Brücke. Du kannst dort umkehren oder über Włosienica zum See weitergehen. Prüfe vor dem Start die Hinweise des Nationalparks.'],
        ['Den Halt einplanen', 'Für einen kürzeren Spaziergang bietet sich die Brücke als Wendepunkt an. Wenn du bis zum See gehst, plane den Rückweg bis Palenica und den Anschluss an den Bus ein.'],
      ],
    },
    wlosienica: {
      title: 'Lichtung Włosienica',
      summary: 'Eine Berglichtung unterhalb des Morskie Oko mit Blick auf die Mięguszowieckie-Gipfel.',
      sections: [
        ['Aussicht von der Lichtung', 'Hinter dem Wald öffnet sich der Blick auf das obere Tal und den Grat über dem See. Der Rand der Lichtung eignet sich als Vordergrund für ein Foto.'],
        ['So kommst du hin', 'Folge ab Palenica dem Weg zum Morskie Oko über die Mickiewicz-Wasserfälle. Für den Elektroshuttle prüfst du die Fahrten nach Włosienica beim Nationalpark. Das letzte Stück zum See geht es zu Fuß weiter.'],
        ['Den Halt einplanen', 'Hier kannst du vor dem letzten Anstieg oder auf dem Rückweg rasten. Wenn du an der Lichtung umkehrst, folge dem markierten Weg zurück nach Palenica und prüfe vorher die Rückfahrt.'],
      ],
    },
  },
} satisfies Record<Locale, Record<NearbyTopic, NearbyCopy>>;
