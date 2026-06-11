import { memo, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SButton, STab } from '@dmsej108/design-system'
import EventAdminDetail from '@/components/event/detail/EventAdminDetail'
import EventCustomerPreview from '@/components/event/detail/EventCustomerPreview'
import { findEventById } from '@/data/event-data'
import type { SComponentBaseProps } from '@/types/base'
import '@/styles/admin.css'

export interface SEventDetailPageProps extends SComponentBaseProps {}

const EVENT_DETAIL_TABS = [
  { label: '어드민', value: 'admin' },
  { label: '사용자', value: 'customer' },
] as const

const EventDetailPage = (_props: SEventDetailPageProps) => {
  // region [Hooks]
  const navigate = useNavigate()
  const { eventId = '' } = useParams<{ eventId: string }>()
  const eventDetail = findEventById(eventId)
  const [activeTab, setActiveTab] = useState<string>(EVENT_DETAIL_TABS[0].value)
  // endregion

  // region [Events]
  const onDelete = useCallback(() => {
    if (window.confirm('이벤트를 삭제하시겠습니까?')) {
      console.log('delete', eventId)
      alert('삭제 (목업)')
      navigate('/marketing/event')
    }
  }, [eventId, navigate])

  const onEdit = useCallback(() => {
    alert('수정 페이지는 추후 구현 예정입니다. (목업)')
  }, [])

  const onListClick = useCallback(() => {
    navigate('/marketing/event')
  }, [navigate])
  // endregion

  if (!eventDetail) {
    return (
      <div className="tbl-wrap">
        <div className="ui-title-3">
          <h3>이벤트를 찾을 수 없습니다.</h3>
        </div>
        <p className="mt-10">요청하신 이벤트 ID({eventId})에 해당하는 데이터가 없습니다.</p>
        <div className="btn-bottom-set flex justify-center mt-20">
          <SButton variant="primary" size="large" onClick={onListClick}>
            목록으로
          </SButton>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="tbl-wrap event-detail-page">
        <STab
          tabs={[...EVENT_DETAIL_TABS]}
          value={activeTab}
          onChange={setActiveTab}
          variant="filled"
          className="event-detail-page__tabs"
        />

        {activeTab === 'admin' && <EventAdminDetail eventId={eventId} data={eventDetail} />}
        {activeTab === 'customer' && <EventCustomerPreview data={eventDetail} />}
      </div>

      <div className="btn-bottom-set flex justify-center">
        <SButton variant="outline" size="large" className="mr-10" type="button" onClick={onListClick}>
          목록
        </SButton>
        <SButton variant="secondary" size="large" className="mr-10" type="button" onClick={onDelete}>
          삭제
        </SButton>
        <SButton variant="primary" size="large" type="button" onClick={onEdit}>
          수정
        </SButton>
      </div>
    </>
  )
}

const SEventDetailPage = memo(EventDetailPage)
SEventDetailPage.displayName = 'SEventDetailPage'

export default SEventDetailPage
