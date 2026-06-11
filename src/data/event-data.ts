export type EventListItem = {
  eventId: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStatus: string;
  eventType: string;
  eventTarget: string;
  benefitType: string;
};

export type EventDetailValues = {
  eventName: string;
  eventType: string;
  eventStatus: string;
  eventTarget: string;
  eventStartDate: string;
  eventEndDate: string;
  winnerAnnouncementDate: string;
  benefitType: string;
  useType: string;
  marketingPushAgreement: boolean;
  agreementList: string[];
  eventBanner: File[] | null;
  eventBannerDescription: string;
  buttonEvent: string;
  buttonName: string;
  externalLink: string;
  fcfsUse: string;
  numberOfParticipants: string;
  benefitList: string;
  benefitAmount: string;
  participationSteps: string[];
  prizeDescription: string;
  viewCount: number;
  targetDescription?: string;
};

export const MOCK_EVENT_LIST: EventListItem[] = [
  {
    eventId: '112',
    eventName: 'KB GS Pay통장 만들고 스페셜 카드박스 응모하기',
    eventStartDate: '2026-05-18',
    eventEndDate: '2026-07-12',
    eventStatus: '게시',
    eventType: '일반',
    eventTarget: '모든 회원',
    benefitType: '즉시 지급',
  },
  {
    eventId: '113',
    eventName: '이벤트 2',
    eventStartDate: '2026-02-01',
    eventEndDate: '2026-02-28',
    eventStatus: '게시',
    eventType: '퀴즈',
    eventTarget: '뱅킹 회원',
    benefitType: '당첨후 지급',
  },
  {
    eventId: '114',
    eventName: '이벤트 3',
    eventStartDate: '2026-03-01',
    eventEndDate: '2026-03-31',
    eventStatus: '미게시',
    eventType: '룰렛',
    eventTarget: '증권 회원',
    benefitType: '혜택 없음',
  },
];

export const MOCK_EVENT_DETAILS: Record<string, EventDetailValues> = {
  '112': {
    eventName: 'KB GS Pay통장 만들고 스페셜 카드박스 응모하기',
    eventType: 'general',
    eventStatus: 'published',
    eventTarget: 'all',
    targetDescription: 'KB GS Pay통장 가입 고객',
    eventStartDate: '2026-05-18',
    eventEndDate: '2026-07-12',
    winnerAnnouncementDate: '2026-07-20',
    benefitType: 'immediate',
    useType: 'no_limit',
    marketingPushAgreement: true,
    agreementList: [],
    eventBanner: null,
    eventBannerDescription: 'KB GS Pay 통장 개설 이벤트 배너',
    buttonEvent: 'after_message',
    buttonName: '응모하기',
    externalLink: '',
    fcfsUse: '1',
    numberOfParticipants: '100',
    benefitList: '2',
    benefitAmount: '포켓몬카드 1박스',
    participationSteps: [
      'KB GS Pay통장 가입하기',
      '응모하기 버튼 누르기',
    ],
    prizeDescription: '매주 10명을 추첨하여 하단의 해당 포켓몬카드 1박스 증정',
    viewCount: 166,
  },
  '113': {
    eventName: '이벤트 2',
    eventType: 'quiz',
    eventStatus: 'published',
    eventTarget: 'banking',
    eventStartDate: '2026-02-01',
    eventEndDate: '2026-02-28',
    winnerAnnouncementDate: '2026-03-05',
    benefitType: 'after_win',
    useType: 'limit',
    marketingPushAgreement: false,
    agreementList: [],
    eventBanner: null,
    eventBannerDescription: '',
    buttonEvent: 'after_link',
    buttonName: '퀴즈 참여',
    externalLink: 'https://example.com/quiz',
    fcfsUse: '2',
    numberOfParticipants: '',
    benefitList: '2',
    benefitAmount: '기프티콘',
    participationSteps: [
      '퀴즈 이벤트 페이지 접속',
      '퀴즈 참여 버튼 클릭',
    ],
    prizeDescription: '정답자 중 추첨하여 기프티콘 증정',
    viewCount: 89,
  },
  '114': {
    eventName: '이벤트 3',
    eventType: 'roulette',
    eventStatus: 'unpublished',
    eventTarget: 'securities',
    eventStartDate: '2026-03-01',
    eventEndDate: '2026-03-31',
    winnerAnnouncementDate: '2026-04-05',
    benefitType: 'no_benefit',
    useType: 'no_limit',
    marketingPushAgreement: true,
    agreementList: [],
    eventBanner: null,
    eventBannerDescription: '',
    buttonEvent: 'after_message',
    buttonName: '룰렛 돌리기',
    externalLink: '',
    fcfsUse: '2',
    numberOfParticipants: '',
    benefitList: '1',
    benefitAmount: '',
    participationSteps: [
      '룰렛 이벤트 페이지 접속',
      '룰렛 돌리기 버튼 클릭',
    ],
    prizeDescription: '룰렛 참여 시 포인트 지급',
    viewCount: 42,
  },
};

export const EVENT_FORM_DEFAULT_VALUES: EventDetailValues = {
  eventName: '',
  eventType: 'general',
  eventStatus: 'published',
  eventTarget: 'all',
  eventStartDate: '',
  eventEndDate: '',
  winnerAnnouncementDate: '',
  benefitType: 'immediate',
  useType: 'no_limit',
  marketingPushAgreement: true,
  agreementList: [],
  eventBanner: null,
  eventBannerDescription: '',
  buttonEvent: 'after_message',
  buttonName: '',
  externalLink: '',
  fcfsUse: '1',
  numberOfParticipants: '',
  benefitList: '1',
  benefitAmount: '',
  participationSteps: [],
  prizeDescription: '',
  viewCount: 0,
};

export function findEventById(eventId: string): EventDetailValues | null {
  return MOCK_EVENT_DETAILS[eventId] ?? null;
}
