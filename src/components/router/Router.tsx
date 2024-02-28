import { Navigate, Route, Routes } from 'react-router-dom'

import DrawPage from '@/pages/draw/[id]'
import DrawListPage from '@/pages/my/drawList'
import HomePage from '@pages/home'
import MyPage from '@pages/my'
import LikePage from '@pages/my/like'
import ProductDetailPage from '@pages/product/[id]'
import SignInPage from '@pages/signin'
import SignUpPage from '@pages/signup'
import TestPage from '@pages/test'

import PrivateRouter from '@components/auth/PrivateRouter'

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
      <Route path="/test" element={<TestPage />} />
    </Routes>
  )
}
