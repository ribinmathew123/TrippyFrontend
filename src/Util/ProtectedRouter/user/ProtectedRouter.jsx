// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../../../Redux/features/auth/authSlice";
// import { Navigate, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// export function ProtectedRouter({ children }) {
//   const dispatch = useDispatch();
// //   const user = JSON.parse(localStorage.getItem("user"));
//   const user = localStorage.getItem('user')

//   const User = useSelector((state) => state.auth.user);
//   const location = useLocation();

//   useEffect(() => {
//     if (user) {
//       dispatch(addUser(user));
//     }
//   }, [user, dispatch]);

//   if (user) {
//     if (!User) {
//       dispatch(addUser(user));
//     }
//     if (!user.isVerified) {
//       if (location.pathname === "/login") {
//         return children;
//       } else {
//         return <Navigate to={"/login"} />;
//       }
//     } else {
//       if (
//         location.pathname === "/signup" ||
//         location.pathname === "/login" ||
//         location.pathname === "/otp"
//       ) {
//         return <Navigate to={"/"} />;
//       } else {
//         return children;
//       }
//     }
//   } else {
//     if (
//       location.pathname === "/signup" ||
//       location.pathname === "/login"
//     ) {
//       return children;
//     } else {
//       return <Navigate to={"/login"} />;
//     }
//   }
// }
