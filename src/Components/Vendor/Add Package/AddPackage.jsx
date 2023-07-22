import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { reset, addPackage } from "../../../Redux/features/package/packageSlice";
import { getPlaceAndCategory } from "../../../Redux/features/SelectPlace/SelectPlaceSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import defaultImage from "../../../assest/Background1.jpg";
import { packageSchema } from "../../../validation/validation";


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
  const vendorName = useSelector((state) => state.VendorAuth.vendor.name);

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [plan, setPlan] = useState([
    {
      totalDay: "",
      title: "",
      description: "",
      subtitle: "",
      totalTime: "",
    },
  ]);

  const handlePlanChange = (e, index, field) => {
    const updatedPlan = [...plan];
    updatedPlan[index][field] = e.target.value;
    setPlan(updatedPlan);
  };
  const addPlan = () => {
    setPlan([
      ...plan,
      {
        totalDay: "",
        title: "",
        description: "",
        subtitle: "",
        totalTime: "",
      },
    ]);
  };

  const removePlan = (index) => {
    const updatedPlan = [...plan];
    updatedPlan.splice(index, 1);
    setPlan(updatedPlan);
  };

  useEffect(() => {
    dispatch(getPlaceAndCategory());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message.message);
      navigate("/vendor/packages");
    }
    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  const initialValues = {
    file: null,
    cat: '',
    name: "",
    price: "",
    disname: "",
    startDate: "",
    endDate: "",
    details: "",
    day: "",
    night: "",
    offer: "",
    offerEndDate: "",
  };

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  //   price: Yup.number().required("Price is requied"),
  //    day: Yup.number().required("Day is requied"),
  //   night: Yup.number().required("night is requied"),
  //   endDate: Yup.date().required("Date is requied"),
  //   startDate: Yup.date().required("Date is requied"),
  //   details: Yup.string().required("Details is required"),
  //   disname: Yup.string().required("District name is required"),
  //   // selected: Yup.array().of(Yup.string()).required("required"),

  //   // file: Yup.mixed()
  //   //   .required("Image is required")
  //   //   .test("fileFormat", "Invalid image format", (value) => {
  //   //     if (!value) return false;
  //   //     const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
  //   //     return supportedFormats.includes(value.type);
  //   // }),
  // });

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
    data.append("offer", values.offer);
    data.append("offerEndDate", values.offerEndDate);

    data.append("vendorId", vendorId);
    data.append("vendorName", vendorName);

    data.append("image", values.file);

    data.append("category", selectedCategory.value);

    data.append(
      "place",
      JSON.stringify(selected.map((TPlace) => TPlace.value))
    );

    plan.forEach((item, index) => {
      data.append(`plan[${index}][totalDay]`, item.totalDay);
      data.append(`plan[${index}][title]`, item.title);
      data.append(`plan[${index}][description]`, item.description);
      data.append(`plan[${index}][subtitle]`, item.subtitle);
      data.append(`plan[${index}][totalTime]`, item.totalTime);
    });

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
        validationSchema={packageSchema}
        onSubmit={handleSubmit}
      >
        <div className=" container lg:px-32 p-5 py-10 bg-[#00695c] shadow-lg">
          <div className="flex justify-center flex-col gap-2 mb-4">
            <h1 className="text-white font-medium">Select Tourist Place</h1>
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
              className="text-red-900"
            />
          </div>

          <h1 className="text-white font-medium">Select Category</h1>

          <select
            id="categories"
            name="cat"

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
          <ErrorMessage
                    name="cat"
                    component="div"
                    className="text-red-900"
                  />

          <Form className="flex items-center justify-center flex-col gap-2">
            <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
              <div className="flex justify-between flex-col md:flex-row w-full gap-2 md:gap-10">
                <div className=" w-full  flex-col gap-2 flex">
                  <label
                    className="whitespace-nowrap text-white font-semibold mt-3"
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
                    className="text-red-900"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-white font-semibold mt-3 "
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
                    className="text-red-900"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-white font-semibold mt-3"
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
                    className="text-red-900"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="whitespace-nowrap text-white font-semibold mt-3" htmlFor="">
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
                    className="text-red-900"
                  />
                </div>
              </div>

              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label className="text-white font-semibold" htmlFor="">
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
                    className="text-red-900"
                  />
                </div>

                <div
                  className=" w-full gap-2  flex-col flex"
                  placeholder="Date"
                >
                  <label className="text-white font-semibold mt-3" htmlFor="">
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
                    className="text-red-900"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-white font-semibold"
                    htmlFor=""
                  >
                    Package Details
                  </label>
                  <Field
                    name="details"
                    placeholder="Enter about package"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="text"
                  />
                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-red-900"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="whitespace-nowrap text-white font-semibold " htmlFor="">
                    District Name
                  </label>
                  <Field
                    name="disname"
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="text"
                  />
                  <ErrorMessage
                    name="disname"
                    component="div"
                    className="text-red-900"
                  />
                </div>
              </div>

              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-white font-semibold mt-3"
                    htmlFor=""
                  >
                    Enter Offer %
                  </label>
                  <Field
                    name="offer"
                    placeholder="Enter Offer %"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="offer"
                    component="div"
                    className="text-red-900"
                  />
                </div>
                <div
                  className=" w-full gap-2  flex-col flex"
                  placeholder="Date"
                >
                  <label className="text-white font-semibold mt-3" htmlFor="">
                    Offer EndDate
                  </label>

                  <Field
                    name="offerEndDate"
                    type="Date"
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    placeholder="offerEndDate"
                  />
                  <ErrorMessage
                    name="offerEndDate"
                    component="div"
                    className="text-red-900"
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
                    className="text-red-900"
                  />
                </div>
              </div>

              {/* <div className="flex flex-wrap items-center justify-center">
                <label
                  htmlFor="plan"
                  className="text-lg mb-2 col-span-1 md:col-span-2"
                >
                  Plan:
                </label>
                {plan.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap justify-center items-center flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 col-span-1 md:col-span-4"
                  >
                    <div className="flex-grow pl-2">
                      <label htmlFor={`day-${index}`} className="block mb-1">
                        Day {index + 1}
                      </label>
                      <Field
                        type="text"
                        id={`day-${index}`}
                        value={`Day ${index + 1}`}
                        onChange={(e) => handlePlanChange(e, index, "totalDay")}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label htmlFor={`title-${index}`} className="block mb-1">
                        Title
                      </label>
                      <Field
                        type="text"
                        id={`title-${index}`}
                        value={item.title}
                        onChange={(e) => handlePlanChange(e, index, "title")}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label
                        htmlFor={`description-${index}`}
                        className="block mb-1"
                      >
                        Description
                      </label>
                      <Field
                        type="text"
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(e) =>
                          handlePlanChange(e, index, "description")
                        }
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label
                        htmlFor={`subtitle-${index}`}
                        className="block mb-1"
                      >
                        Subtitle
                      </label>
                      <Field
                        type="text"
                        id={`subtitle-${index}`}
                        value={item.subtitle}
                        onChange={(e) => handlePlanChange(e, index, "subtitle")}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>
                    <div className="flex-grow">
                      <label htmlFor={`time-${index}`} className="block mb-1">
                        Total Time
                      </label>
                      <Field
                        type="text"
                        id={`time-${index}`}
                        value={item.totalTime}
                        onChange={(e) =>
                          handlePlanChange(e, index, "totalTime")
                        }
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-500 w-full"
                      />
                    </div>

                    <div className="pt-6 flex justify-center  items-center">
                      <button
                        type="button"
                        onClick={() => removePlan(index)}
                        className="bg-red-500 text-white  px-4 p-2 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPlan}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 col-span-1 md:col-span-6"
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
