import { Navigate, Route, Routes } from 'react-router-dom'
import SEventDetailPage from '@/pages/EventDetailPage'
import SEventListPage from '@/pages/EventListPage'
import SEventRegistPage from '@/pages/EventRegistPage'

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/marketing/event" replace />} />
      <Route path="/marketing/event" element={<SEventListPage />} />
      <Route path="/marketing/event/regist" element={<SEventRegistPage />} />
      <Route path="/marketing/event/detail/:eventId" element={<SEventDetailPage />} />
    </Routes>
  )
}

export default App
