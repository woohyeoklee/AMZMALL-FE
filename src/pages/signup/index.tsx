import { auth, store } from '@remote/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import Form from '@/components/signup/Form'
import { FormValues } from '@/models/signup'

function SignUpPage() {
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: name,
    })
    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }
    await setDoc(doc(collection(store, 'USER'), user.uid), newUser)
    navigate('/')
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default SignUpPage
