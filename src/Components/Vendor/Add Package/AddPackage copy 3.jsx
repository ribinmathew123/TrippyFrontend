import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { reset, addPackage } from "../../Redux/features/package/packageSlice";
import { getPlaceAndCategory } from "../../Redux/features/SelectPlace/SelectPlaceSlice";
import previewImage from "../../assest/Background.png";

const AddPackage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectPlace, selectCategory } = useSelector(
    (state) => state.PlaceAndCat
  );

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.package
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [plan, setPlan] = useState([
    { title: "ribin" },
    { title: "vyshnav" },
    { title: "sidhique" },
  ]);

  const handlePlanChange = (e, index) => {
    setPlan((prev) => [...prev, (prev[index].title = "hello")]);
    const updatedPlan = [...plan];
    updatedPlan[index] = e.target.value;
    // setPlan(updatedPlan);
    console.log(plan);
  };

  const addPlan = () => {
    setPlan([...plan, ""]);
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
      navigate("/vendor/getPackage");
    }
    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage((oldArray) => [...oldArray, reader.result]);
      };
    });
  };

  const onSubmit = (data) => {
    const { name, price, disname, startDate, endDate, details, day, night } =
      data;

    const packageData = {
      name,
      price,
      disname,
      startDate,
      endDate,
      details,
      day,
      night,
      image,
      place: selected.map((TPlace) => TPlace.value),
    };

    dispatch(addPackage(packageData));
  };

  useEffect(() => {
    const options = selectPlace
      ? selectPlace.map((place) => ({
          label: place.place,
          value: place,
        }))
      : [];
    setOptions(options);
  }, [selectPlace]);

  return (
    <div className="flex flex-col items-center overflow-hidden bg-white p-5 md:p-10">
      <h1 className="font-bold text-2xl text-blue-900 my-6"> Add Packages</h1>

      <div className=" container lg:px-32 p-5 py-10 bg-green-200 shadow-lg">
        <div className="flex justify-center flex-col gap-2 mb-4">
          <h1 className="text-black font-medium">Select Tourist Place</h1>
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select Tourist Place "
          />
        </div>

        <h1 className="text-black font-medium">Select Category</h1>
        <select
          id="categories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue>Select Category</option>
          {selectCategory?.map((category) => (
            <option key={category.value} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center flex-col gap-2"
        >
          <div className="md:space-y-5 w-full space-y-3 items-start flex flex-col">
            <div className="flex justify-between flex-col md:flex-row w-full gap-2 md:gap-10">
              <div className=" w-full  flex-col gap-2 flex">
                <label
                  className="whitespace-nowrap text-black font-medium"
                  htmlFor="name"
                >
                  Package Name
                </label>

                <input
                  placeholder="Package Name"
                  name="name"
                  className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                  type="text"
                  {...register("name", {
                    required: "Enter Package Name",
                  })}
                />
              </div>
              {errors.type && (
                <p className="text-[#ff0000]  errorMessage">
                  {errors.name?.message}
                </p>
              )}

              <div className=" w-full gap-2  flex-col flex">
                <label
                  className="whitespace-nowrap text-black font-medium"
                  htmlFor="name"
                >
                  Package Price
                </label>
                <input
                  placeholder="Package Type"
                  name="price"
                  className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                  type="number"
                  {...register("price", {
                    required: "Enter Package price",
                  })}
                />
              </div>
              {errors.price && (
                <p className="text-[#ff0000]  errorMessage">
                  {errors.price?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-2 md:gap-10">
              <div className=" w-full gap-2  flex-col flex">
                <label
                  className="whitespace-nowrap text-black font-medium"
                  htmlFor=""
                >
                  No.of Day
                </label>
                <input
                  placeholder="no.of Day"
                  name="day"
                  className="rounded-md text-black border-2 border-green-600 w-full p-2"
                  type="number"
                  {...register("day", {
                    required: "Please Enter ",
                  })}
                />
              </div>
              {errors.type && (
                <p className="text-[#ff0000]  errorMessage">
                  {errors.day?.message}
                </p>
              )}

              <div className=" w-full gap-2  flex-col flex">
                <label className="whitespace-nowrap" htmlFor="">
                  no.of night
                </label>
                <input
                  name="price"
                  className="rounded-md text-black border-2 border-teal-600 w-full p-2"
                  type="number"
                  {...register("night", {
                    required: "Please enter ",
                  })}
                />
                {errors.night && (
                  <p className="text-[#ff0000]  errorMessage">
                    {errors.night?.message}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="md:flex-row w-full  flex-col justify-between items-center flex">
              <label htmlFor="">District Name</label>
              <input
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

                <input
                  type="Date"
                  name="startDate"
                  className="rounded-md text-black border-2 border-green-600 w-full p-2"
                  placeholder="Date"
                  {...register("startDate", { required: "Please Enter Date" })}
                />
                {errors.startDate && (
                  <p className="text-[#ff0000]  errorMessage">
                    {errors.startDate?.message}
                  </p>
                )}
              </div>

              <div className=" w-full gap-2  flex-col flex" placeholder="Date">
                {/* <div
              className="flex justify-between flex-col md:flex-row items-center w-full  text-blue-gray-900 rounded-md"
              placeholder="Date"
              > */}
                <label className="text-black font-semibold" htmlFor="">
                  EndDate
                </label>

                <input
                  type="Date"
                  name="endDate"
                  className="rounded-md text-black border-2 border-green-600 w-full p-2"
                  placeholder="EndDate"
                  {...register("endDate", { required: "Please choose Date" })}
                />
                {errors.endDate && (
                  <p className="text-[#ff0000]  errorMessage">
                    {errors.endDate?.message}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="md:flex-row w-full   flex-col justify-between items-center flex"> */}
            <div className=" w-full gap-2  flex-col flex">
              <label className="text-black font-semibold" htmlFor="">
                Package Details
              </label>

              <textarea
                name="details"
                className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your message"
                {...register("details", {
                  required: "Please Enter Package details",
                })}
              ></textarea>
              {errors.details && (
                <p className="text-[#ff0000]  errorMessage">
                  {errors.details?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <img
                className="previewImage object-cover w-[254px] md:w-[515px] min-w-52 md:h-60"
                src={preview ? preview : previewImage}
                alt="preview"
              />
              <input
                className="md:w-fit text-white"
                type="file"
                name="image"
                multiple
                required
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col">
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
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default AddPackage;
