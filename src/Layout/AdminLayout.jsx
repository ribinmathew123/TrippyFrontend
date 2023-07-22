import { Outlet } from "react-router-dom";
import Sidebar from '../Components/Layout/SideBar';

function AdminLayout() {
  return (
   
    <div className='flex'>
    <Sidebar />
      <Outlet />
  </div>
  
  );
}

export default AdminLayout;
