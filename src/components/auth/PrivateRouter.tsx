import useUser from '@/hooks/auth/useUser'
import { Navigate } from 'react-router-dom'

function PrivateRouter({ children }: { children: React.ReactNode }) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

export default PrivateRouter
