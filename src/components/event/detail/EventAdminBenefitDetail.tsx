import { useMemo } from 'react'
import { STable } from '@dmsej108/design-system'
import FormTitle from '@/components/ui/FormTitle'
import type { EventDetailValues } from '@/data/event-data'
import { formatDisplayValue, getEventLabel } from '@/data/event-labels'

type EventAdminBenefitDetailProps = {
  data: EventDetailValues;
};

function renderParticipationSteps(value: unknown) {
  const steps = value as string[];
  if (steps.length === 0) return '-';

  return (
    <ol className="event-admin-detail__steps">
      {steps.map((step, index) => (
        <li key={`${step}-${index}`}>{step}</li>
      ))}
    </ol>
  );
}

export default function EventAdminBenefitDetail({ data }: EventAdminBenefitDetailProps) {
  const tableData = {
    fcfsUse: getEventLabel('fcfsUse', data.fcfsUse),
    numberOfParticipants: formatDisplayValue(data.numberOfParticipants),
    benefitList: getEventLabel('benefitList', data.benefitList),
    benefitAmount: formatDisplayValue(data.benefitAmount),
    participationSteps: data.participationSteps,
    prizeDescription: formatDisplayValue(data.prizeDescription),
  };

  const benefitColumns = useMemo(() => {
    const fcfsColumns =
      data.fcfsUse === '1'
        ? [
            { key: 'fcfsUse', label: '선착순 설정' },
            { key: 'numberOfParticipants', label: '선착순 인원 설정' },
          ]
        : [{ key: 'fcfsUse', label: '선착순 설정', fullValue: true }];

    return [
      ...fcfsColumns,
      {
        key: 'benefitList',
        label: '지급 혜택',
        fullValue: true,
        render: (value: unknown, row: Record<string, unknown>) => (
          <>
            <div>{value as string}</div>
            <div className="mt-10">{row.benefitAmount as string}</div>
          </>
        ),
      },
      {
        key: 'participationSteps',
        label: '참여 방법',
        fullValue: true,
        render: renderParticipationSteps,
      },
      { key: 'prizeDescription', label: '경품 안내', fullValue: true },
    ];
  }, [data.fcfsUse]);

  return (
    <>
      <FormTitle title="혜택 정보" style={{ marginTop: '20px' }} />
      <STable
        columns={benefitColumns}
        data={tableData}
        columnsPerRow={2}
        bordered
        layout="fixed"
        className="mt-10"
      />
    </>
  );
}
