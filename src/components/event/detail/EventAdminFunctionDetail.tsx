import { STable } from '@dmsej108/design-system'
import FormTitle from '@/components/ui/FormTitle'
import type { EventDetailValues } from '@/data/event-data'
import { formatDisplayValue, getEventLabel } from '@/data/event-labels'

type EventAdminFunctionDetailProps = {
  data: EventDetailValues;
};

const functionColumns = [
  { key: 'buttonEvent', label: '버튼 이벤트' },
  { key: 'buttonName', label: '버튼 명' },
  { key: 'externalLink', label: '외부 링크', fullValue: true },
];

export default function EventAdminFunctionDetail({ data }: EventAdminFunctionDetailProps) {
  const tableData = {
    buttonEvent: getEventLabel('buttonEvent', data.buttonEvent),
    buttonName: formatDisplayValue(data.buttonName),
    externalLink: formatDisplayValue(data.externalLink),
  };

  return (
    <>
      <FormTitle title="기능 설정" style={{ marginTop: '20px' }} />
      <STable
        columns={functionColumns}
        data={tableData}
        columnsPerRow={2}
        bordered
        layout="fixed"
        className="mt-10"
      />
    </>
  );
}
