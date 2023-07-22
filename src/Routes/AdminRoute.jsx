import {  Routes, Route,Navigate } from "react-router-dom";
import AdminLogin from "../Pages/Admin/Login/Login";
import AdminLayout from "../Layout/AdminLayout";
import AdminDashBoard from "../Pages/Admin/DashBoard/AdminDashBoard";
import UserList from "../Pages/Admin/UserList/UserList";
import VendorList from "../Pages/Admin/VendorList/VendorList";
import AddPlace from "../Pages/Admin/AddPlace/AddPlace";
import GetPlace from "../Pages/Admin/GetPlace/GetPlace";
import UpdatePlace from "../Pages/Admin/UpdatePlace/UpdatePlace";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

function AdminRoute() {
  return (
    <>
     <Routes>
        <Route path="/login" element={ <AdminLogin />} />
        <Route path="/" element={ <ProtectedRoute> <AdminLayout /></ProtectedRoute>}>
        <Route exact  index element={<AdminDashBoard />} />

          {/* <Route path="dashboard" element={<AdminDashBoard />} /> */}
          <Route path="users" element={<UserList />} />
          <Route path="vendors" element={<VendorList />} />
          <Route path="places/add" element={<AddPlace />} />
          <Route path="places" element={<GetPlace />} />
          <Route path="places/update/:id" element={<UpdatePlace />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
</>
  );
}

export default AdminRoute;


// eslint-disable-next-line react/prop-types
export function ProtectedRoute({ children }) {
  let auth = JSON.parse(localStorage.getItem("admin"))
  
  if (!auth) {
    return <Navigate to={"/admin/login"} />;
  }
 else return children;
    }
  
