import { SInput, SSelect } from '@dmsej108/design-system'
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type FunctionFormFields = {
  buttonEvent?: string;
  buttonName?: string;
  externalLink?: string;
};

type FunctionFormProps = {
  register: UseFormRegister<FunctionFormFields>;
  errors: FieldErrors<FunctionFormFields>;
  watch: UseFormWatch<FunctionFormFields>;
  setValue: UseFormSetValue<FunctionFormFields>;
};

export default function FunctionForm({ errors, watch, setValue }: FunctionFormProps) {
  const buttonEventList = [
    { label: '참여 후 메시지', value: 'after_message' },
    { label: '참여 후 외부 링크', value: 'after_link' },
  ];

  const selectedButtonEvent = watch('buttonEvent') ?? 'after_message';

  return (
    <table className="table reg mt-10">
      <colgroup>
        <col style={{width: '160px'}} />
        <col style={{width: 'auto'}} />
        <col style={{width: '160px'}} />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">버튼 이벤트<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SSelect
              name="buttonEvent"
              size="small"
              options={buttonEventList}
              value={selectedButtonEvent}
              onChange={(e) => {
                const value = e.target.value;
                setValue('buttonEvent', value, { shouldValidate: true });
              }}
            />
            {errors.buttonEvent && (
              <div className="input-guide error"><span className="error">{errors.buttonEvent.message as unknown as string}</span></div>
            )}
          </td>
          <th scope="row">버튼 명<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SInput
              name="buttonName"
              placeholder="버튼 명을 입력해주세요."
              size="small"
              value={watch('buttonName') ?? ''}
              onChange={(e) => setValue('buttonName', e.target.value, { shouldValidate: true })}
            />
            <span className="input-guide">App에서 버튼에 표기할 버튼 명을 입력하십시오. (예: 참여하기)</span>
            {errors.buttonName && (
              <div className="input-guide error"><span className="error">{errors.buttonName.message as unknown as string}</span></div>
            )}
          </td>
        </tr>
        <tr>
          <th scope="row">외부 링크<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <SInput
              name="externalLink"
              placeholder="외부 링크를 입력해주세요."
              size="small"
              value={watch('externalLink') ?? ''}
              onChange={(e) => setValue('externalLink', e.target.value, { shouldValidate: true })}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
