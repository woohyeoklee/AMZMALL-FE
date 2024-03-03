import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

import { Suspense } from 'react'

const DrawPage = lazy(() => import('@/pages/draw/[id]'))
const DrawDonePage = lazy(() => import('@/pages/draw/done'))
const HomePage = lazy(() => import('@pages/home'))
const MyPage = lazy(() => import('@pages/my'))
const LikePage = lazy(() => import('@pages/my/like'))
const ProductDetailPage = lazy(() => import('@pages/product/[id]'))
const SignInPage = lazy(() => import('@pages/signin'))
const SignUpPage = lazy(() => import('@pages/signup'))
const TestPage = lazy(() => import('@pages/test'))
const DrawListPage = lazy(() => import('@/pages/my/drawList'))
const PrivateRouter = lazy(() => import('@components/auth/PrivateRouter'))

export default function Router() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route
        path="/my"
        element={
          <PrivateRouter>
            <MyPage />
          </PrivateRouter>
        }
      />
      <Route
        path="/my/like"
        element={
          <PrivateRouter>
            <LikePage />
          </PrivateRouter>
        }
      />
      <Route
        path="/my/drawList"
        element={
          <PrivateRouter>
            <DrawListPage />
          </PrivateRouter>
        }
      />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/draw/:id"
        element={
          <PrivateRouter>
            <DrawPage />
          </PrivateRouter>
        }
      />
      <Route
        path="/draw/done"
        element={
          <PrivateRouter>
            <DrawDonePage />
          </PrivateRouter>
        }
      />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  )
}
