import './App.css'
import UserRoute from './Routes/UserRoute'
import AdminRoute from './Routes/AdminRoute'
import VendorRoute from './Routes/VendorRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/*" element={  <UserRoute /> } />
        <Route path="/admin/*" element={ <AdminRoute /> } />
        <Route path="/vendor/*" element={ <VendorRoute /> } />
      </Routes>
    </BrowserRouter>
    
     </>
  )
}
export default App
