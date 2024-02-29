import { Option, Term } from '@models/draw'

export const 약관목록 = [
  {
    id: '01',
    title: '상품구매 관련 안내 및 필수 동의',
  },
  {
    id: '02',
    title: '(필수) 개인정보 요약동의서',
    link: 'https://github.com/AWS-Cloud-3rd-Project',
  },
] as Term[]

export const 사이즈옵션 = [
  { label: '250', value: '250' },
  { label: '260', value: '260' },
  { label: '270', value: '270' },
  { label: '280', value: '280' },
] as Option[]

export const 배송옵션 = [
  { label: '직접 수령', value: '직접 수령' },
  { label: '택배 수령', value: '택배 수령' },
] as Option[]

export const 결제옵션 = [
  { label: '일반카드결제', value: '일반카드결제' },
  { label: '카카오페이', value: '카카오페이' },
] as Option[]
