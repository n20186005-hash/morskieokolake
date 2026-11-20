import type { Locale } from '@/i18n/routing';

export const topics = ['parking', 'tickets', 'from-zakopane'] as const;
export type Topic = (typeof topics)[number];
type Guide = { title: string; summary: string; sections: [string, string][] };

export const labels = {
  en: ['Plan your Morskie Oko visit', 'Morskie Oko home', 'Official information', 'Map'],
  zh: ['规划海洋之眼行程', '海洋之眼首页', '官方资讯', '地图'],
  pl: ['Zaplanuj wizytę nad Morskim Okiem', 'Strona główna Morskiego Oka', 'Informacje oficjalne', 'Mapa'],
  ru: ['Планирование поездки к Морскому Оку', 'Главная страница', 'Официальная информация', 'Карта'],
  de: ['Besuch am Morskie Oko planen', 'Startseite', 'Offizielle Informationen', 'Karte'],
} satisfies Record<Locale, string[]>;

const parking = 'https://tpn.gov.pl/parkingi-morskie-oko';
const tickets = 'https://tpn.gov.pl/bilety';
const conditions = 'https://tpn.gov.pl/komunikat-turystyczny';
export const sources: Record<Topic, string[]> = {
  parking: [parking, conditions],
  tickets: [tickets, parking, conditions],
  'from-zakopane': ['https://www.zakopane.pl/', conditions, parking],
};
export const sourceLabels: Record<string, string> = {
  [parking]: 'TPN · Parkingi Morskie Oko',
  [tickets]: 'TPN · Bilety',
  [conditions]: 'TPN · Komunikat turystyczny',
  'https://www.zakopane.pl/': 'Zakopane',
};

