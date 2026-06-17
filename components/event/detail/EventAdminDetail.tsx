import type { EventDetailValues } from '@/data/event-data'
import EventAdminBenefitDetail from './EventAdminBenefitDetail';
import EventAdminDefaultDetail from './EventAdminDefaultDetail';
import EventAdminFunctionDetail from './EventAdminFunctionDetail';

type EventAdminDetailProps = {
  eventId: string;
  data: EventDetailValues;
};

export default function EventAdminDetail({ eventId, data }: EventAdminDetailProps) {
  return (
    <div className="event-admin-detail">
      <EventAdminDefaultDetail eventId={eventId} data={data} />
      <EventAdminFunctionDetail data={data} />
      <EventAdminBenefitDetail data={data} />
    </div>
  );
}
