import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import defaultImage from "../../assest/Background1.jpg";

import { useDispatch, useSelector } from "react-redux";
import {
  addPlace,
  placeReset,
} from "../../Redux/features/addPlace/addPlaceSlice";

const NewPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { placeIsLoading, placeError, placeIsSuccess, placeMessage } =
    useSelector((state) => state.places);

  useEffect(() => {
    if (placeError) {
      toast.error(placeMessage);
    }
    if (placeIsSuccess) {
      toast.success(placeMessage?.message);
      navigate("/admin/getPlace");
    }
    dispatch(placeReset());
  }, [placeError, placeMessage, navigate, placeIsSuccess, dispatch]);

  const initialValues = {
    file: null,
    place: "",
    type: "",
    disname: "",
    details: "",
  };

  const validationSchema = Yup.object().shape({
    place: Yup.string().required("Place Name is required"),
    type: Yup.string().required("Place type is required"),
    file: Yup.mixed()
      .required("Image is required")
      .test("fileFormat", "Invalid image format", (value) => {
        if (!value) return false;
        const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
        return supportedFormats.includes(value.type);
      }),

    disname: Yup.string().required("District name is required"),
    // details: Yup.number().required("Details is required"),
    details: Yup.string().required("Details is required"),
  });

  const handleSubmit = (values) => {
    const data = new FormData();
    data.append("place", values.place);

    data.append("type", values.type);
    data.append("disname", values.disname);
    data.append("details", values.details);

    data.append("image", values.file);

    dispatch(addPlace(data));
  };

  return (
    <div className="flex w-full flex-col justify-center items-center overflow-hidden">
      <h1 className="font-bold text-center text-2xl text-blue-900 my-6">
        Add Tourist Places
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-full lg:w-1/2 mx-auto justify-center py-8  flex-col gap-3 px-4 bg-gray-500">
          <div className="md:flex-row flex-col flex gap-2 justify-around items-center">
            <label className="whitespace-nowrap" htmlFor="">
              Place Name:
            </label>

            <Field
              type="text"
              id="place"
              name="place"
              placeholder="placeName"
              className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px]"
            />
            
          </div>
          <ErrorMessage
              name="place"
              component="div"
              className="text-red-500"
            />

          <div className="md:flex-row flex-col flex gap-2 justify-around">
            <label className="whitespace-nowrap" htmlFor="">
              Place Type
            </label>
            <Field
              name="type"
              className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
              type="text"
              placeholder="type"
            />

            
          </div>
          <ErrorMessage
              name="type"
              component="div"
              className="text-red-500"
            />

          <div className="md:flex-row flex-col flex gap-2 justify-around">
                  <label htmlFor="">District Name</label>
                  <Field
                    name="disname"
                    className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                    type="text"
                    placeholder="district Name"
                  />

                 
                </div> 
                <ErrorMessage
                    name="disname"
                    component="div"
                    className="text-red-500"
                  />
           
          

          <div className="md:flex-row flex-col flex gap-2 justify-around">
            <label htmlFor="place details">Place Details</label>

            <Field
              name="details"
              type="textarea"
              className="peer block p-3  text-black w-full rounded border-0 md:w-[400px]"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="details"
            />
            
          </div>

          <ErrorMessage
              name="details"
              component="div"
              className="text-red-500"
            />

          <div className="md:px-14">
            <Field name="file">
              {({ form, field }) => (
                <>
                  {field.value ? (
                    <img
                      src={URL.createObjectURL(field.value)}
                      alt="Preview"
                      className="object-cover w-[100%]  h-44 rounded-lg"
                     
                    />
                  ) : (
                    <div className="w-full">
                      <img
                        className="w-[100%] h-44  object-cover"
                        src={defaultImage}
                        alt=""
                      />
                    </div>
                  )}
                  <br />
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(event) => {
                      form.setFieldValue(
                        field.name,
                        event.currentTarget.files[0]
                      );
                    }}
                    className="w-52 md:w-fit"
                  />
                </>
              )}
            </Field>
           
          </div>
          <ErrorMessage
              name="file"
              component="div"
              className="text-red-500"
            />
          {/* </div> */}

          <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            {" "}
            {placeIsLoading ? "Uploading..." : "Submit"}
          </button>
          </div>

          
          {/* </div> */}
        </Form>
        {/* </div> */}
      </Formik>

      <Toaster />
    </div>
  );
};
export default NewPlace;
