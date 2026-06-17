import { memo, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import type { ColDef, GridReadyEvent, RowClickedEvent } from 'ag-grid-community'
import { SButton, SPagination, SSelect } from '@dmsej108/design-system'
import Searchbox from '@/components/ui/Searchbox'
import { AgGridReact } from '@/lib/config/ag-grid'
import type { SComponentBaseProps } from '@/types/base'
import { MOCK_EVENT_LIST } from '@/data/event-data'

export interface SEventListPageProps extends SComponentBaseProps {}

const listCountOptions = [
  { label: '10개씩 보기', value: '10' },
  { label: '20개씩 보기', value: '20' },
  { label: '30개씩 보기', value: '30' },
  { label: '40개씩 보기', value: '40' },
]

const EventListPage = ({ className }: SEventListPageProps) => {
  // region [Hooks]
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [colDefs] = useState<ColDef[]>([
    { field: 'eventId', headerName: '이벤트ID', width: 100, cellClass: 'centered' },
    { field: 'eventName', headerName: '이벤트명', width: 450 },
    { field: 'eventStartDate', headerName: '이벤트 시작일', width: 150, cellClass: 'centered' },
    { field: 'eventEndDate', headerName: '이벤트 종료일', width: 150, cellClass: 'centered' },
    { field: 'eventStatus', headerName: '게시 여부', width: 150, cellClass: 'centered' },
    { field: 'eventType', headerName: '이벤트 유형', width: 150, cellClass: 'centered' },
    { field: 'eventTarget', headerName: '이벤트 대상', width: 150, cellClass: 'centered' },
    { field: 'benefitType', headerName: '혜택 구분', width: 150, cellClass: 'centered' },
  ])
  const rowData = useMemo(() => MOCK_EVENT_LIST, [])
  const cntPerPage = 10
  const itemCount = 200
  // endregion

  // region [Styles]
  const rootClass = useMemo(() => {
    const clazz: string[] = ['tbl-wrap']
    if (className) clazz.push(className)
    return clazz.join(' ')
  }, [className])
  // endregion

  // region [Events]
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit()
  }, [])

  const onRowClicked = useCallback(
    (event: RowClickedEvent) => {
      const eventId = event.data?.eventId
      if (eventId) {
        router.push(`/marketing/event/detail/${eventId}`)
      }
    },
    [router],
  )

  const onChangedPage = useCallback((pageNo: number) => {
    setCurrentPage(pageNo)
  }, [])

  const onRegistClick = useCallback(() => {
    router.push('/marketing/event/regist')
  }, [router])
  // endregion

  return (
    <div className={rootClass}>
      <Searchbox />
      <div className="table-util flex space-between">
        <div className="flex align-end">
          <span className="table-total">
            조회결과 총 <strong>{rowData.length}</strong>건
          </span>
        </div>
        <div className="btn-set-m flex align-end">
          <SSelect options={listCountOptions} size="small" style={{ width: 100 }} />
          <SButton variant="primary" size="small" onClick={onRegistClick}>
            이벤트 등록
          </SButton>
        </div>
      </div>
      <div className="ag-theme">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          onRowClicked={onRowClicked}
          rowStyle={{ cursor: 'pointer' }}
        />
        <div className="pagination">
          <SPagination
            itemCount={itemCount}
            cntPerPage={cntPerPage}
            currentPage={currentPage}
            onChangedPage={onChangedPage}
          />
        </div>
      </div>
    </div>
  )
}

const SEventListPage = memo(EventListPage)
SEventListPage.displayName = 'SEventListPage'

export default SEventListPage
