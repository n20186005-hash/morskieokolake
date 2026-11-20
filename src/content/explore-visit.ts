import { getFacility, parkAdmission, type Attraction } from './explore';
import type { Locale } from '@/i18n/routing';

const cave = 'https://tpn.gov.pl/jaskinia-mrozna';
export const lodging = 'https://tpn.gov.pl/noclegi-i-schroniska';
export const publicTransport = 'https://www.zakopane.pl/zawartosc/informator-turystyczny/nowe-rozklady-jazdy/';

const photoSpots: Record<string, string> = {
  'czarny-staw-rysy': 'Czarny Staw pod Rysami · Morskie Oko',
  'roztoka-valley': 'Dolina Roztoki · Roztoka',
  'roztoka-shelter': 'Stara Roztoka · Schronisko PTTK',
  'five-lakes-valley': 'Przedni Staw Polski',
  'five-lakes-shelter': 'Przedni Staw Polski · Schronisko PTTK',
  siklawa: 'Wielka Siklawa · Dolina Roztoki',
  'rusinowa-polana': 'Rusinowa Polana · panorama Tatr Wysokich',
  'gesia-szyja': 'Gęsia Szyja · Waksmundzkie Skałki',
  'waksmundzka-rownien': 'Rówień Waksmundzka · obrzeże polany',
  'polana-pod-woloszynem': 'Polana pod Wołoszynem · skraj lasu',
  'szpiglasowa-przelecz': 'Szpiglasowa Przełęcz',
  rysy: 'Czarny Staw pod Rysami',
  kuznice: 'Kuźnice · zabudowania historyczne',
  kalatowki: 'Polana Kalatówki · Hotel Górski',
  kondratowa: 'Hala Kondratowa',
  giewont: 'Polana Strążyska · Giewont',
  'kasprowy-wierch': 'Kasprowy Wierch · górna stacja PKL',
  'hala-gasienicowa': 'Hala Gąsienicowa · drewniane szałasy',
  murowaniec: 'Murowaniec · fasada schroniska',
  'czarny-staw-gasienicowy': 'Czarny Staw Gąsienicowy · brzeg',
  nosal: 'Nosal · punkt widokowy',
  'bialego-valley': 'Dolina Białego · potok',
  'strazyska-valley': 'Polana Strążyska · Giewont',
  siklawica: 'Siklawica · podejście pod wodospad',
  'sarnia-skala': 'Sarnia Skała · Giewont',
  'koscieliska-valley': 'Dolina Kościeliska · Potok Kościeliski',
  'mrozna-cave': 'Jaskinia Mroźna · wejście',
  'krakow-gorge': 'Wąwóz Kraków · wejście',
  'smreczynski-pond': 'Smreczyński Staw · brzeg',
  'ornak-shelter': 'Hala Ornak · polana przed schroniskiem',
  'chocholowska-valley': 'Dolina Chochołowska · Siwa Polana',
  'chocholowska-meadow': 'Polana Chochołowska · szałasy',
};

const shelters: Record<string, string> = {
  'Morskie Oko · Dolina Roztoki': 'Schronisko PTTK nad Morskim Okiem · Schronisko PTTK w Dolinie Roztoki',
  'Rusinowa Polana · Waksmund': 'Bukowina Tatrzańska · Zakopane',
  'Kuźnice · Tatry Wysokie': 'Zakopane · Murowaniec',
  'Zakopane · Regle': 'Zakopane',
  'Dolina Kościeliska': 'Kiry · Kościelisko · Schronisko PTTK na Hali Ornak',
  'Dolina Chochołowska': 'Witów · Schronisko PTTK na Polanie Chochołowskiej',
};

export function visitDetails(place: Attraction, locale: Locale) {
  const t = visitLabels[locale];
  const facility = getFacility(place.slug);
  const isCave = place.slug === 'mrozna-cave';
  const isValley = place.area === 'Dolina Chochołowska';
  const isLift = place.slug === 'kasprowy-wierch';
  const isVillage = place.slug === 'kuznice';
  const isShelter = place.slug.endsWith('-shelter') || place.slug === 'murowaniec';
  const access = isCave ? t.caveHours : (isLift || isShelter || isVillage) ? t.facilityHours : t.trailHours;
  const fee = isCave ? t.cavePrice : isValley ? t.valleyPrice : isLift ? t.liftPrice : isVillage ? t.villagePrice : t.parkPrice;
  return {
    access,
    fee,
    admissionUrl: isCave ? cave : ((isValley || isLift) && facility ? facility.url : parkAdmission),
    hoursUrl: isCave ? cave : (isLift || isShelter) ? facility?.url : undefined,
    photoSpot: photoSpots[place.slug],
    stay: isShelter ? place.name : shelters[place.area],
  };
}

