import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from 'react-router-dom';
import Select from 'react-select'
import { registration_popup } from "../../Store/Slices/StateSlice";
import toTitleCase from "../../common/titleCase";

import { BiLogInCircle } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

import "../../../assets/css/home/_registration.scss";

const Registration = () => {

  const CourseList = useLoaderData();
  const dispatch = useDispatch();
 
  const courseListItem = [];
  if(CourseList !== null){
    CourseList.map((item) => {   // for get course list
      courseListItem.push({ value: item?._id, label: toTitleCase(item?.name) });
    });
  }
  
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

  return (
    <>
      <section className="_registerSection">
        <div className="_regisForm">
          <h3 onClick={() => dispatch(registration_popup(false))}>
            <RxCross1 />
          </h3>
          <h1>Registration here!...</h1>
          <p>Please! enter your details.</p>
          <form className="_form" autoComplete="off" onSubmit={handleSubmit}>

            <span>
              <input type="text" placeholder="enter name..." name="name" value={data.name} onChange={handleChange}/>
              <label><FaUser /></label>
            </span>
            {error.name && <label className="text-red-500 text-sm -mt-3">{error.name}</label>}

            {/* <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
            </svg>
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">New Clients</p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">3,462</h4>
          </div>
          <div className="border-t border-blue-gray-50 p-4">
            <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
              <strong className="text-red-500">-2%</strong>&nbsp;than yesterday
            </p>
          </div>
        </div> */}

            <span>
              <input type="text" placeholder="john.doe@company.com" name="email" value={data.email} onChange={handleChange}/>
              <label><MdOutlineAlternateEmail /></label>
            </span>
            {error.email && <label className="text-red-500 text-sm -mt-3">{error.email}</label>}

            <span>
              <input type="text" placeholder="123-456-7890" name="phone" value={data.phone} onChange={handleChange}/>
              <label><FaPhoneAlt /></label>
            </span>
            {error.phone && <label className="text-red-500 text-sm -mt-3">{error.phone}</label>}

            {/* Multiple select Course */}
            <div className="w-full">
              <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                Select Course's
              </label>
              <div className="relative mt-2 rounded shadow-md ">
                <Select
                  options={courseListItem}
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
              <div className="relative mt-2 rounded shadow-sm">
                <textarea
                  className="resize-none block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-800 ring-1 ring-inset focus:ring-blue-500 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
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
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-blue-600 "/>
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
