import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { SButton } from '@dmsej108/design-system'
import FormTitle from '@/components/ui/FormTitle'
import DefaultForm from '@/components/event/regist/DefaultForm'
import FunctionForm from '@/components/event/regist/FunctionForm'
import BenefitForm from '@/components/event/regist/BenefitForm'
import { EVENT_FORM_DEFAULT_VALUES } from '@/data/event-data'
import { rules } from '@/lib/validate'
import type { SComponentBaseProps } from '@/types/base'

export interface SEventRegistPageProps extends SComponentBaseProps {}

const schema = yup.object().shape({
  eventName: rules.create('이벤트 제목').required(),
  eventType: rules.create('이벤트 유형').required(),
  eventStatus: rules.create('게시여부').required(),
  eventTarget: rules.create('이벤트 대상').required(),
  eventStartDate: yup.string().optional(),
  eventEndDate: yup.string().optional(),
  winnerAnnouncementDate: yup.string().optional(),
  benefitType: rules.create('혜택 구분').required(),
  useType: rules.create('참여제한').required(),
  marketingPushAgreement: yup.boolean().optional(),
  agreementList: yup.array().optional(),
  eventBanner: yup.mixed().nullable().optional(),
  eventBannerDescription: yup.string().optional(),
  buttonEvent: rules.create('버튼 이벤트').required(),
  buttonName: rules.create('버튼 명').required(),
  externalLink: yup.string().when('buttonEvent', {
    is: 'after_link',
    then: (s) => s.required('외부 링크은(는) 필수값입니다.').label('외부 링크'),
    otherwise: (s) => s.optional(),
  }),
  fcfsUse: rules.create('선착순 설정').required(),
  numberOfParticipants: yup.string().when('fcfsUse', {
    is: '1',
    then: (s) => s.required('선착순 인원 설정은(는) 필수값입니다.').label('선착순 인원 설정'),
    otherwise: (s) => s.optional(),
  }),
  benefitList: rules.create('지급 혜택').required(),
  benefitAmount: rules.create('지급 혜택').required(),
})

type FormValues = yup.InferType<typeof schema>

const EventRegistPage = (_props: SEventRegistPageProps) => {
  // region [Hooks]
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
  })
  // endregion

  // region [Privates]
  const setFileList = useCallback(
    (files: File[] | ((prev: File[]) => File[])) => {
      const currentFiles = (getValues('eventBanner') as File[] | null | undefined) ?? []
      const newFiles = typeof files === 'function' ? files(currentFiles) : files
      setValue('eventBanner', newFiles as File[], { shouldValidate: true })
    },
    [getValues, setValue],
  )
  // endregion

  // region [Events]
  const onSubmit = useCallback((data: FormValues) => {
    console.log(data)
  }, [])

  const onCancelClick = useCallback(() => {
    router.back()
  }, [router])
  // endregion

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tbl-wrap">
        <FormTitle title="기본 정보" />
        <DefaultForm
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          setFileList={setFileList}
        />

        <FormTitle title="기능 설정" style={{ marginTop: '20px' }} />
        <FunctionForm register={register} errors={errors} watch={watch} setValue={setValue} />

        <FormTitle title="혜택 정보" style={{ marginTop: '20px' }} />
        <BenefitForm register={register} errors={errors} watch={watch} setValue={setValue} />
      </div>
      <div className="btn-bottom-set flex justify-center">
        <SButton variant="outline" size="large" className="mr-10" type="button" onClick={onCancelClick}>
          취소
        </SButton>
        <SButton variant="primary" size="large" type="submit">
          저장
        </SButton>
      </div>
    </form>
  )
}

const SEventRegistPage = memo(EventRegistPage)
SEventRegistPage.displayName = 'SEventRegistPage'

export default SEventRegistPage
