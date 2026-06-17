import type { EventDetailValues } from './event-data';

const LABEL_MAP: Record<string, Record<string, string>> = {
  eventType: {
    general: '일반',
    quiz: '퀴즈',
    roulette: '룰렛',
    attendance: '출석',
    survey: '설문',
  },
  eventStatus: {
    published: '게시',
    unpublished: '미게시',
  },
  eventTarget: {
    all: '모든 회원',
    banking: '뱅킹 회원',
    securities: '증권 회원',
  },
  benefitType: {
    immediate: '즉시 지급',
    after_win: '당첨후 지급',
    no_benefit: '혜택 없음',
  },
  useType: {
    no_limit: '참여 제한 없음',
    limit: '참여 제한 있음',
  },
  buttonEvent: {
    after_message: '참여 후 메시지',
    after_link: '참여 후 외부 링크',
  },
  fcfsUse: {
    '1': '사용',
    '2': '미사용',
  },
  benefitList: {
    '1': '포인트 지급',
    '2': '상품 지급',
  },
};

export function getEventLabel(field: keyof typeof LABEL_MAP, value: string): string {
  return LABEL_MAP[field][value] ?? value;
}

export function formatEventPeriod(startDate: string, endDate: string): string {
  if (!startDate && !endDate) return '-';
  if (!endDate) return startDate;
  if (!startDate) return endDate;
  return `${startDate} ~ ${endDate}`;
}

export function formatEventPeriodDot(startDate: string, endDate: string): string {
  const format = (value: string) => {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${year}.${month}.${day}`;
  };

  const start = format(startDate);
  const end = format(endDate);
  if (!start && !end) return '-';
  if (!end) return start;
  if (!start) return end;
  return `${start} ~ ${end}`;
}

export function formatEventPeriodKorean(startDate: string, endDate: string): string {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const format = (value: string) => {
    if (!value) return '';
    const date = new Date(`${value}T00:00:00`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const week = dayLabels[date.getDay()];
    return `${year}.${month}.${day}(${week})`;
  };

  const start = format(startDate);
  const end = format(endDate);
  if (!start && !end) return '-';
  if (!end) return start;
  if (!start) return end;
  return `${start} ~ ${end}`;
}

export function getEventStatusBadge(data: {
  eventStatus: string;
  eventEndDate: string;
}): { label: string; tone: 'closing' | 'live' | 'draft' } | null {
  if (data.eventStatus === 'unpublished') {
    return { label: '미게시', tone: 'draft' };
  }

  const endDate = data.eventEndDate ? new Date(data.eventEndDate) : null;
  if (endDate) {
    const diffDays = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 7) {
      return { label: '마감임박', tone: 'closing' };
    }
  }

  return { label: '진행중', tone: 'live' };
}

export function formatDisplayValue(value: string | null | undefined): string {
  return value?.trim() ? value : '-';
}

export function formatMarketingPushAgreement(agreed: boolean): string {
  return agreed ? '필수' : '선택';
}

export function formatEventBanner(eventBanner: EventDetailValues['eventBanner']): string {
  if (!eventBanner?.length) return '등록된 배너 없음';
  return eventBanner.map((file) => file.name).join(', ');
}

export function formatBenefitAmount(benefitList: string, benefitAmount: string): string {
  const typeLabel = getEventLabel('benefitList', benefitList);
  if (!benefitAmount?.trim()) return typeLabel;
  return `${typeLabel} / ${benefitAmount}`;
}
