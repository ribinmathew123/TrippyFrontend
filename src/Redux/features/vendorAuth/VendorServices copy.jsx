import axios from "../../../Axios/axios";
import {message} from 'antd'

// Register user 
const register = async (vendorData) => {
    
    const response = await axios.post('/vendor/signup',vendorData)

    if(response.data) {
        
        localStorage.setItem('vendorData', JSON.stringify(vendorData))
        // message.success("Registration Succesfull")
    }
    return response.data
}

// Otp Verification
const otp = async (data) => {
    const response = await axios.post('/vendor/otp',data)
   
    if(response.data) {
        localStorage.setItem('vendor', JSON.stringify(response.data))
        message.success('OTP Verified')
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


// Logout user
const logout = () => {
    localStorage.removeItem('vendor')
    message.success("Logout Success")
}


const VendorService = {
    register,
    otp,
    login,
    logout
}

export default VendorService