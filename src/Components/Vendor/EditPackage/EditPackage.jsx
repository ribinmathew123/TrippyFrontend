import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPackage,
  packageReset,
} from "../../../Redux/features/GetPackage/GetPackageSlice";
import { getPlaceAndCategory } from "../../../Redux/features/SelectPlace/SelectPlaceSlice";
import { updatePackage } from "../../../Redux/features/Vendor/UpdatePackage/updatePackageSlice";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditPackage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPackage } = useSelector((state) => state.GetPackage);
  const { selectPlace, selectCategory } = useSelector(
    (state) => state.PlaceAndCat
  );

  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [editedPackage, setEditedPackage] = useState();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchPackage(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPlaceAndCategory());
  }, [dispatch]);

  useEffect(() => {
    setEditedPackage({
      name: selectedPackage?.name,
      type: selectedPackage?.type,
      district: selectedPackage?.district,
      price: selectedPackage?.price,
      day: selectedPackage?.day,
      night: selectedPackage?.night,
      details: selectedPackage?.details,
      image: selectedPackage?.image?.url,
      offer: selectedPackage?.offer,
      startDate: selectedPackage?.startDate,
      endDate: selectedPackage?.endtDate,
      offerEndDate: selectedPackage?.endDate,
      categoryName: selectedPackage?.categoryName,
      place: selectedPackage?.place.map((item) => item.place),
    });
  }, [dispatch, selectedPackage]);

  useEffect(() => {
    const options = editedPackage?.place
      ? editedPackage?.place?.map((place) => ({
          label: place,
          key: place.id,
          value: place,
        }))
      : [];
    setSelected(options);
  }, [selectedPackage?.place]);
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

  const handleChange = (e) => {
    setEditedPackage({ ...editedPackage, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event, publicId) => {
    setEditedPackage((prev) => {
      return { ...prev, publicId };
    });
    setSelectedImage(event.target.files[0]);
  };

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

  const handleSubmit = (values) => {
    const {
      name,
      price,
      disname,
      description,
      startDate,
      endDate,
      day,
      night,
      offer,
      offerEndDate,
      publicId,
    } = editedPackage;

    const packageData = {
      name,
      price,
      disname,
      description,
      startDate,
      endDate,
      day,
      night,
      offer,
      offerEndDate,
      publicId,
    };
    const payload = { packageData, id: selectedPackage._id };

    const formData = new FormData();
    formData.append("packageData", JSON.stringify(packageData));
    formData.append("id", selectedPackage._id);
    formData.append("image", selectedImage);
    // formData.append("name", values.name);
    // formData.append("price", values.price);
    // formData.append("disname", values.disname);
    // formData.append("startDate", values.startDate);
    // formData.append("endDate", values.endDate);
    // formData.append("details", values.details);
    // formData.append("day", values.day);
    // formData.append("night", values.night);
    // formData.append("offer", values.offer);
    // formData.append("offerEndDate", values.offerEndDate);

    // formData.append("image", values.file);
    // formData.append("category", selectedCategory.value);
    // formData.append(
    //   "place",
    //   JSON.stringify(selected.map((TPlace) => TPlace.value))
    // );

    // plan.forEach((item, index) => {
    //   formData.append(`plan[${index}][totalDay]`, item.totalDay);
    //   formData.append(`plan[${index}][title]`, item.title);
    //   formData.append(`plan[${index}][description]`, item.description);
    //   formData.append(`plan[${index}][subtitle]`, item.subtitle);
    //   formData.append(`plan[${index}][totalTime]`, item.totalTime);
    //   // formData.append(`plan[${index}][type]`, item.type);
    // });

    dispatch(updatePackage(formData));
    // toast.success("Package updated successfully!");

    navigate("/vendor/packages");
    dispatch(packageReset());
  };

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
    offer: "",
    offerEndDate: "",
  };
  const validationSchema = Yup.object().shape({});
  return (
    <div className="flex flex-col items-center overflow-hidden bg-white p-5 md:p-10">
      <h1 className="font-bold text-2xl text-blue-900 my-6">
        {" "}
        Update Packages
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className=" container lg:px-32 p-5 py-10 bg-[#19776c] shadow-lg">
          <div className="flex justify-center flex-col gap-2 mb-4">
            <h1 className="text-black font-medium">Select Tourist Place</h1>
            <MultiSelect
              name="selected"
              options={options}
              value={selected}
              //  value={editedPackage?.place}
              //         onChange={handleChange}
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
            <option value>{editedPackage?.categoryName}</option>
            {selectCategory?.map((category) => (
              <option
                key={category._id}
                value={`${category._id},${category.name}`}
              >
                {category.name}
              </option>
            ))}
          </select>

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
                    value={editedPackage?.name}
                    onChange={handleChange}
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
                    value={editedPackage?.price}
                    onChange={handleChange}
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
                    value={editedPackage?.day}
                    onChange={handleChange}
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
                    value={editedPackage?.night}
                    onChange={handleChange}
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

              <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label className="text-black font-semibold" htmlFor="">
                    StartDate
                  </label>
                  {console.log(
                    new Date(editedPackage?.startDate).getFullYear() +
                      "-" +
                      new Date(editedPackage?.startDate).getMonth() +
                      "-" +
                      new Date(editedPackage?.startDate).getDay()
                  )}
                  <Field
                    name="startDate"
                    type="Date"
                    value={
                      editedPackage?.startDate &&
                      new Date(editedPackage?.startDate)
                        .toISOString()
                        .substring(0, 10)
                    }
                    onChange={handleChange}
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
                  <label className="text-black font-semibold" htmlFor="">
                    EndDate
                  </label>
                  {console.log(
                    new Date(editedPackage?.endDate).getFullYear() +
                      "-" +
                      new Date(editedPackage?.endDate).getMonth() +
                      "-" +
                      new Date(editedPackage?.endDate).getDay()
                  )}

                  <Field
                    name="endDate"
                    type="Date"
                    value={
                      editedPackage?.endDate &&
                      new Date(editedPackage?.endDate)
                        .toISOString()
                        .substring(0, 10)
                    }
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



              <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor=""
                  >
                    Package Details
                  </label>

                  <Field
                    name="details"
                    value={editedPackage?.details}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="text"
                  />

                  <ErrorMessage
                    name="details"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className=" w-full gap-2  flex-col flex">
                  <label className="whitespace-nowrap" htmlFor="">
                    District Name
                  </label>
                  <Field
                    name="disname"
                    value={editedPackage?.district}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                    type="text"
                  />
                  <ErrorMessage
                    name="disname"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* <div className="flex justify-between w-full gap-2 flex-col md:flex-row  md:gap-10">
                <div className=" w-full gap-2  flex-col flex">
                  <label
                    className="whitespace-nowrap text-black font-medium"
                    htmlFor=""
                  >
                    Enter Offer %
                  </label>
                  <Field
                    name="offer"
                    value={editedPackage?.offer}
                    onChange={handleChange}
                    className="rounded-md text-black border-2 border-green-600 w-full p-2"
                    type="number"
                  />
                  <ErrorMessage
                    name="offer"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div
                  className=" w-full gap-2  flex-col flex"
                  placeholder="Date"
                >
                  <label className="text-black font-semibold" htmlFor="">
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
                    className="text-red-500"
                  />
                </div>
              </div> */}

              {/* <div className="flex flex-col justify-center">
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
              </div> */}


              <div className="flex flex-col justify-center">
                {selectedImage ? (
                  <div className="m-4">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Preview"
                      className="object-cover md:w-[100px] w-60 h-60 rounded-lg"
                    />
                  </div>
                ) : (
                  selectedPackage?.image?.length > 0 && (
                    <div className=" m-10 ">
                      <img
                        src={selectedPackage?.image[0]?.url}
                        alt="Preview"
                        className="object-cover md:w-[200px] w-60 h-60 rounded-lg"
                      />
                    </div>
                  )
                )}
                <br />
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(e, selectedPackage?.image[0]?.public_id)
                  }
                  className="w-52 md:w-fit"
                />
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <label
                  htmlFor="plan"
                  className="text-lg mb-2 col-span-1 md:col-span-2"
                >
                  Plan:
                </label>
                {plan.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 col-span-1 md:col-span-4"
                  >
                    <div className="flex-grow">
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
                    <div className="flex-grow">
                      <button
                        type="button"
                        onClick={() => removePlan(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
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
              upload
            </button>
          </Form>
        </div>
      </Formik>

      <Toaster />
    </div>
  );
};

export default EditPackage;
