import { useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useLoaderData } from 'react-router-dom';
import { registration_popup, registration_otp_popup, registration_Data } from "../../redux/Slices/StateSlice";
import toTitleCase from "../../common/titleCase";
import Apiauth from "../../_api/auth/Apiauth.service";

import InputField from "../../components/FormComponents/InputField";
import MultiSelectField from "../../components/FormComponents/MultiSelectField";
import TextareaField from "../../components/FormComponents/TextareaField";
import RadioField from "../../components/FormComponents/RadioField";

//-------------ICON--------------------
import IconComponent from "../../../assets/icons/IconComponent";
//--------------CSS--------------------
import "../../../assets/css/home/_registration.scss";

const RegistrationForms = ({forms, schema}) => {

    const CourseList = useLoaderData();
    const dispatch = useDispatch();
 
    const courseListItem = [];
        if(CourseList !== null){
            CourseList.map((item) => {   // for get course list
            courseListItem.push({ value: item?._id, label: toTitleCase(item?.name) });
        });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(event.target.name)
        const formData = new FormData(event.target);
        console.log(Object.fromEntries(formData))
    }
//       //---API calling
//       const apiResponse = await new Apiauth().registrationStudentSendOTP(data);
//       if(apiResponse?.status){
//         console.log(apiResponse)
//         //-- save token into localstorage and open OTP Popup
//         localStorage.setItem("OTPToken",apiResponse?.data?.token);
//         dispatch(registration_popup(false));
//         dispatch(registration_Data(apiResponse?.data?.regisData));

//         setTimeout(()=>{
//           dispatch(registration_otp_popup(true));
//         },3000);
//       }
//     }
//   }

  const renderField = (items, index) => {
    switch (items.id) {
        case 'textInput':
            return (
                <InputField
                   key={items.name} 
                   type={items.type}
                   name={items.name}
                   placeholder={items.placeholder}
                   autoComplete={items.autoComplete}
                   icon={items.icon}
                />
            );

        case 'multiSelectInput':
            return (
                <div key={index}>
                <label className="block text-sm font-medium leading-3 text-[var(--foreground)]">
                  Select Course:
                </label>
                <MultiSelectField
                  options={courseListItem}
                  name={items.name}
                  placeholder={items.placeholder}
                  
                />
              </div>
            );

        case 'textAreaInput':
            return (
                <div key={index}>
                    <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--foreground)]">
                        Address : 
                    </label>
                    <TextareaField name={items.name} placeholder={items.placeholder} rows={3}/>
                </div>   
            );

        case 'radioInput':
            return (
                <div className="flex items-center space-x-4" key={index}>
                    <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--foreground)]">
                        Select {items.name.charAt(0).toUpperCase() + items.name.slice(1)}: 
                    </label>
                    {forms.filter((field) => field.name == items.name).map((items)=>items.options.map((valueField,idx)=>{
                        return(
                            <RadioField
                            key={idx}
                            name={valueField.name}
                            value={valueField.value}
                            label={valueField.label}
                          />
                        )})  
                    )}
                </div>
            );

        default:
            return null;
    }
  };

  return (
    <>
      <section className="_registerSection">
        <div className="_regisForm">
          <h3 onClick={() => dispatch(registration_popup(false))}>
            <IconComponent iconType="crossIcon" />
          </h3>
          <h1>Registration here!...</h1>
          <p>Please! enter your details.</p>
          <form className="_form" autoComplete="off" onSubmit={handleSubmit}>
            {forms.map((field, index) => 
              (<div key={index} className="w-full">
                {renderField(field)}
                {/* {error[field.name] && <span className="text-red-500">{error[field.name]}</span>} */}
              </div>)
            )}
            <button>
              <IconComponent iconType="loginIcon"/>
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

RegistrationForms.propTypes = {
    forms: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        autoComplete: PropTypes.string,
        icon: PropTypes.string,
        label: PropTypes.string,
      })
    ).isRequired,
    schema: PropTypes.object, 
    validateOn: PropTypes.string,
};

export default RegistrationForms;
