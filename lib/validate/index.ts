import * as yup from 'yup';

// 공통 메시지 포맷
const messages = {
  required: '${label}은(는) 필수값입니다.',
  min: '${label}은(는) ${min}자 이상이어야 합니다.',
  max: '${label}은(는) ${max}자까지 입력 가능합니다.',
  email: '올바른 이메일 형식이 아닙니다.',
  phone: '올바른 전화번호 형식이 아닙니다.',
  passwordFormat: {
    letter: '영문을 포함해야 합니다.',
    number: '숫자를 포함해야 합니다.',
  },
  filelength: '파일은 최소 1개 이상 첨부해야 합니다.',
};

// 기본 규칙 생성 함수 타입 정의
type CreateRuleReturn = {
  required: () => yup.StringSchema;
  min: (min: number) => yup.StringSchema;
  fileLength: () => yup.ArraySchema<File[], yup.AnyObject>;
};

const createRule = (label: string): CreateRuleReturn => ({
  required: () =>
    yup
      .string()
      .required(messages.required)
      .label(label),

  min: (min: number) =>
    yup
      .string()
      .required(messages.required)
      .min(min, messages.min)
      .label(label),
  fileLength: () =>
    yup
      .array()
      .required(messages.required)
      .min(1, messages.filelength)
      .label(label),
});

// Validation 규칙 정의
export const rules = {
  // 아이디 규칙
  id: yup
    .string()
    .required(messages.required)
    .min(4, messages.min)
    .label('아이디'),

  // 비밀번호 규칙
  password: yup
    .string()
    .required(messages.required)
    .min(8, messages.min)
    .matches(/[a-zA-Z]/, messages.passwordFormat.letter)
    .matches(/[0-9]/, messages.passwordFormat.number)
    .label('비밀번호'),

  // 이메일 규칙
  email: yup
    .string()
    .required(messages.required)
    .email(messages.email)
    .label('이메일'),

  // 이름 규칙
  name: yup
    .string()
    .required(messages.required)
    .min(2, messages.min)
    .label('이름'),

  // 전화번호 규칙
  phone: yup
    .string()
    .required(messages.required)
    .matches(/^[0-9]{10,11}$/, messages.phone)
    .label('전화번호'),

  // 커스텀 규칙 생성 함수
  create: createRule,
};