export const visitLabels = {
  en: {
    intro: 'Explore the attraction', tips: 'Visit tips', hours: 'Opening hours and trail access', prices: 'Tickets and prices',
    accessLink: 'Check access', ticketLink: 'Check tariffs and tickets', transit: 'Zakopane bus station timetables',
    rules: 'Before you set out', photo: 'Photography spots', stay: 'Where to stay', reviews: 'Visitor reviews', directions: 'Address and map',
    stayText: 'Suggested bases and lodges. Check opening dates and book directly before building your itinerary around a stay.',
    reviewsText: 'Open the listing for this location to read available visitor reviews.',
    trailHours: 'Access depends on the trail and date. Check the park bulletin for seasonal closures and plan the return within daylight.',
    facilityHours: 'Facility hours and trail access follow different schedules. Check the operator and the park bulletin for your visit date.',
    caveHours: 'Published season: 26 April–31 October, 09:00–17:00. Last admission 16:30. Check the park notice for exceptions.',
    parkPrice: 'Published TPN day admission: PLN 11 standard, PLN 5.50 reduced. Parking and facility charges may apply separately.',
    cavePrice: 'Published cave admission: PLN 11 per person, free for children up to age seven per TPN. Park entry is separate.',
    valleyPrice: 'The forest community sets valley admission and any separate charges at Siwa Polana. Check its tariff before travelling.',
    liftPrice: 'Cable-car fares vary by date and ticket type. Check PKL for the fare and TPN for admission rules.',
    villagePrice: 'Check the relevant facility charge in Kuźnice. A marked trail into the national park may require park admission.',
  },
  zh: {
    intro: '探索景点', tips: '游览建议', hours: '开放时间与步道通行', prices: '门票与价格',
    accessLink: '查看开放公告', ticketLink: '查看票价与购票方式', transit: '扎科帕内巴士总站时刻表',
    rules: '游览须知', photo: '拍照机位', stay: '住宿建议', reviews: '游客评价', directions: '交通指南与地图',
    stayText: '下列城镇或山屋可作为行程据点。若需要住宿，请先核对营业日期和订房方式，再安排返程。',
    reviewsText: '打开本景点的地图条目，查看可用的游客评价。',
    trailHours: '通行情况随步道和日期变化。出发前查看国家公园的季节性关闭公告，并安排在天黑前返程。',
    facilityHours: '设施营业与步道通行各有安排。请根据游览日期查询运营方和国家公园公告。',
    caveHours: '公园公布的开放期为 4 月 26 日至 10 月 31 日，09:00–17:00，最后入场 16:30。临时变化请查官方公告。',
    parkPrice: '公园公布的一日票为成人 11 波兰兹罗提、优惠票 5.50 波兰兹罗提。停车与设施可能分别收费。',
    cavePrice: '洞穴公布票价为每人 11 波兰兹罗提，儿童免票年龄按国家公园规则执行。入园票另计。',
    valleyPrice: '谷地门票及额外收费由林地共同体制定，请在出发前查 Siwa Polana 入口的适用票价。',
    liftPrice: '缆车价格随日期和票种变化。请到 PKL 查缆车票价，并向国家公园核对入园规则。',
    villagePrice: 'Kuźnice 的设施可有各自票价。从标记步道进入国家公园时，请核对入园票。',
  },
  pl: {
    intro: 'Poznaj miejsce', tips: 'Porady przed wizytą', hours: 'Godziny otwarcia i dostępność', prices: 'Bilety i ceny',
    accessLink: 'Sprawdź dostępność', ticketLink: 'Sprawdź cennik i bilety', transit: 'Rozkład dworca autobusowego w Zakopanem',
    rules: 'Przed wyruszeniem', photo: 'Miejsca do fotografowania', stay: 'Gdzie nocować', reviews: 'Opinie odwiedzających', directions: 'Dojazd i mapa',
    stayText: 'Proponowane bazy i schroniska. Przed zaplanowaniem noclegu sprawdź terminy i warunki rezerwacji.',
    reviewsText: 'Otwórz wizytówkę tego miejsca, aby przeczytać dostępne opinie.',
    trailHours: 'Dostęp zależy od szlaku i daty. Sprawdź sezonowe zamknięcia w komunikacie TPN i zaplanuj powrót przed zmrokiem.',
    facilityHours: 'Godziny obiektu i dostępność szlaku podlegają osobnym zasadom. Sprawdź informacje zarządcy i komunikat TPN.',
    caveHours: 'Podany sezon: 26 kwietnia–31 października, 09:00–17:00. Ostatnie wejście 16:30. Sprawdź komunikat o zmianach.',
    parkPrice: 'Cennik jednodniowy TPN: 11 PLN normalny, 5,50 PLN ulgowy. Parking i obiekty mogą mieć osobne opłaty.',
    cavePrice: 'Wstęp do jaskini kosztuje według cennika 11 PLN od osoby. Zasady bezpłatnego wejścia dla dzieci podaje TPN. Wstęp do parku rozlicza się osobno.',
    valleyPrice: 'Wspólnota leśna ustala bilety do doliny i opłaty dodatkowe. Przed wyjazdem sprawdź cennik wejścia na Siwej Polanie.',
    liftPrice: 'Cena kolejki zależy od terminu i rodzaju biletu. Sprawdź cennik PKL oraz zasady wstępu TPN.',
    villagePrice: 'Sprawdź cennik odwiedzanego obiektu w Kuźnicach. Wejście na szlak w parku może wymagać biletu TPN.',
  },
  ru: {
    intro: 'Знакомство с местом', tips: 'Советы для посещения', hours: 'Часы работы и доступ', prices: 'Билеты и цены',
    accessLink: 'Проверить доступ', ticketLink: 'Проверить цены и билеты', transit: 'Расписание автовокзала Закопане',
    rules: 'Перед выходом', photo: 'Точки для съёмки', stay: 'Где остановиться', reviews: 'Отзывы посетителей', directions: 'Как добраться и карта',
    stayText: 'Возможные базы и приюты. Перед поездкой уточните даты работы и условия бронирования.',
    reviewsText: 'Откройте карточку этого места, чтобы прочитать доступные отзывы.',
    trailHours: 'Доступ зависит от тропы и даты. Проверьте сезонные закрытия в сообщении парка и запланируйте возврат до темноты.',
    facilityHours: 'График объекта отличается от режима троп. Уточните условия посещения у оператора и в сообщениях парка.',
    caveHours: 'Опубликованный сезон: 26 апреля — 31 октября, 09:00–17:00. Последний вход в 16:30. Проверьте сообщения об изменениях.',
    parkPrice: 'Опубликованные цены на день: 11 PLN обычный билет, 5,50 PLN льготный. За парковку и услуги может взиматься отдельная плата.',
    cavePrice: 'Опубликованный билет в пещеру стоит 11 PLN с человека. Правила бесплатного входа для детей указаны на сайте парка. Вход в парк оплачивается отдельно.',
    valleyPrice: 'Вход и дополнительные сборы устанавливает лесное сообщество. Проверьте тариф входа на Сивой поляне.',
    liftPrice: 'Цена канатной дороги зависит от даты и билета. Сверьте тариф PKL и правила входа в парк.',
    villagePrice: 'Уточните цену выбранного объекта в Кузнице. Для тропы внутри парка может понадобиться билет.',
  },
  de: {
    intro: 'Den Ort entdecken', tips: 'Besuchstipps', hours: 'Öffnungszeiten und Wegzugang', prices: 'Eintritt und Preise',
    accessLink: 'Zugang prüfen', ticketLink: 'Preise und Tickets prüfen', transit: 'Fahrpläne am Busbahnhof Zakopane',
    rules: 'Vor dem Aufbruch', photo: 'Fotostandorte', stay: 'Unterkunft', reviews: 'Besucherbewertungen', directions: 'Anreise und Karte',
    stayText: 'Mögliche Ausgangsorte und Hütten. Prüfe Öffnung und Reservierung, bevor du eine Übernachtung einplanst.',
    reviewsText: 'Öffne den Karteneintrag dieses Orts, um verfügbare Bewertungen zu lesen.',
    trailHours: 'Der Zugang hängt vom Weg und Datum ab. Prüfe saisonale Sperren und plane den Rückweg bei Tageslicht.',
    facilityHours: 'Für Anlage und Wege gelten eigene Zeiten. Prüfe die Angaben des Betreibers und die Parkhinweise für deinen Besuchstag.',
    caveHours: 'Angegebene Saison: 26. April–31. Oktober, 09:00–17:00. Letzter Einlass 16:30. Prüfe Mitteilungen zu Änderungen.',
    parkPrice: 'Veröffentlichter Tageseintritt des TPN: 11 PLN regulär, 5,50 PLN ermäßigt. Parken und Anlagen können extra kosten.',
    cavePrice: 'Veröffentlichter Höhleneintritt: 11 PLN pro Person. Die Regeln für freien Eintritt von Kindern stehen beim Nationalpark. Der Parkeintritt ist separat.',
    valleyPrice: 'Die Waldgemeinschaft legt den Taleintritt und Zusatzgebühren fest. Prüfe vor der Anreise den Tarif am Eingang Siwa Polana.',
    liftPrice: 'Der Seilbahnpreis hängt von Datum und Ticket ab. Prüfe den PKL-Tarif und die Eintrittsregeln des Nationalparks.',
    villagePrice: 'Prüfe den Tarif der Anlage in Kuźnice. Für markierte Wege in den Nationalpark kann ein Parkticket erforderlich sein.',
  },
} satisfies Record<Locale, Record<string, string>>;
