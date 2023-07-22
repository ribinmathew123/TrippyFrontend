import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPen } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import defaultImage from "../../../assest/avatar.svg";
import server from "../../../Axios/axios";
import Navbar from "../../Layout/Navbar";

function VendorData() {
  const { vendor } = useSelector((state) => state.VendorAuth);
  const [vendorData, setVendorData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track form submission status
  const vendorId = vendor._id;

  useEffect(() => {
    const fetcVendorData = async () => {
      try {
        const vendor = JSON.parse(localStorage.getItem("vendor"));
        const token = vendor.token;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await server.get(`/vendor/vendor-info/${vendorId}`, config);
        setVendorData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetcVendorData();
  }, [vendorId]);

  const initialValues = {
    file: null,
  };

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
    setIsSubmitting(true); // Set form submission status to true

    const data = new FormData();
    data.append("image", values.file);

    const vendor = JSON.parse(localStorage.getItem("vendor"));
    const token = vendor.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await server.post(`/vendor/vendor-info/${vendorId}`, data, config);
      console.log(response); 
      toast.success('Profile image updated successfully');

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false); // Set form submission status back to false
    }
  };

  return (
    <>
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
                            src={vendorData && vendorData.image ? vendorData.image : defaultImage}
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
                        {/* <FontAwesomeIcon icon={faPen} size="xl" style={{color: "#134bcd",}} /> */}

                          {/* {isSubmitting ? "Updating..." : "Select Image"} */}
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

            {vendorData && (
              <>
                <h2 className="text-2xl font-bold mb-4">{vendorData?.name}</h2>
                <p className="text-gray-600 mb-4">{vendorData?.email}</p>
                <p className="text-gray-600">
                  Contact Number: {vendorData?.phoneNumber}
                </p>
              </>
            )}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </Form>
        </Formik>
      </div>
      </div>
      
      <ToastContainer />
    </>
  );
}

export default VendorData;
