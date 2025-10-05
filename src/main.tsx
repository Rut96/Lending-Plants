import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout/MainLayout'
import Home from './components/pages/Home/Home'
import Plants from './components/pages/Plants/Plants'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="plants" element={<Plants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
