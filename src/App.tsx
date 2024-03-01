import Router from '@components/router/Router'
import Navbar from '@components/shared/Navbar'
import ScrollToTop from '@components/shared/ScrollToTop'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Navbar />
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
