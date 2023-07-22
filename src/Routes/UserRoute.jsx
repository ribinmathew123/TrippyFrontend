  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import UserHome from "../Pages/User/userHome";
  import UserLoginPage from "../Pages/User/Login/Login";
  import Otp from "../Pages/User/OtpVerification/otp";
  import SearchPackageData from "../Components/Search Package/searchPackage";
  import GetAllPlace from "../Pages/User/All Place/GetAllPlace";
  import BookPage from "../Components/Booking/BookPage";
  import SuccessPage from "../Components/Booking/SuccessPage";
  import AllPackage from "../Pages/User/AllPackage/AllPackage";
  import Orderpage from "../Pages/User/OrderPage/Orderpage";
  import OfferPackage from "../Pages/User/offerPage/OfferPackage";
  import PlaceContactInfo from "../Pages/User/PlaceContact/PlaceContact";
  import PlaceLayout from "../Layout/PlaceLayout";
  import PlaceAboutPage from "../Pages/User/PlaceAboutPage/PlaceAboutPage";
  import WeatherInfo from "../Pages/User/WeatherInfo/WeatherInfo";
  import ForgotPassword from "../Pages/User/ForgetPassword/ForgetPassword";
  import ResetOtp from "../Components/User/ForgotPassword/ResetOtp";
  import ProfileLay from "../Pages/User/Profile/ProfileLay";
  import ProfileInfo from "../Pages/User/ProfileInfo/ProfileInfo";
  import PasswordChange from "../Pages/User/ProfilePassword/PasswordChange";
  import UserSignupPage from "../Pages/User/UserSignupPage/UserSignupPage";
  import OrderData from "../Pages/User/OrderPage/OrderData";
  import PaymentErrorPage from "../Pages/User/paymentFailedPage/PaymentErrorPage";
  import OrderReview from "../Components/User/ordrPage/OrderReview";
  import ErrorPage from "../Components/ErrorPage/ErrorPage";
  // import { ProtectedRouter } from "../Util/ProtectedRouter/user/ProtectedRouter";

  export default function UserRoute() {
    return (
      <div>
          <Routes>
            
            <Route exact path="/" element={<UserHome />} />
            <Route path="/signup" element={<UserSignupPage />}></Route>
            <Route path="/login" element={<UserLoginPage />}></Route>
            <Route exact path="/otp" element={ <ProtectedRoute> <Otp /></ProtectedRoute> }/>
            <Route exact path="/package" element={<SearchPackageData />} />
            <Route exact path="/place" element={<GetAllPlace />} />
            <Route exact path="/allPackage" element={<AllPackage />} />
            <Route exact path="/success/:orderId" element={<SuccessPage />} />
            <Route exact path="/payment-failed" element={<PaymentErrorPage />} />
            <Route exact path="/verifyOtp" element={<ResetOtp />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/bookPage" element={<BookPage />} />
            <Route  exact path="/offerPackage/:offerPercentage"element={<OfferPackage />}/>

            <Route exact path="/placeDetails/:placeId" element={<PlaceLayout />}>
              <Route exact path="about" element={<PlaceAboutPage />} />
              <Route exact path="weather" element={<WeatherInfo />} />
              <Route exact path="contact" element={<PlaceContactInfo />} />
            </Route>

            <Route exact path="/profile"element={ <ProtectedRoute>  <ProfileLay /></ProtectedRoute>  }>
              <Route exact  index element={<ProfileInfo />} />
              <Route exact path="password" element={<PasswordChange />} />
              <Route exact path="order" element={<Orderpage />} />
              <Route exact path="order-info" element={<OrderData />} />
              <Route exact path="order-review" element={<OrderReview />} />
            </Route>

            <Route path="/*" element={<ErrorPage />} /> 

          </Routes>
      </div>
    );
  }



  // eslint-disable-next-line react/prop-types
  export function ProtectedRoute({ children }) {
    let auth = JSON.parse(localStorage.getItem("user"));
    if (!auth) {
      if (location.pathname === "/otp" || location.pathname === "/signup" || location.pathname === "/login") {
        return children;
      }

      return <Navigate to={"/login"}  />;
      
    } else {
      console.log(auth);
      if (!auth.isVerified) {
        if (location.pathname === "/otp" || location.pathname === "/signup"|| location.pathname === "/login")  {
          return children;
        } else {
          return <Navigate to={"/otp"} />;
        }
      } else {
        if (location.pathname === "/otp") {
          return <Navigate to={"/"} />;
        } else return children;
      }
    }
  }
