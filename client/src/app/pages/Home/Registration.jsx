import { useState } from "react";
import { useDispatch } from "react-redux";
import Select from 'react-select'
import { registration_popup } from "../../Store/Slices/StateSlice";
import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

import "../../../assets/css/home/_registration.scss";

const Registration = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    course: [],
    gender: "",
    address: ""
  })

  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const validateForm = () => {
      const error = {};
      
      {/* Name Validation */}
      if(!data.name){
        error.name="Name shouln't be empty!";
      }
      else if (!data.name.match(/^[a-zA-Z\s]{3,50}$/)) {
        error.name = 'A name must be contain only characters & length must be atleast 3 characters!';
      }
      
      {/* Email Validation */}
      if(!data.email){
        error.email = "Email shouldn't be empty";
      }
      else if (!data.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
        error.email = 'Invalid email address';
      }

      {/* phone Validation */}
      if(!data.phone){
        error.phone = "Phone no. shouldn't be empty!";
      } 
      else if (!data.phone.match(/^\d{10}$/)) {
        error.phone = 'Phone number must be a 10-digit number';
      }
      
      {/* course Validation */}
      if (data.course.length === 0) {
        error.course = 'Please! Select atleast One Course.'
      }
       
      {/* Address Validation */}
      if (!data.address) {
        error.address = "Address shouldn't be empty!"
      }
      
      {/* gender Validation */}
      if (!data.gender) {
        error.gender = "Please! Select a gender."
      }
      return error
    }

    const validateFormError = validateForm();
    // If there are validation errors--
    if (Object.keys(validateFormError).length > 0) {
      setError(validateFormError);
    }
    else{
      // Form is Valid
      console.log(data)
      setError(validateFormError)
    }

  }

  const options = [
    { value: 'MERN1', label: "MERN" },
    { value: 'MEAN2', label: "MERN2" },
    { value: 'MEVN3', label: "MERN3" },
    { value: 'MERN4', label: "MERN4" },
    { value: 'MEAN5', label: "MERN5" },
    { value: 'MEVN6', label: "MERN6" },
    { value: 'MERN7', label: "MERN7" },
    { value: 'MEAN8', label: "MERN8" },
    { value: 'MEVN9', label: "MERN9" }
  ]

  const dispatch = useDispatch();
  return (
    <>
      <section className="_registerSection">
        <div className="_regisForm">
          <h3 onClick={() => dispatch(registration_popup(false))}>
            <RxCross1 />
          </h3>
          <h1>Registration here!...</h1>
          <p>Please! enter your details.</p>
          <form className="_form" autoComplete="off" onSubmit={handleSubmit} >
            <span>
              <label>
                <FaUser />
              </label>
              <input type="text" placeholder="enter name..." name="name" value={data.name} onChange={handleChange}/>
            </span>
            {error.name && <label className="text-red-500 text-sm -mt-3">{error.name}</label>}

            <span>
              <label>
                <MdOutlineAlternateEmail />
              </label>
              <input type="text" placeholder="enter email..." name="email" value={data.email} onChange={handleChange}/>
            </span>
            {error.email && <label className="text-red-500 text-sm -mt-3">{error.email}</label>}

            <span>
              <label>
                <FaPhoneAlt />
              </label>
              <input type="text" placeholder="enter phone-no..." name="phone" value={data.phone} onChange={handleChange}/>
            </span>
            {error.phone && <label className="text-red-500 text-sm -mt-3">{error.phone}</label>}

            {/* Multiple select Course */}
            <div className="w-full">
              <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                Select Course's
              </label>
              <div className="relative mt-2 rounded-md shadow-sm bg-black">
                <Select
                  options={options}
                  isMulti
                  name="course"
                  value={data.course}
                  onChange={(selectedOptions) => setData({ ...data, course: selectedOptions })}
                />
              </div>
              {error.course && <label className="text-red-500 text-sm -mt-3">{error.course}</label>}
            </div>

            {/* Address. */}
            <div className="w-full">
              <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                Parmanent address
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <textarea
                  className="resize-none block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter the Parmanent address.."
                  rows="2"
                  name="address" value={data.address} onChange={handleChange}>
                </textarea>
              </div>
              {error.address && <label className="text-red-500 text-sm -mt-3">{error.address}</label>}
            </div>


            <div className="space-y-2">
              <label className="text-[0.9rem]">Select Gender : </label>
              <div className="flex">
                <div className="flex items-center me-4">
                  <input id="inline-radio"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={data.gender === 'male'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                </div>
                <div className="flex items-center me-4">
                  <input id="inline-radio"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={data.gender === 'female'}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                </div>
              </div>
              {error.gender && <label className="text-red-500 text-sm -mt-3">{error.gender}</label>}
            </div>

            <button>
              <BiLogInCircle />
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
export default Registration;
