import { Routes, Route, Navigate } from "react-router-dom";
import VendorLogin from "../Pages/Vendor/VendorLogin/VendorLogin";
import VentorOtp from "../Pages/Vendor/VendorOtp/Otp";
import VendorLayout from "../Layout/VendorLayout";
import AddPackages from "../Pages/Vendor/AddPackage/AddPackages";
import VendorDashboard from "../Pages/Vendor/Dashboard/VendorDashboard";
import OrderDetails from "../Pages/Vendor/OrderDetails/OrderDetails";
import GetPackages from "../Pages/Vendor/GetPackage/GetPackages";
import GetCategory from "../Pages/Vendor/Category/GetCategory";
import UpdatePackage from "../Pages/Vendor/UpdatePackage/UpdatePackage";
import VendorInfo from "../Pages/Vendor/VendorInfo/VendorInfo";
import VendorSignupPage from "../Pages/Vendor/VendorSignup/VendorSignupPage";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import ForgotPasswordPage from "../Pages/Vendor/ForgotPassword/ForgotPasswordPage";
import VerifyOtpPage from "../Pages/Vendor/VerifyOtpPage/VerifyOtpPage";

export default function VendorRoute() {
  return (
    <div>
      <Routes>
        <Route path="/signup"element={ <ProtectedRoutes>   <VendorSignupPage /> </ProtectedRoutes>}/>
       <Route path="/login" element={   <ProtectedRoutes>     <VendorLogin />   </ProtectedRoutes> }/>
        <Route  path="/otp"  element={    <ProtectedRoutes>      <VentorOtp />    </ProtectedRoutes>  }/>

          <Route path="/forgot-password" element={ <ForgotPasswordPage />}/>
          <Route exact path="/verifyOtp" element={<VerifyOtpPage />} />


        <Route path="/" element={ <ProtectedRoutes> <VendorLayout /> </ProtectedRoutes> }>

          <Route exact index element={<VendorDashboard />} />
          <Route path="packages/add" element={<AddPackages />} />
          <Route path="packages" element={<GetPackages />} />
          <Route path="package/updates/:id" element={<UpdatePackage />} />
          <Route path="orders" element={<OrderDetails />} />
          <Route path="categorys" element={<GetCategory />} />
          <Route path="vendor-info" element={<VendorInfo />} />
        </Route>
        
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}





// eslint-disable-next-line react/prop-types
export function ProtectedRoutes({ children }) {
  let auth = JSON.parse(localStorage.getItem("vendor"));
  if (!auth) {
    if (
      location.pathname === "/vendor/otp" ||
      location.pathname === "/vendor/signup" ||
      location.pathname === "/vendor/login" ||   
      location.pathname === "/vendor/forgot-password"
      ) {
   
      return children;
    }else{

      return <Navigate to={"/vendor/login"} />;
    }

  } else {
    if (!auth.isVerified) {
      if (
        location.pathname === "/vendor/otp" ||
        location.pathname === "/vendor/signup" ||
        location.pathname === "/vendor/login" ||    
        location.pathname === "/vendor/forgot-password"
          
      ) {
        return children;
      } else {
        return <Navigate to={"/vendor/otp"} />;
      }
    } else {
      if (
        location.pathname === "/vendor/otp" ||
        location.pathname === "/vendor/signup" ||
        location.pathname === "/vendor/login"  

      ) {
        return <Navigate to={"/vendor"} />;
      } else return children;
    }
  }
}
