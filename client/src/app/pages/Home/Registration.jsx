import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from 'react-router-dom';
import Select from 'react-select'
import { registration_popup, registration_otp_popup, registration_Data } from "../../redux/Slices/StateSlice";
import toTitleCase from "../../common/titleCase";
import Apiauth from "../../_api/auth/Apiauth.service";

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

  const handleSubmit = async(event) => {
    event.preventDefault();

    const validateForm = () => {
      const error = {};
      
      if(!data.name)
        error.name="Name shouln't be empty!";
      
      else if (!data.name.match(/^[a-zA-Z\s]{3,50}$/)) 
        error.name = 'A name must be contain only characters & length must be atleast 3 characters!';
      
      if(!data.email)
        error.email = "Email shouldn't be empty";
      
      else if (!data.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/))
        error.email = 'Invalid email address';

      if(!data.phone)
        error.phone = "Phone no. shouldn't be empty!";
       
      else if (!data.phone.match(/^\d{10}$/))
        error.phone = 'Phone number must be a 10-digit number';
      
      if (data.course.length === 0)
        error.course = 'Please! Select atleast One Course.'
       
      if (!data.address) 
        error.address = "Address shouldn't be empty!"
      
      if (!data.gender)
        error.gender = "Please! Select a gender."
      return error
    }

    const validateFormError = validateForm();
    // If there are validation errors--
    if (Object.keys(validateFormError).length > 0) {
      setError(validateFormError);
    }
    else{
      setError(validateFormError)
      //---API calling
      const apiResponse = await new Apiauth().registrationStudentSendOTP(data);
      if(apiResponse?.status){
        console.log(apiResponse)
        //-- save token into localstorage and open OTP Popup
        localStorage.setItem("OTPToken",apiResponse?.data?.token);
        dispatch(registration_popup(false));
        dispatch(registration_otp_popup(true));
        dispatch(registration_Data(apiResponse?.data?.regisData));
      }
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
              <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--foreground)]">
                Select Course's
              </label>
              <div className="relative mt-2 rounded shadow">
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
              <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--foreground)]">
                Parmanent address
              </label>
              <div className="relative mt-2 rounded shadow-sm">
                <textarea
                  className="resize-none block w-full rounded-md py-1.5 pl-3 pr-20 text-[var(--foreground)] border border-gray-300  focus:ring-ring placeholder:text-[var(--foreground)]  sm:text-sm sm:leading-6"
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
                    className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                 dark:focus:ring-ring dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-[var(--primary)] "/>
                  <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-[var(--foreground)]">Male</label>
                </div>
                <div className="flex items-center me-4">
                  <input id="inline-radio"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={data.gender === 'female'}
                    onChange={handleChange}
                    className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                 dark:focus:ring-ring dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-[var(--primary)]"/>
                  <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-[var(--foreground)]">Female</label>
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
