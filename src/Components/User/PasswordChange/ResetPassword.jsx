import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import Navbar from '../../Layout/Navbar';
import server from '../../../Axios/axios';
import { toast, ToastContainer } from 'react-toastify';

const ResetPasswordForm = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;
  
    const data = {
      password,
      confirmPassword,
    };
  
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      server.post(`/password/${userId}`, data, config).then((response)=>{
          toast.success(response.data.message);
          console.log(response);
      })
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className='border border-yellow-600 p-10 rounded-lg shadow-lg'>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form> {/* Use the Form component as the only child */}
            <h2 className="text-2xl font-bold mb-8">Change Your Password</h2>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                New Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className='w-full flex justify-center items-center mt-8'>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 w-[90%] rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
            </div>
       
          </Form>
        </Formik>
        </div>
       
      </div>
      <ToastContainer />

    </>
  );
};

export default ResetPasswordForm;
