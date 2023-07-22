// import axiosInstance from "../../../Axios/axios";
// import {message} from 'antd'

// // Select Place
// const selectPlace = async (token) => {
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const response = await axiosInstance.get('/vendor/place',config)
//     return response.data
// }

// const packageService = {
//     selectPlace
// }

// export default packageService

import axiosInstance from "../../../Axios/axios";

const selectPlace = async (token) => {
  console.log("getcatservice1");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const placeResponse = await axiosInstance.get("/vendor/place", config);
  console.log(placeResponse.data);

  return placeResponse.data;
};

const getCategory = async (token) => {
  console.log("getcatservice2");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const categoryResponse = await axiosInstance.get("/vendor/getCategory", config);
  console.log(categoryResponse.data);

  return categoryResponse.data;
};

const selectPlaceService = {
  getPlaceAndCategory: async (token) => {
    const placeResponse = await selectPlace(token);
    const categoryResponse = await getCategory(token);

    return {
      placeResponse,
      categoryResponse,
    };
  },
};

export default selectPlaceService;






