import Router from '@components/router/Router'
import Navbar from '@components/shared/Navbar'
import ScrollToTop from '@components/shared/ScrollToTop'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Router />
    </BrowserRouter>
  )
}

export default App
