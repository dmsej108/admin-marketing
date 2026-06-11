import { SButton, SInput, SRadioGroup } from '@dmsej108/design-system'
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

type BenefitFormFields = {
  fcfsUse?: string;
  numberOfParticipants?: string;
  benefitList?: string;
  benefitAmount?: string;
};

type BenefitFormProps = {
  register: UseFormRegister<BenefitFormFields>;
  errors: FieldErrors<BenefitFormFields>;
  watch: UseFormWatch<BenefitFormFields>;
  setValue: UseFormSetValue<BenefitFormFields>;
};

export default function BenefitForm({ errors, watch, setValue }: BenefitFormProps) {
  const fcfsUseOptions = [
    { label: '사용', value: '1' },
    { label: '미사용', value: '2' },
  ];
  const benefitListOptions = [
    { label: '포인트 지급', value: '1' },
    { label: '상품 지급', value: '2' },
  ];

  return (
    <table className="table reg mt-10">
      <colgroup>
        <col style={{ width: '160px' }} />
        <col style={{ width: 'auto' }} />
        <col style={{ width: '160px' }} />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">선착순 설정<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td>
            <SRadioGroup
              name="fcfsUse"
              size="small"
              direction="horizontal"
              options={fcfsUseOptions}
              value={watch('fcfsUse') ?? '1'}
              onChange={(value) => setValue('fcfsUse', value, { shouldValidate: true })}
            />
          </td>
          {watch('fcfsUse') === '1' && (
            <>
              <th scope="row">선착순 인원 설정<span className="ess"><span className="offscreen">필수입력</span></span></th>
              <td>
                <SInput
                  name="numberOfParticipants"
                  placeholder="선착순 인원 설정을 입력해주세요."
                  type="number"
                  suffix={`명`}
                  size="small"
                  value={watch('numberOfParticipants') ?? ''}
                  onChange={(e) => setValue('numberOfParticipants', e.target.value, { shouldValidate: true })}
                />
                {errors.numberOfParticipants && (
                  <div className="input-guide error"><span className="error">{errors.numberOfParticipants.message as string}</span></div>
                )}
              </td>
            </>
          )}
        </tr>
        <tr>
          <th scope="row">지급 혜택<span className="ess"><span className="offscreen">필수입력</span></span></th>
          <td colSpan={3}>
            <div>
              <SRadioGroup
                name="benefitList"
                size="small"
                direction="horizontal"
                options={benefitListOptions}
                value={watch('benefitList') ?? '1'}
                onChange={(value) => setValue('benefitList', value, { shouldValidate: true })}
              />
              {errors.benefitList && (
                <div className="input-guide error"><span className="error">{errors.benefitList.message as string}</span></div>
              )}
            </div>
            <div className="mt-10">
              <SInput
                name="benefitAmount"
                placeholder="지급 혜택을 입력해주세요."
                size="small"
                value={watch('benefitAmount') ?? ''}
                onChange={(e) => setValue('benefitAmount', e.target.value, { shouldValidate: true })}
              />
            </div>
            <div className="table-util mt-10">
              <SButton variant="outline" size="small" className="mr-10">추가</SButton>
              <SButton variant="outline" size="small">삭제</SButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
