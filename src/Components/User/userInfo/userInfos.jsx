import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import defaultImage from "../../../assest/avatar.svg";
import server from "../../../Axios/axios";
import Navbar from "../../Layout/Navbar";
import {addProfilePic,reset
} from "../../../Redux/features/auth/authSlice";

function UserInfo() {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const { isLoading,isError, isSuccess, message } =
  useSelector((state) => state.auth);
  const userId = user._id;
  const dispatch = useDispatch();




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await server.get(`/users/${userId}`, config);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const initialValues = {
    file: null,
  };







  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    if (isSuccess) {
      toast.success(message);
    }
     dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  


  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("Image is required")
      .test("fileFormat", "Invalid image format", (value) => {
        if (!value) return false;
        const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
        return supportedFormats.includes(value.type);
      }),
  });

  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append("image", values.file);
    dispatch(addProfilePic(data));
  };



  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center">
      <div className="container mx-auto flex justify-center items-center text-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white shadow-2xl  sm:w-[23rem] w-[16rem] rounded-lg p-8">
            <div className="flex justify-center">
              <div className="relative">
                <Field name="file">
                  {({ form, field }) => (
                    <>
                      {field.value ? (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="Preview"
                          className="w-48 h-48 rounded-full object-cover mb-4"
                        />
                      ) : (
                        <div className="w-full">
                          <img
                            className="w-48 h-48 rounded-full object-cover mb-4 "
                            src={userData && userData.image ? userData.image : defaultImage}
                            alt=""
                          />
                        </div>
                      )}
                      <br />

                      <label
                        htmlFor="image-upload"
                        className="absolute top-32 right-0 bg-orange-300  text-white rounded-full p-2 cursor-pointer"
                      >
                         <FontAwesomeIcon icon={faPen} size="xl" />

                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={(event) => {
                            form.setFieldValue(
                              field.name,
                              event.currentTarget.files[0]
                            );
                          }}
                          className="hidden"
                        />
                        <span className="text-white text-sm">

                        </span>
                      </label>
                    </>
                  )}
                </Field>

                
              </div>
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500"
              />
            </div>

            {userData && (
              <>
                <h2 className="text-2xl font-bold mb-4 uppercase">{userData.name}</h2>
                <p className="text-gray-600 mb-4">{userData.email}</p>
                <p className="text-gray-600">
                  Contact Number: {userData.phoneNumber}
                </p>
              </>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
              disabled={isLoading} 
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </Form>
        </Formik>
      </div>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default UserInfo;
