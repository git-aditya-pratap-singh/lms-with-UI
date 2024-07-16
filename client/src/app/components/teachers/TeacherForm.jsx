import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { add_teacher_popup } from "../../redux/Slices/StateSlice";
import { toast } from "react-toastify";
import Select from "react-select";
import toTitleCase from "../../common/titleCase";
import Apiadmin from "../../_api/admin/Apiadmin.service";

import { MdPhotoSizeSelectActual } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";

import "../../../assets/css/component/_addform.scss";

const TeacherForm = (props) => {
  
  //-----------------Get Course List---------------------------------
  const courseListItem = [];
  props?.courseDataList.map((item) => {   // for get course list
    courseListItem.push({ value: item?._id, label: toTitleCase(item?.name) });
  });
  //------------------------------------------------------------------

  const dispatch = useDispatch();
  const formEditinfo = useSelector((store) => store.openPopup.add_teacher_popup);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: [],
    gender: "",
    status: "",
    address: "",
    imgUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validateFormData = () => {
      return !formData.name
        ? toast.warning("Name can not be empty!")
        : !formData.email
        ? toast.warning("Email can not be empty!")
        : !formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
        ? toast.warning("Invalid email!")
        : !formData.phone
        ? toast.warning("Phone can not be empty!")
        : isNaN(formData.phone)
        ? toast.warning("Please, Enter the phone no.!")
        : formData.phone.length < 10
        ? toast.warning("Please, enter phone no. atleast 10 digit!")
        : formData.course.length === 0
        ? toast.warning("Please, Choose any Course!")
        : !formData.gender
        ? toast.warning("Please, Choose any gender!")
        : !formData.status
        ? toast.warning("Please, Choose Status!")
        : !formData.address
        ? toast.warning("Address can not be empty!")
        : !formData.imgUrl
        ? toast.warning("Please, upload the Image!")
        : true;
    };
    if (validateFormData() !== true) {
      return;
    } else {
      //--------API Calling
      new Apiadmin().addTeachers(formEditinfo, formData)
      .then((apiResponse)=>{
        if (apiResponse.status)
          dispatch(add_teacher_popup({check: false, key: formEditinfo.add ? "add" : "edit" }));
      })
    }
  };

  useEffect(() => {
    if (formEditinfo?.item?.name) {
      //----------------Selected course list Array-------------------------
      const selectedCourseList = [];
      formEditinfo?.item?.courseList.map((course)=>{
        courseListItem.some((courseObj)=>{
          courseObj.value === course._id ? selectedCourseList.push(courseObj) : null;
        })
      });
      
      setFormData({
        name: formEditinfo?.item?.name,
        email: formEditinfo?.item?.email,
        phone: formEditinfo?.item?.phone,
        course: selectedCourseList,
        gender: formEditinfo?.item?.gender,
        status: formEditinfo?.item?.status,
        address: formEditinfo?.item?.address,
      });
    }
  }, [formEditinfo?.item]);

  return (
    <>
      <section className="_addForm">
        <div className="flex justify-between items-center">
          <h3>{`${formEditinfo.add ? "Add" : "Edit"} Teachers 🙋‍♂️`}</h3>
          <span className="cursor-pointer">
            <RxCross1
              onClick={() => {
                if (formEditinfo.add == true) {
                  dispatch(add_teacher_popup({ check: false, key: "add" }));
                }
                if (formEditinfo.edit == true) {
                  dispatch(add_teacher_popup({ check: false, key: "edit" }));
                }
              }}
            />
          </span>
        </div>
        <h2>{`Please, ${formEditinfo.add ? "add" : "edit"} Teachers`}</h2>
        <form className="_form" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-3 text-gray-800">
              Name
            </label>
            <span className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter the name.."
              />
              <label>
                <FaUser />
              </label>
            </span>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-3 text-gray-800">
              Email
            </label>
            <span className="relative mt-2 rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter the email.."
              />
              <label>
                <MdOutlineAlternateEmail />
              </label>
            </span>
          </div>

          {/* phone no. */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-3 text-gray-800">
              Phone no.
            </label>         
            <span className="relative mt-2 rounded-md shadow-sm">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}              
                placeholder="Enter the phone no.."
              />
              <label>
                <FaPhoneAlt />
              </label>
            </span>
          </div>

          {/* Multiple select Course */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-3 text-gray-800">
              Select Course's
            </label>
            <div className="relative mt-2 rounded-md shadow-sm w-[300px] md:w-[250px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-800 sm:text-sm"></span>
              </div>
              <Select
                options={courseListItem}
                isMulti
                name="course"
                value={formData.course}
                onChange={(selectedOptions) =>
                  setFormData({ ...formData, course: selectedOptions })
                }
              />
            </div>
          </div>

          {/* Select Gender */}
          <div className="space-x-2 flex items-center">
            <label className="text-[0.9rem]">Gender : </label>
            <div className="flex">
              <div className="flex items-center me-4">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                                 dark:focus:ring-ring dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                />
                <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-gray-300">
                  Male
                </label>
              </div>

              <div className="flex items-center me-4">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                  dark:focus:ring-ring dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                />
                <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-gray-300">
                  Female
                </label>
              </div>
            </div>
          </div>

          {/* Select Status */}
          <div className="space-x-2 flex items-center">
            <label className="text-[0.9rem]">Status : </label>
            <div className="flex">
              <div className="flex items-center me-4">
                <input
                  id="inline-radio"
                  type="checkbox"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                  className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                                dark:focus:ring-ring dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                />
                <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-gray-300">
                  Active
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="inline-radio"
                  type="checkbox"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                  disabled={formEditinfo.add}
                  className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                                dark:focus:ring-ring dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                />
                <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-gray-300">
                  Inactive
                </label>
              </div>
            </div>
          </div>

          {/* Address. */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-3 text-gray-800"
            >
              Parmanent address
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-800 sm:text-sm"></span>
              </div>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="resize-none block w-full rounded focus:shadow-md focus:shadow-blue-200/50 py-1.5 pl-3 pr-20 text-gray-800 placeholder:text-gray-400 
                 ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-ring sm:text-sm sm:leading-6"
                placeholder="Enter the Parmanent address.."
                rows="5"
              ></textarea>
            </div>
          </div>

          {/* upload image */}
          <div className="hidden md:block">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6  text-[var(--foreground)]"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <MdPhotoSizeSelectActual
                  className="mx-auto h-12 w-12  text-[var(--foreground)]"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-[var(--primary)] focus-within:outline-none focus-within:ring-2
                     focus-within:ring-[var(--primary)] focus-within:ring-offset-2 hover:text-[var(--primary)]">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="imgUrl"
                      type="file"
                      value={formData.imgUrl}
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 1MB
                </p>
              </div>
            </div>
          </div>
          <button className="button">
            {`${formEditinfo.add ? "Add Teachers" : "Update"}`}
            {formEditinfo.add ? <FaPlus /> : <GrUpdate />}
          </button>
        </form>
      </section>
    </>
  );
};

TeacherForm.propTypes = {
  courseDataList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default TeacherForm;
