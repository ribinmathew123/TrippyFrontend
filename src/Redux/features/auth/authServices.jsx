import axios from "../../../Axios/axios";
import {message} from 'antd'

// Register user 
const register = async (userData) => {
    const response = await axios.post('/signup',userData)

    if(response.data) {
        localStorage.setItem('userData', JSON.stringify(userData))
        message.success("Success! The OTP has been sent successfully.")
    }
    return response.data
}

// Otp Verification
const otp = async (data) => {
    const response = await axios.post('/otp',data)
   
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Congratulations! Your registration has been successfully ')
        localStorage.removeItem('userData');

    }
    return response.data
}



// Otp Verification
const otpData = async (data) => {
    const response = await axios.post('/verifyOtp',data)
   
    if(response.data) {
        // localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Password changed successfully!')
    }
    return response.data
}

// Login user 

const login = async (userData) => {
    const response = await axios.post('/login', userData)
    
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success("Login Success")
    }
    return response.data
}


// const googleLogin = async (userData) => {
//     console.log("gggggggggggggggggggggggoooooooooooooo");
//     const response = await axios.get('/google-login', userData)
    
//     if(response.data) {
//         localStorage.setItem('user', JSON.stringify(response.data))
//         message.success("Login Success")
//     }
//     return response.data
// }

export const googleLogin = async (token) => {
    console.log("token",token);
    const response = await axios.get("/google-login", {
        params: {
                        googleToken: token,
                      },    });
  
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      message.success("Login Success");
    }
    return response.data;
  };


  export const googleSignup = async (token) => {
    console.log("tokendddddddddddddddd",token);
    const response = await axios.post("/signup-with-google", {  googleToken: token, },);
  
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      message.success("Login Success");
    }
    return response.data;
  };
  



const forgotPassword=async (pass)=>{
    const response = await axios.post('/forgotPassword',pass)


    if(response.data) {
        localStorage.setItem('forgot', JSON.stringify(pass))
        message.success("sent Succesfull")
    }
    return response.data

}

// Logout user
const logout = () => {

    localStorage.removeItem('user')
    message.success("Logout Success")
}

const userLogout = () => {

    localStorage.removeItem('user')
    message.success("Logout Success")
}
// authService.js


const addPic = async(data,token) => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("addpPicccccccccccccccc");
    const userId=user._id
    console.log("userid",userId);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
  const response = await axios.post(`/users/${userId}`, data, config);
  console.log("output is",response.data);

    return response.data
}
  








const authService = {
    register,
    otp,
    otpData,
    login,
    logout,forgotPassword,googleLogin,addPic,userLogout,googleSignup
}

export default authService