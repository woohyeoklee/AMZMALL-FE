import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { FormValues } from '@models/signin'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import { colors } from '@styles/colorPalette'

import useGoogleSignIn from '@/hooks/useGoogleSignIn'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

function Form({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) {
  const { signin } = useGoogleSignIn()

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const 제출가능한가 = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <div css={topContainerStyles}>
        <Text bold typography="t3">
          AMZMALL
        </Text>
        <Text typography="t5">신발을 선택하고 스타일을 완성하세요.</Text>
      </div>
      <TextField
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        onChange={handleFormValues}
        value={formValues.password}
      />

      <Spacing size={32} />

      <Button
        size="medium"
        disabled={제출가능한가 === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>

      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요? </Text>
        <Text bold typography="t7">
          회원가입하기
        </Text>
      </Link>

      <Spacing size={20} />
      <div css={snsFormStyles}>
        <Text bold typography="t5">
          SNS 계정으로 로그인
        </Text>
        <Button weak onClick={signin} css={googleButtonStyles}>
          <div className="flex gap-1">
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png"
              alt="google"
              width="20"
              height="20"
            />
            <Text color="blue" bold typography="t4">
              OOGLE 로그인
            </Text>
          </div>
        </Button>
      </div>
    </Flex>
  )
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`

const topContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const linkStyles = css`
  display: flex;
  flex-direction: column;
  text-align: center;

  & > span:hover {
    color: ${colors.orange};
  }
`

const snsFormStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const googleButtonStyles = css`
  width: 300px;
  height: 50px;
  display: flex;
  border: 1px solid ${colors.blue};
  justify-content: center;
  align-items: center;
`

export default Form
