import axiosInstance from "../../../Axios/axios";
import {message} from 'antd'



// Add package
// const addPackage = async ({packageData,token,vendorId}) => {
//     console.log("token"+token);

//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
        
//         }
//     }

//     const requestData = {
//         ...packageData,
//         vendorId: vendorId
//     };
//     const response = await axiosInstance.post('/vendor/addPackage', requestData,config)
    
//     return response.data
// }



const addPackage = async({pack,token}) => {
    console.log(pack);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.post('/vendor/packages',pack,config)
    return response.data
}












// Get package
const getPackage = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/vendor/packages',config)
    return response.data
}




// Get Place
const getPlace = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/vendor/place',config)
    return response.data
}







// Delete package
const deletePackage = async (id,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.delete(`/vendor/packages?id=${id}`,config)
    return response.data
}





// block&unblock package

const blockAndUnblockPackage = async(id,token) => {
    const config = {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/vendor/packages',{id:id},config)
    return response.data
}


const packageService = {
    addPackage,
    getPackage,
    deletePackage,
    blockAndUnblockPackage,
    getPlace
}

export default packageService