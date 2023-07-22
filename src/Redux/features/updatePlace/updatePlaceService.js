import axiosInstance from "../../../Axios/axios";

// update Place
const updatePlace = async (formData,  token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",

    },
  };
  const response = await axiosInstance.post(
    `/admin/update-place/`,
    formData,
    config
  );
  return response.data;
};


const placeService = {
  updatePlace
};
export default placeService;
