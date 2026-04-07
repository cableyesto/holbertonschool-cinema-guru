import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import AppTest from './AppTest.jsx'
// import AppTest2 from './AppTest2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AppTest />
  </StrictMode>,
)
