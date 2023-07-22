import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import previewImage from "../../../assest/Background.png";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateplace } from "../../../Redux/features/admin/GetPlace/GetPlaceSlice";

const EditPlace = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedPlace } = useSelector((state) => state.TouristPlace);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState();

  // useEffect(() => {
  //   if (placeError) {
  //     toast.error(placeMessage);
  //   }
  //   if (placeIsSuccess) {
  //     toast.success(placeMessage?.message);
  //     navigate("/admin/getPlace");
  //   }
  //   dispatch(placeReset());
  // }, [placeError, placeMessage,navigate, placeIsSuccess, dispatch]);

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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <h1 className="font-bold text-2xl text-blue-900 my-6">
        Add Tourist Places
      </h1>

      <div className="bg-[#111827] rounded-lg text-white px-20 pt-16 container mx-auto w-fit">
        <form
          onSubmit={handleSubmit()}
          className="flex items-center justify-center flex-col gap-2"
        >
          <div className="space-y-5 items-start flex flex-col">
            <div className="md:flex-row flex-col gap-6 justify-center items-center flex  ">
              <label className="whitespace-nowrap" htmlFor="">
                Place Name
              </label>
              <input
                name="place"
                defaultValue={selectedPlace.place}
                className="rounded-md text-black bg-gray-50 p-2 w-fit md:w-[400px]"
                type="text"
                {...register("place", { required: "Please Enter Place Name" })}
              />
            </div>
            {errors.place && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.place?.message}
              </p>
            )}

            <div className="md:flex-row flex-col flex gap-8 justify-center items-center">
              <label className="whitespace-nowrap" htmlFor="">
                Place Type
              </label>
              <input
                name="type"
                defaultValue={selectedPlace.type}
                className="rounded-md text-black bg-gray-50 p-2 w-full md:w-[400px] "
                type="text"
                {...register("type", { required: "Please Enter Place Type" })}
              />
            </div>
            {errors.type && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.type?.message}
              </p>
            )}

            <div className="md:flex-row flex-col flex gap-4 justify-center items-center">
              <label htmlFor="">District Name</label>
              <input
                name="disname"
                defaultValue={selectedPlace.district}
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
            )}

            <div className="md:flex-row flex-col flex gap-5 justify-center items-center">
              <label htmlFor="place details">Place Details</label>

              <textarea
                name="details"
                defaultValue={selectedPlace.description}
                className="peer block min-h-[auto]  text-black w-full rounded border-0 md:w-[400px] px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Your message"
                {...register("details", {
                  required: "Please Enter Place details",
                })}
              ></textarea>
            </div>
            {errors.details && (
              <p className="text-[#ff0000]  errorMessage">
                {errors.details?.message}
              </p>
            )}
            <div className="add_car_input_wrapper">
              {/* <img
                className="previewImage object-cover md:w-[515px] w-52 h-60"
                src={selectedPlace?.image[0]?.url}
                alt="preview"
              />  */}
              {/* {selectedPlace.image && selectedPlace.image.url  (
  <img
    className="previewImage object-cover md:w-[515px] w-52 h-60"
    src={selectedPlace?.image?.url[0]}
    alt="preview"
  />
)}  */}

              <input
                className="w-52 md:w-fit"
                type="file"
                name="image"
                multiple
                required
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-700 mt-6 mb-4 text-white w-fit px-8 rounded-lg p-2"
          >
            Submit
          </button>

          <button
            className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Open regular modal
          </button>

          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Modal Title</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-black text-lg leading-relaxed">
                        I always felt like I could do anything. That’s the main
                        thing people are controlled by! Thoughts- their
                        perception of themselves! They're slowed down by their
                        perception of themselves. If you're taught you can’t do
                        anything, you won’t do anything. I was taught I could do
                        everything.
                      </p>

                      <img
                        className="previewImage object-cover md:w-[515px] w-52 h-60"
                        src={selectedPlace?.image[0]?.url}
                        alt="preview"
                      />
                      <input
                        className="w-52 md:w-fit"
                        type="file"
                        name="image"
                        multiple
                        required
                        onChange={handleFileChange}
                      />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6  rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>

                      <button
                        className="bg-green-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </form>
      </div>

      <Toaster />
    </div>
  );
};

export default EditPlace;
