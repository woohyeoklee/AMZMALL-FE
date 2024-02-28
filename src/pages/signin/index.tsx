import { useAlertContext } from '@/contexts/AlertContext'
import Form from '@components/signin/Form'
import { FormValues } from '@models/signin'
import { auth } from '@remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function SignInPage() {
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues
      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/invalid-credential') {
            open({
              title: '이메일 및 패스워드를 다시 확인해주세요',
              onButtonClick: () => {
                //do something
              },
            })
            return
          }
        }
        open({
          title: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {
            //do something
          },
        })
      }
    },
    [open],
  )

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignInPage
