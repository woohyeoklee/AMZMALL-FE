import AuthGuard from '@components/auth/AuthGuard'
import { Layout } from '@components/layout/Layout'
import Router from '@components/router/Router'
import Navbar from '@components/shared/Navbar'
import ScrollToTop from '@components/shared/ScrollToTop'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

import useLoadKakao from './hooks/useLoadKakao'

function App() {
  useLoadKakao()

  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <AuthGuard>
          <Layout>
            <ScrollToTop />
            <Navbar />
            <Router />
          </Layout>
        </AuthGuard>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
