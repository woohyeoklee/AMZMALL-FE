import Router from '@components/router/Router'
import ScrollToTop from '@components/shared/ScrollToTop'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Router />
    </BrowserRouter>
  )
}

export default App