export const guides = {
  en: {
    parking: {
      title: 'Morskie Oko parking at Palenica Białczańska and Łysa Polana',
      summary: 'Book trailhead parking through Tatra National Park and allow time to walk to the lake.',
      sections: [
        ['Where to park', 'Palenica Białczańska is the usual starting point for the walk to Morskie Oko. Staff fill Palenica first, then the roadside spaces and Łysa Polana. Parking is assigned on arrival. From Łysa Polana, allow an extra 15–20 minutes to reach the entrance.'],
        ['How to reserve', 'Choose your visit date and vehicle type in the park’s parking system. Check the price and availability there, and save your confirmation offline or print it before leaving.'],
        ['From the car park to the lake', 'Continue on foot from the trailhead via Wodogrzmoty Mickiewicza and Włosienica. Allow time for both the uphill walk and the return. Park admission is separate from parking.'],
      ],
    },
    tickets: {
      title: 'Morskie Oko tickets and Tatra National Park admission',
      summary: 'Find the park’s official ticket page and work out what you need to buy for a day visit to Morskie Oko.',
      sections: [
        ['Which ticket do you need?', 'The usual walk to Morskie Oko enters Tatra National Park at Palenica Białczańska. Check the national park’s admission ticket options, including its current concession and exemption rules.'],
        ['Where to check prices and buy', 'Use the park’s ticket page to check current prices, validity and purchase options. Save your ticket offline before travelling and have it ready at the trail entrance.'],
        ['Does admission cover parking?', 'Parking is a separate purchase for visitors arriving by car. Confirm both arrangements and check the park’s trail bulletin before setting off.'],
      ],
    },
    'from-zakopane': {
      title: 'Zakopane to Morskie Oko by bus or car',
      summary: 'Plan the journey to Palenica Białczańska, the walk to Morskie Oko and the return to Zakopane.',
      sections: [
        ['Bus from Zakopane', 'Check services toward Palenica Białczańska or Łysa Polana. Confirm where the bus stops, the return stop and the last service for your date before you leave Zakopane.'],
        ['Driving to the trailhead', 'Book trailhead parking through Tatra National Park and navigate to the Palenica Białczańska area and follow staff directions on arrival.'],
        ['Walking from Palenica', 'Follow the marked route past Wodogrzmoty Mickiewicza and Włosienica toward the lakeside shelter. Allow time to return to the same trailhead and check the park’s current trail notices before leaving.'],
      ],
    },
  },
  zh: {
    parking: {
      title: '海洋之眼停车攻略：Palenica Białczańska 与 Łysa Polana',
      summary: '了解两个停车区的位置、国家公园停车预约方式，以及停车后如何步行到海洋之眼。',
      sections: [
        ['停在哪里', 'Palenica Białczańska 是前往海洋之眼的常用步道入口。Łysa Polana 位于同一进山走廊。工作人员按到达顺序引导车辆，先停 Palenica，再安排路边车位和 Łysa Polana。从 Łysa Polana 步行到入口约多 15–20 分钟。'],
        ['怎样预约车位', '在塔特拉国家公园停车系统选择日期和车型，查看当日价格及剩余车位。出发前将确认单保存到手机离线文件，或打印随身携带。'],
        ['停车后如何到湖边', '从步道入口经米茨凯维奇瀑布和 Włosienica 前往湖边。为上坡和返程都留出时间。停车预约与国家公园门票分别办理。'],
      ],
    },
    tickets: {
      title: '海洋之眼门票：塔特拉国家公园购票指南',
      summary: '从官方入口查询票价、适用日期和优惠资格，提前准备海洋之眼一日游所需票券。',
      sections: [
        ['该买哪种票', '常用路线从 Palenica Białczańska 进入塔特拉国家公园。出发前核对国家公园入园票和当期优惠、免票条件。'],
        ['怎样查价和购票', '以国家公园售票页面上的最新票价、有效期及购买方式为准。购票后离线保存，方便在步道入口出示。'],
        ['门票包含停车吗', '自驾访客须另外安排停车。先分别确认入园和停车，再查看公园步道公告。'],
      ],
    },
    'from-zakopane': {
      title: '从扎科帕内到海洋之眼：巴士、自驾与步行',
      summary: '规划到 Palenica Białczańska 步道入口的交通、湖边徒步和当天返程。',
      sections: [
        ['从扎科帕内乘车', '查找前往 Palenica Białczańska 或 Łysa Polana 的班车，出发前确认实际下车点、返程站点和当天末班时间。'],
        ['自驾到步道入口', '通过塔特拉国家公园预约停车，导航至 Palenica Białczańska 附近，到场后按工作人员指引停车。'],
        ['从 Palenica 步行到湖边', '沿标识步道，经米茨凯维奇瀑布和 Włosienica 到湖畔山屋。预留原路返程的时间，出发前查看国家公园步道公告。'],
      ],
    },
  },
  pl: {
    parking: {
      title: 'Parking Morskie Oko: Palenica Białczańska i Łysa Polana',
      summary: 'Wybierz parking, zarezerwuj miejsce w systemie TPN i zaplanuj dojście nad jezioro.',
      sections: [
        ['Gdzie zaparkować', 'Palenica Białczańska to typowy początek trasy nad Morskie Oko. Łysa Polana to drugi parking w tej samej okolicy. Obsługa kieruje auta kolejno na Palenicę, pas drogowy i Łysą Polanę. Z Łysej Polany dojście do wejścia zajmuje dodatkowe 15–20 minut.'],
        ['Jak zarezerwować miejsce', 'Wybierz datę i rodzaj pojazdu w systemie TPN. Sprawdź cenę i dostępność, a potwierdzenie zapisz w telefonie lub wydrukuj.'],
        ['Dojście nad jezioro', 'Z wejścia na szlak idź przez Wodogrzmoty Mickiewicza i Włosienicę. Zaplanuj czas na wejście i powrót. Bilet do parku kupuje się osobno.'],
      ],
    },
    tickets: {
      title: 'Bilety nad Morskie Oko: wstęp do Tatrzańskiego Parku Narodowego',
      summary: 'Sprawdź, gdzie kupić bilet do TPN i jakie opłaty uwzględnić przed wycieczką.',
      sections: [
        ['Jaki bilet wybrać', 'Standardowa trasa nad Morskie Oko prowadzi przez wejście do TPN na Palenicy Białczańskiej. Sprawdź aktualne rodzaje biletów, ulgi i zwolnienia.'],
        ['Ceny i zakup', 'Aktualne ceny, terminy ważności i opcje zakupu sprawdzisz w serwisie TPN. Zapisz bilet w telefonie, aby okazać go także bez dostępu do sieci.'],
        ['Czy bilet obejmuje parking?', 'Kierowcy wykupują parking osobno. Przed wyjazdem sprawdź oba bilety oraz komunikat turystyczny TPN.'],
      ],
    },
    'from-zakopane': {
      title: 'Z Zakopanego nad Morskie Oko: bus, samochód i dojście',
      summary: 'Zaplanuj dojazd do Palenicy Białczańskiej, przejście nad jezioro i powrót do Zakopanego.',
      sections: [
        ['Busem z Zakopanego', 'Sprawdź kursy w stronę Palenicy Białczańskiej lub Łysej Polany. Ustal miejsce wysiadania, przystanek powrotny i godzinę ostatniego kursu w dniu wycieczki.'],
        ['Samochodem', 'Zarezerwuj parking w systemie TPN. Jedź w rejon Palenicy Białczańskiej i stosuj się do wskazówek obsługi.'],
        ['Pieszo z Palenicy', 'Kieruj się oznakowanym szlakiem przez Wodogrzmoty Mickiewicza i Włosienicę do schroniska nad jeziorem. Przed wyjściem sprawdź komunikat TPN i uwzględnij czas na powrót.'],
      ],
    },
  },
  ru: {
    parking: {
      title: 'Парковки у Морского Ока: Паленица-Бялчанская и Лыса-Поляна',
      summary: 'Выберите стоянку у начала маршрута, забронируйте место и спланируйте пеший путь к озеру.',
      sections: [
        ['Где оставить машину', 'Паленица-Бялчанская — обычная отправная точка для прогулки. Лыса-Поляна — другая стоянка в том же районе. Место распределяют по порядку прибытия: сначала на Паленице, затем вдоль дороги и на Лысой-Поляне. От Лысой-Поляны до входа ещё 15–20 минут пешком.'],
        ['Как забронировать', 'Выберите дату и тип автомобиля в системе Татранского национального парка. Проверьте цену и наличие мест, затем сохраните подтверждение офлайн или распечатайте.'],
        ['От стоянки к озеру', 'От входа идите через водопады Мицкевича и поляну Влосеница. Заложите время на подъём и обратный путь. Входной билет в парк приобретается отдельно.'],
      ],
    },
    tickets: {
      title: 'Билеты на Морское Око: вход в Татранский национальный парк',
      summary: 'Узнайте, где проверить цену и купить входной билет для прогулки к озеру.',
      sections: [
        ['Какой билет нужен', 'Обычный маршрут начинается у входа в Татранский национальный парк на Паленице-Бялчанской. Проверьте варианты входных билетов, условия льгот и освобождения от оплаты.'],
        ['Покупка и срок действия', 'Актуальные цены, срок действия и способы покупки указаны в билетном разделе парка. Сохраните билет офлайн, чтобы показать его на входе.'],
        ['Входит ли парковка в билет?', 'Парковка оплачивается отдельно. Перед поездкой проверьте оба билета и сообщения парка о состоянии троп.'],
      ],
    },
    'from-zakopane': {
      title: 'Из Закопане к Морскому Оку: автобус, машина и пеший маршрут',
      summary: 'Спланируйте поездку до Паленицы-Бялчанской, прогулку к озеру и возвращение в Закопане.',
      sections: [
        ['На автобусе из Закопане', 'Ищите рейсы в направлении Паленицы-Бялчанской или Лысой-Поляны. Уточните остановку прибытия, место посадки на обратный рейс и время последнего автобуса на нужную дату.'],
        ['На автомобиле', 'Забронируйте стоянку через национальный парк и направляйтесь к Паленице-Бялчанской. На месте следуйте указаниям сотрудников парковки.'],
        ['Пешком от Паленицы', 'Идите по размеченной тропе мимо водопадов Мицкевича и поляны Влосеница к приюту у озера. Проверьте сообщения парка о маршруте и оставьте время на возвращение.'],
      ],
    },
  },
  de: {
    parking: {
      title: 'Parken am Morskie Oko: Palenica Białczańska und Łysa Polana',
      summary: 'Finde den Parkplatz am Ausgangspunkt, reserviere beim Nationalpark und plane den Fußweg zum See.',
      sections: [
        ['Wo du parken kannst', 'Palenica Białczańska ist der übliche Ausgangspunkt der Wanderung. Łysa Polana ist ein weiterer Parkplatz in der Nähe. Das Personal weist die Plätze bei Ankunft zu: zuerst in Palenica, dann am Straßenrand und in Łysa Polana. Von Łysa Polana sind es zusätzlich etwa 15–20 Minuten bis zum Eingang.'],
        ['So buchst du einen Stellplatz', 'Wähle im Buchungssystem des Nationalparks das Datum und den Fahrzeugtyp. Prüfe Preis und Verfügbarkeit und speichere die Bestätigung offline oder drucke sie aus.'],
        ['Vom Parkplatz zum See', 'Gehe ab dem Parkeingang über die Mickiewicz-Wasserfälle und Włosienica. Plane Zeit für Hin- und Rückweg ein. Den Parkeintritt buchst du separat.'],
      ],
    },
    tickets: {
      title: 'Tickets für Morskie Oko: Eintritt in den Tatra-Nationalpark',
      summary: 'Hier findest du die offizielle Verkaufsstelle und erfährst, welche Tickets du für deinen Ausflug brauchst.',
      sections: [
        ['Welches Ticket brauchst du?', 'Die übliche Wanderung beginnt am Eingang des Tatra-Nationalparks in Palenica Białczańska. Prüfe die Eintrittskarten und die aktuellen Bedingungen für Ermäßigungen und freien Eintritt.'],
        ['Preise und Kauf', 'Auf der Ticketseite des Parks stehen die aktuellen Preise, Gültigkeitsregeln und Kaufmöglichkeiten. Speichere das Ticket offline zur Kontrolle am Eingang.'],
        ['Ist Parken im Eintritt enthalten?', 'Der Stellplatz wird separat gebucht. Prüfe vor der Anfahrt beide Buchungen und die aktuellen Wegehinweise des Parks.'],
      ],
    },
    'from-zakopane': {
      title: 'Von Zakopane zum Morskie Oko: Bus, Auto und Wanderung',
      summary: 'Plane die Anfahrt nach Palenica Białczańska, den Fußweg zum See und die Rückfahrt.',
      sections: [
        ['Mit dem Bus ab Zakopane', 'Suche Verbindungen Richtung Palenica Białczańska oder Łysa Polana. Prüfe den Ausstieg, die Haltestelle für die Rückfahrt und die letzte Verbindung für deinen Ausflugstag.'],
        ['Mit dem Auto', 'Reserviere einen Parkplatz über den Nationalpark. Fahre in Richtung Palenica Białczańska und halte dich vor Ort an die Anweisungen des Personals.'],
        ['Zu Fuß ab Palenica', 'Folge dem markierten Weg an den Mickiewicz-Wasserfällen und Włosienica vorbei zur Hütte am See. Prüfe die Wegehinweise des Parks und rechne genügend Zeit für den Rückweg ein.'],
      ],
    },
  },
} satisfies Record<Locale, Record<Topic, Guide>>;
