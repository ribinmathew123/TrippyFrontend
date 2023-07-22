import axios from "../../../Axios/axios";
import {message} from 'antd'

// Register user 
const register = async (vendorData) => {
    const response = await axios.post('/vendor/signup',vendorData)

    if(response.data) {
        localStorage.setItem('vendorData', JSON.stringify(vendorData))
        message.success("Success! The OTP has been sent successfully.")
    }
    return response.data
}

// Otp Verification
const otp = async (data) => {
    const response = await axios.post('/vendor/otp',data)
   
    if(response.data) {
        localStorage.setItem('vendor', JSON.stringify(response.data))
        message.success('Congratulations! Your registration has been successfully ')
        localStorage.removeItem('vendorData');

    }
    return response.data
}




// Otp Verification
const otpData = async (data) => {
    const response = await axios.post('/vendor/verifyOtp',data)
   
    if(response.data) {
        // localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Password changed successfully!')
    }
    return response.data
}

// Login user 

const login = async (vendorData) => {
    const response = await axios.post('/vendor/login', vendorData)
    
    if(response.data) {
        localStorage.setItem('vendor', JSON.stringify(response.data))
        message.success("Login Success")
    }
    return response.data
}


const forgotPassword=async (pass)=>{
    const response = await axios.post('/vendor/forgot-password',pass)


    if(response.data) {
        localStorage.setItem('forgot', JSON.stringify(pass))
        message.success("sent Succesfull")
    }
    return response.data

}

// Logout user
const logout = () => {
    localStorage.removeItem('vendor')
    message.success("Logout Success")
}


const VendorService = {
    register,
    otp,
    otpData,
    login,
    logout,
    forgotPassword,
}

export default VendorService