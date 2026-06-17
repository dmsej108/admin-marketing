// import FileUpload from '@/components/ui/FileUpload';
import { SButton, SChip, SCheckbox, SInput, SFileInput, SRadioGroup, SSelect, STextarea, SDatePicker } from '@dmsej108/design-system';
import { useState } from 'react';
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

type DefaultFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: UseFormWatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function DefaultForm({ register, errors, watch, setValue, setFileList }: DefaultFormProps) {
  const eventType = [
    { label: '일반', value: 'general' },
    { label: '퀴즈', value: 'quiz' },
    { label: '룰렛', value: 'roulette' },
    { label: '출석', value: 'attendance' },
    { label: '설문', value: 'survey' },
  ];

  const eventTarget = [
    { label: '모든 회원', value: 'all' },
    { label: '뱅킹 회원', value: 'banking' },
    { label: '증권 회원', value: 'securities' },
  ];

  const eventStatus = [
    { label: '게시', value: 'published' },
    { label: '미게시', value: 'unpublished' },
  ];

  const benefitType = [
    { label: '즉시 지급', value: 'immediate' },
    { label: '당첨후 지급', value: 'after_win' },
    { label: '혜택 없음', value: 'no_benefit' },
  ];

  const chipsList: { label: string; value: string }[] = [
    { label: 'KB 그룹1', value: 'banking' },
    { label: 'KB 그룹2', value: 'securities' },
  ];

  const [chips, setChips] = useState<{ label: string; value: string }[]>(chipsList);
  const [, setEventStartDate] = useState<Date | null>(null);
  const [, setEventEndDate] = useState<Date | null>(null);
  const [, setWinnerDate] = useState<Date | null>(null);

  const useTypeList: { label: string; value: string }[] = [
    { label: '참여 제한 없음', value: 'no_limit' },
    { label: '참여 제한 있음', value: 'limit' },
  ];

  const [selectedUseType, setSelectedUseType] = useState<string>('no_limit');

  return (
    <table className="table reg mt-10">
      <colgroup>
        <col style={{ width: '160px' }} />
        <col style={{ width: 'auto' }} />
        <col style={{ width: '160px' }} />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">제목<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <SInput type="text" size="small" placeholder="이벤트 제목을 입력해주세요." {...register('eventName')} />
            {errors.eventName && (
              <div className="input-guide error"><span className="error">{errors.eventName.message as string}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 유형<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SRadioGroup
              name="eventType"
              size="small"
              direction="horizontal"
              options={eventType}
              value={watch('eventType')}
              onChange={(value) => setValue('eventType', value, { shouldValidate: true })}
            />
            {errors.eventType && (
              <div className="input-guide error"><span className="error">{errors.eventType.message as string}</span></div>
            )}
          </td>
          <th scope="row">게시 여부<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SRadioGroup
              name="eventStatus"
              size="small"
              direction="horizontal"
              options={eventStatus}
              value={watch('eventStatus')}
              onChange={(value) => setValue('eventStatus', value, { shouldValidate: true })}
            />
            {errors.eventStatus && (
              <div className="input-guide error"><span className="error">{errors.eventStatus.message as string}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 대상<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <SRadioGroup
              name="eventTarget"
              size="small"
              direction="horizontal"
              options={eventTarget}
              value={watch('eventTarget')}
              onChange={(value) => setValue('eventTarget', value, { shouldValidate: true })}
            />
            {errors.eventTarget && (
              <div className="input-guide error"><span className="error">{errors.eventTarget.message as string}</span></div>
            )}
            <div className="mt-15">
              <SButton type="button" size="small" variant="outline" className="mr-10">회원그룹 추가</SButton>
              {chips.map((item) => (
                <SChip key={item.value} label={item.label} size="small" variant="primary" className="mr-5" onClose={() => setChips(prev => prev.filter(c => c.value !== item.value))} />
              ))}
            </div>
          
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 기간<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <div className="flex align-center">
              <div>
                <SDatePicker
                  size="small"
                  onDateChange={(date) => {
                    setEventStartDate(date);
                    setValue('eventStartDate', date ? date.toISOString().slice(0, 10) : '', { shouldValidate: true });
                  }}
                />
              </div>
              <div className="mr-10">~</div>
              <div>
                <SDatePicker
                  size="small"
                  onDateChange={(date) => {
                    setEventEndDate(date);
                    setValue('eventEndDate', date ? date.toISOString().slice(0, 10) : '', { shouldValidate: true });
                  }}
                />
              </div>
            </div>
          </td>
          <th scope="row">당첨자 발표일<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SDatePicker
              size="small"
              onDateChange={(date) => {
                setWinnerDate(date);
                setValue('winnerAnnouncementDate', date ? date.toISOString().slice(0, 10) : '', { shouldValidate: true });
              }}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">혜택 구분<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SRadioGroup
              name="benefitType"
              size="small"
              direction="horizontal"
              options={benefitType}
              value={watch('benefitType')}
              onChange={(value) => setValue('benefitType', value, { shouldValidate: true })}
            />
            {errors.benefitType && (
              <div className="input-guide error"><span className="error">{errors.benefitType.message as string}</span></div>
            )}
          </td>
          <th scope="row">참여제한<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SSelect
              name="useType"
              size="small"
              options={useTypeList}
              value={selectedUseType}
              onChange={(e) => {
                setSelectedUseType(e.target.value);
                setValue('useType', e.target.value, { shouldValidate: true });
              }}
            />
            {errors.useType && (
              <div className="input-guide error"><span className="error">{errors.useType.message as string}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">마케팅 정보 PUSH<br />수신동의</th>
          <td colSpan={3}>
            <div className="flex align-center">
              <SCheckbox
                label="마케팅 정보 PUSH 수신동의"
                size="small"
                checked={!!watch('marketingPushAgreement')}
                onChange={(checked) => setValue('marketingPushAgreement', checked, { shouldValidate: true })}
              />
            </div>
            {errors.marketingPushAgreement ? (
              <div className="input-guide error"><span className="error">{errors.marketingPushAgreement.message as string}</span></div>
            ) : (
              <span className="input-guide">&apos;필수&apos; 선택 시 마케팅 정보(PUSH) 수신에 동의한 회원만 이벤트 참여가 가능합니다.</span>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">이벤트 배너</th>
          <td>
            <SFileInput
              placeholder="이벤트 배너를 선택해주세요."
              size="small"
              accept={'.jpg, .jpeg, .png, .gif'}
              maxSize={10 * 1024 * 1024}
              onChange={(file) => {
                setFileList(file);
                setValue('eventBanner', file, { shouldValidate: true });
              }}
            />
            {/* <FileUpload fileList={watch('eventBanner')} setFileList={setFileList} /> */}
            {errors.eventBanner && (
              <div className="input-guide error"><span className="error">{errors.eventBanner.message as string}</span></div>
            )}
          </td>
          <th scope="row">이미지 설명</th>
          <td>
            <STextarea
              name="eventBannerDescription"
              placeholder="이벤트 배너 설명을 입력해주세요."
              size="small"
              value={watch('eventBannerDescription') ?? ''}
              onChange={(e) => setValue('eventBannerDescription', e.target.value, { shouldValidate: true })}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
