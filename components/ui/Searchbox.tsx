import { useState, type ChangeEvent, type ReactNode } from 'react'
import { SButton, SInput, SIcon, SDatePicker, SSelect } from '@dmsej108/design-system';

interface SearchboxProps {
  children?: ReactNode
  onDateChange?: (startDate: Date | null, endDate: Date | null) => void
}

const dateLists = [
  { label: '당일', value: '0' },
  { label: '1개월', value: '30' },
  { label: '3개월', value: '90' },
  { label: '6개월', value: '180' },
  { label: '1년', value: '365' },
];

export default function Searchbox({ children, onDateChange }: SearchboxProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleSearch = () => {
    console.log('조회');
  };

  const handleChangeDate = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newStartDate = new Date(new Date().setDate(new Date().getDate() - parseInt(value, 10)));
    setStartDate(newStartDate);
    onDateChange?.(newStartDate, endDate);
  };

  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date);
    onDateChange?.(date, endDate);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date);
    onDateChange?.(startDate, date);
  };

  return (
    <div className="ui-data-filter">
      <div className="form-item">
        <div className="item">
          <label>기간검색</label>
          <div className="flex align-center">
            <SSelect options={dateLists} size="small" className="mr-10" style={{ width: 100 }} onChange={handleChangeDate} />
            <SDatePicker size="small" onDateChange={handleChangeStartDate} />
            <div className="mr-10">~</div>
            <SDatePicker size="small" onDateChange={handleChangeEndDate} />
          </div>
        </div>
        <div className="item">
          <label>검색어</label>
          <div>
            <SInput
              placeholder="검색어를 입력하세요"
              size="small"
              style={{ width: 200 }}
            />
          </div>
        </div>
        <div className="btn-filter-set">
          <SButton variant="outline" leftIcon={<SIcon name="search" size="small" aria-hidden />} size="small" onClick={handleSearch}>
            조회
          </SButton>
        </div>
        {children}
      </div>
    </div>
  );
}
