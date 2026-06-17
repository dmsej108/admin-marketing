import { STable } from '@dmsej108/design-system'
import FormTitle from '@/components/ui/FormTitle'
import type { EventDetailValues } from '@/data/event-data'
import {
  formatDisplayValue,
  formatEventBanner,
  formatEventPeriod,
  formatMarketingPushAgreement,
  getEventLabel,
} from '@/data/event-labels'

type EventAdminDefaultDetailProps = {
  eventId: string;
  data: EventDetailValues;
};

const basicColumns = [
  { key: 'eventId', label: '이벤트 ID' },
  { key: 'viewCount', label: '조회수' },
  { key: 'eventName', label: '제목', fullValue: true },
  { key: 'eventType', label: '이벤트 유형' },
  { key: 'eventStatus', label: '게시 여부' },
  { key: 'eventTarget', label: '이벤트 대상', fullValue: true },
  { key: 'eventPeriod', label: '이벤트 기간' },
  { key: 'winnerAnnouncementDate', label: '당첨자 발표일' },
  { key: 'benefitType', label: '혜택 구분' },
  { key: 'useType', label: '참여제한' },
  { key: 'marketingPushAgreement', label: '마케팅 정보 PUSH 수신동의', fullValue: true },
  { key: 'eventBanner', label: '이벤트 배너' },
  { key: 'eventBannerDescription', label: '이미지 설명' },
];

export default function EventAdminDefaultDetail({ eventId, data }: EventAdminDefaultDetailProps) {
  const targetLabel = data.targetDescription ?? getEventLabel('eventTarget', data.eventTarget);

  const tableData = {
    eventId,
    viewCount: data.viewCount.toLocaleString(),
    eventName: data.eventName,
    eventType: getEventLabel('eventType', data.eventType),
    eventStatus: getEventLabel('eventStatus', data.eventStatus),
    eventTarget: targetLabel,
    eventPeriod: formatEventPeriod(data.eventStartDate, data.eventEndDate),
    winnerAnnouncementDate: formatDisplayValue(data.winnerAnnouncementDate),
    benefitType: getEventLabel('benefitType', data.benefitType),
    useType: getEventLabel('useType', data.useType),
    marketingPushAgreement: formatMarketingPushAgreement(data.marketingPushAgreement),
    eventBanner: formatEventBanner(data.eventBanner),
    eventBannerDescription: formatDisplayValue(data.eventBannerDescription),
  };

  return (
    <>
      <FormTitle title="기본 정보" />
      <STable
        columns={basicColumns}
        data={tableData}
        columnsPerRow={2}
        bordered
        layout="fixed"
        className="mt-10"
      />
    </>
  );
}
