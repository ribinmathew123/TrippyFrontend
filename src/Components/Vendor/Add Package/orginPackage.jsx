









import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { reset, addPackage } from "../../Redux/features/package/packageSlice";
import { getPlaceAndCategory } from "../../Redux/features/SelectPlace/SelectPlaceSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import defaultImage from "../../assest/Background1.jpg";

import * as Yup from "yup";

const AddPackage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectPlace, selectCategory } = useSelector(
    (state) => state.PlaceAndCat
  );

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.package
  );
  const vendorId = useSelector((state) => state.VendorAuth.vendor._id);

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  // price: Yup.number().required("price is required "),
  // file: Yup.mixed()
  //   .required("Image is required")
  //   .test("fileFormat", "Invalid image format", (value) => {
  //     if (!value) return false;
  //     const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
  //     return supportedFormats.includes(value.type);
  //   }),

  // disname: Yup.string().required("District name is required"),
  // // details: Yup.number().required("Details is required"),
  // details: Yup.string().required("Details is required"),
  // day: Yup.number().required("Day is required"),
  // night: Yup.number().required("night is required"),
  // startDate: Yup.date().required('Start Date is required'),
  // endDate: Yup.date().required('End Date is required'),
  // selected: Yup.array()
  // .of(Yup.string())
  // .min(1, 'At least one option must be selected')
  // .required('At least one option must be selected'),

  // });

  useEffect(() => {
    dispatch(getPlaceAndCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message.message);
      navigate("/vendor/getPackage");
    }
    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  const initialValues = {
    file: null,
    name: "",
    price: "",
    disname: "",
    startDate: "",
    endDate: "",
    details: "",
    day: "",
    night: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  //   price: Yup.number().required("Price is requied"),
  //   day: Yup.number().required("Day is requied"),
  //   night: Yup.number().required("Day is requied"),
  //   endDate: Yup.date().required("Date is requied"),
  //   startDate: Yup.date().required("Date is requied"),
  //   details: Yup.string().required("Details is required"),
  //   disname: Yup.string().required("District name is required"),
  //   selected: Yup.array().of(Yup.string()).
  //   required("required"),
      // selected: Yup.array()
  // .of(Yup.string())
  // .min(1, 'At least one option must be selected')
  // .required('At least one option must be 


    
//  file: Yup.mixed()
//     .required("Image is required")
//     .test("fileFormat", "Invalid image format", (value) => {
//       if (!value) return false;
//       const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
//       return supportedFormats.includes(value.type);
//     }),



    



  });

  const handleSubmit = (values) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("price", values.price);

    data.append("disname", values.disname);

    data.append("startDate", values.startDate);
    data.append("endDate", values.endDate);
    data.append("details", values.details);

    data.append("day", values.day);

    data.append("night", values.night);

    data.append("vendorId", vendorId);

    data.append("image", values.file);

    data.append("category", JSON.stringify(selectedCategory.value));

    data.append(
      "place",
      JSON.stringify(selected.map((TPlace) => TPlace.value))
    );

    dispatch(addPackage(data));
  };

  useEffect(() => {
    const options = selectPlace
      ? selectPlace.map((place) => ({
          label: place.place,
          key: place.id,
          value: place,
        }))
      : [];
    setOptions(options);
  }, [selectPlace]);

  return (
    <div className="flex flex-col items-center overflow-hidden bg-white p-5 md:p-10">
      <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className=" container lg:px-32 p-5 py-10 bg-green-200 shadow-lg">
          <div className="flex justify-center flex-col gap-2 mb-4">
            <h1 className="text-black font-medium">Select Tourist Place</h1>
            <MultiSelect
            name="selected"
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select Tourist Place "
            />
            <ErrorMessage
              name="selected"
              component="div"
              className="text-red-500"
            />
          </div>

          <h1 className="text-black font-medium">Select Category</h1>

          <select
            id="categories" name="cat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selectedLabel =
                e.target.options[e.target.selectedIndex].label;
              setSelectedCategory({
                value: selectedValue,
                label: selectedLabel,
              });
            }}
          >
            <option defaultValue>Select Category</option>
            {selectCategory?.map((category) => (
              <option
                key={category._id}
                value={`${category._id},${category.name}`}
              >
                {category.name}
              </option>
            ))}
          </select>

          {/* <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue>Select Category</option>
          {selectCategory?.map((category) => (
            <option key={category.value} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>  */}

          <Form className="flex items-center justify-center flex-col gap-2">
            <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
              <div className="flex justify-between flex-col md:flex-row w-full gap-2 md:gap-10">
                <div className=" w-full  flex-col gap-2 flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor="name"
                  >
                    Package Name
                  </label>

                  <Field
                    name="name"
                    placeholder="Package Name"
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="text"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor="name"
                  >
                    Package Price
                  </label>
                  <Field
                    name="price"
                    placeholder="Package price"
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor=""
                  >
                    No.of Day
                  </label>
                  <Field
                    name="day"
                    placeholder="no.of Day"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="day"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="whitespace-nowrap" htmlFor="">
                    no.of night
                  </label>
                  <Field
                    name="night"
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="night"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* <div className="md:flex-row w-full  flex-col justify-between items-center flex">
              <label htmlFor="">District Name</label>
              <Field
                name="disname"
                className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                type="text"
                {...register("disname", {
                  required: "Please Enter District name",
                })}
              />
            </div>
            {errors.disname && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.disname?.message}
              </p>
            )} */}

              {/* <div
              className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
              placeholder="Date"
            > */}

              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label className="text-black font-semibold" htmlFor="">
                    StartDate
                  </label>

                  <Field
                    name="startDate"
                    type="Date"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    placeholder="Date"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div
                  className=" w-full gap-2  flex-col flex"
                  placeholder="Date"
                >
                  {/* <div
              className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
              placeholder="Date"
              > */}
                  <label className="text-black font-semibold" htmlFor="">
                    EndDate
                  </label>

                  <Field
                    name="endDate"
                    type="Date"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    placeholder="EndDate"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                {/* <div className="md:flex-row w-full   flex-col justify-between items-center flex"> */}
                <div className=" w-full gap-2  flex-col flex">
                  <label className="text-black font-semibold" htmlFor="">
                    Package Details
                  </label>

                  <Field
                    name="details"
                    className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    type="textarea"
                    placeholder="Your message"
                  />
                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="text-black font-semibold" htmlFor="">
                    District Name
                  </label>

                  <Field
                    name="disname"
                    className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    type="text"
                    placeholder="Your message"
                  />
                  <ErrorMessage
                    name="disname"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="">
                  <Field name="file">
                    {({ form, field }) => (
                      <>
                        {field.value ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="object-cover md:w-[515px] w-52 h-60 rounded-lg"
                            style={{ width: "1425px", height: "300px" }}
                          />
                        ) : (
                          <div className=" ">
                            <img src={defaultImage} alt="" />
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

                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* <div className="flex flex-col">
              <label htmlFor="plan" className="text-lg mb-2">
                Plan:
              </label>
              {plan.map((item, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handlePlanChange(e, index)}
                    className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 flex-grow"
                  />
                  <button
                    type="button"
                    onClick={() => removePlan(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPlan}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
              >
                Add Plan
              </button>
            </div> */}
            </div>

            <button
              type="submit"
              className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
            >
              {isLoading ? "Uploading..." : "Submit"}
            </button>
          </Form>
        </div>
      </Formik>

      <Toaster />
    </div>
  );
};

export default AddPackage;
