

import axiosInstance from '../../../../Axios/axios'



// Get Place
const getCategory = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.get('/vendor/getCategory',config)
    return response.data
}



// Delete Place
const deleteCategory = async (id,token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axiosInstance.delete(`/vendor/deleteCategory?id=${id}`,config)
    return response.data
}

// block & unblock Place

const blockAndUnblockCat = async(id,token) => {


    
    const config = {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }
    const response = await axiosInstance.put('/vendor/blockAndUnblockCategory',{id:id},config)
    return response.data
}


const packageService={
    blockAndUnblockCat,deleteCategory,getCategory
   
}

export default packageService









