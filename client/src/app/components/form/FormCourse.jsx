import { useState } from "react";
import PropTypes from 'prop-types';
import Select from 'react-select'
import JoditEditor from 'jodit-react';
import toTitleCase from '../../common/titleCase';
import Apiadmin from "../../_api/admin/Apiadmin.service";
import IconComponent from "../../../assets/icons/IconComponent";
import SelectDropDown from "../FormComponents/ThemeDropDown";

import "../../../assets/css/component/_formcourse.scss";

const FormCourse = (props) => {

    const faculityList = [];
    const courseTagsList = [];

    props?.list[0]?.map((item) => {  // for teachers
        faculityList.push({ value: item?._id, label: toTitleCase(item?.name) })
    })
    props?.list[1]?.map((item) => {  // for courseTags
        courseTagsList.push({ value: item?._id, label: toTitleCase(item?.tagName) })
    })

    const initialState = {
        courseName: '',
        courseDiscription: '',
        coursePrice: '',
        courseEstiPrice: '',
        courseTags: [],
        courseCategories: '',
        courseLevel: '',
        videoTitle: '',
        videoURL: '',
        sourceCode: '',
        courseBenifit: '',
        faculity: [],
        video: '',
        logo: ''
    }

    const [courseData, setCourseData] = useState(initialState);
    const [error, setError] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData({ ...courseData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const FormValidation = () => {
            const error = {};
            // ------------Course Name validate--------------
            if (!courseData.courseName) 
                error.courseName = "Course-name shouln't be empty!"
            
            else if (!courseData.courseName.match(/^[a-zA-Z\s]{5,150}$/)) 
                error.courseName = 'A name must be contain only characters & length must be atleast 5 characters!';
            
            //------------Course Discription validate--------------
            if (!courseData.courseDescription) 
                error.courseDescription = "Course Discription shouln't be empty!"

            // ------------Course Price validate--------------
            if (!courseData.coursePrice) 
                error.coursePrice = "Course Price($) shouln't be empty!"
            
            else if (isNaN(courseData.coursePrice)) 
                error.coursePrice = "Course Price($) shouln't be Alphabet only Number Allowed!"

            // ------------Course Estimated Price validate--------------
            if (!courseData.courseEstiPrice) 
                error.courseEstiPrice = "Course Estimated Price($) shouln't be empty!"
            
            else if (isNaN(courseData.courseEstiPrice)) 
                error.courseEstiPrice = "Course Estimated Price($) shouln't be Alphabet only Number Allowed!"

            //------------course Validation -----------------
            if (courseData.courseTags.length === 0)
                error.courseTags = 'Please! Select atleast One Tags.'

            //------------course courseCategories -----------------
            if (!courseData.courseCategories) 
                error.courseCategories = 'Please! Select atleast One Categories.'

            //------------course courseLevel-----------------
            if (!courseData.courseLevel) 
                error.courseLevels = 'Please! Select Level.'

            //------------course videoTitle-----------------
            if (!courseData.videoTitle)
                error.videoTitle = 'Please! Enter the Video Title.'

            // ------------Course Discription validate--------------
            if (!courseData.courseBenifit)
                error.courseBenifit = "Course Benifits shouln't be empty!"

            //------------course Validation -----------------
            if (courseData.faculity.length === 0)
                error.faculity = 'Please! Select atleast One faculity member.'

            //------------course courseVideo -----------------
            if (!courseData.video) 
                error.courseVideo = 'Please! Upload a Video.'

            //------------course courselogo -----------------
            if (!courseData.logo) 
                error.courselogo = 'Please! Upload a Logo.'

            return error;
        }

        const validateFormError = FormValidation();

        if (Object.keys(validateFormError).length > 0) 
            setError(validateFormError);
        else {
            setError(validateFormError);
            {/* Api Calling */ }
            console.log(courseData)
            new Apiadmin().addCourses(courseData)
            .then((apiResponse)=>{
                if(apiResponse.status)
                    setCourseData(initialState)
            })
        }
    }

    return (
        <>
            <section className="_courseForm">
                <form className="_courseForm1" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Name */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Name <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="sm:text-sm">
                                    <IconComponent iconType="bookopenIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="courseName"
                                value={courseData.courseName}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Course name.."
                            />
                        </div>
                        {error.courseName && <label className="text-red-500 text-sm -mt-3">{error.courseName}</label>}
                    </div>

                    {/* Discription. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Discription <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-600 sm:text-sm">

                                </span>
                            </div>
                            <div className="card">
                                <JoditEditor
                                    value={courseData.courseDiscription}
                                    tabIndex={1}
                                    onBlur={newContent => setCourseData({ ...courseData, courseDescription: newContent })}
                                />
                            </div>
                        </div>
                        {error.courseDescription && <label className="text-red-500 text-sm -mt-3">{error.courseDescription}</label>}
                    </div>

                    {/* Price */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <IconComponent iconType="holdDollerIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="coursePrice"
                                value={courseData.coursePrice}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Price..."
                            />
                        </div>
                        {error.coursePrice && <label className="text-red-500 text-sm -mt-3">{error.coursePrice}</label>}
                    </div>

                    {/* Estimated Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Estimated Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="dollerIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="courseEstiPrice"
                                id="courseEstiPrice"
                                value={courseData.courseEstiPrice}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Estimated Price.."
                            />
                        </div>
                        {error.courseEstiPrice && <label className="text-red-500 text-sm -mt-3">{error.courseEstiPrice}</label>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Tags <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="tagIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <Select
                                options={courseTagsList}
                                isMulti
                                name="courseTags"
                                value={courseData.courseTags}
                                className="bg-[var(--background)] text-[var(--foreground)] text-sm"
                                onChange={(selectedOptions) => setCourseData({ ...courseData, courseTags: selectedOptions })}
                            />
                        </div>
                        {error.courseTags && <label className="text-red-500 text-sm -mt-3">{error.courseTags}</label>}
                    </div>

                    {/* categories */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Categories <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="bufferIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="courseCategories"
                                id="courseCategories"
                                value={courseData.courseCategories}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Course name.."
                            />
                        </div>
                        {error.courseCategories && <label className="text-red-500 text-sm -mt-3">{error.courseCategories}</label>}
                    </div>

                    {/* Level */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Level <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <select name="courseLevel" value={courseData.courseLevel} onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6">
                                <option value="" disabled >Select Course Level</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                                <option value="Deep Dive">Deep Dive</option>
                            </select>
                        </div>
                        {error.courseLevel && <label className="text-red-500 text-sm -mt-3">{error.courseLevel}</label>}
                    </div>

                    {/* Video Title */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Video Title <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <IconComponent iconType="videoIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="videoTitle"
                                value={courseData.videoTitle}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Video Title.."
                            />
                        </div>
                        {error.videoTitle && <label className="text-red-500 text-sm -mt-3">{error.videoTitle}</label>}
                    </div>

                    {/* Video URL */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Video URL
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="videoIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="videoURL"
                                value={courseData.videoURL}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Video URL.."
                            />
                        </div>
                    </div>

                    {/* Source Code */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Source Code Link
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="sm:text-sm">
                                    <IconComponent iconType="linkIcon" iconStyle="text-[var(--primary)]"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="sourceCode"
                                value={courseData.sourceCode}
                                onChange={handleChange}
                                className="outline-none bg-[var(--background)] text-[var(--foreground)] w-full rounded-md border-0 py-2 pl-9 pr-7 ring-1 ring-gray-300 placeholder:text-gray-400  focus:ring-[var(--primary)] focus:shadow-md sm:text-sm sm:leading-6"
                                placeholder="Enter the Source Code Link.."
                            />
                        </div>
                    </div>

                    {/* Course Benifits */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Benifits <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-600 sm:text-sm">

                                </span>
                            </div>
                            <div className="card">
                                <JoditEditor
                                    value={courseData.courseBenifit}
                                    tabIndex={1}
                                    onBlur={newContent => setCourseData({ ...courseData, courseBenifit: newContent })}
                                />
                            </div>
                        </div>
                        {error.courseBenifit && <label className="text-red-500 text-sm -mt-3">{error.courseBenifit}</label>}
                    </div>

                    {/* Select teachers */}
                    <div className="w-full">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Select Faculity <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <Select
                                options={faculityList}
                                isMulti
                                name="faculity"
                                value={courseData.faculity}
                                className="bg-[var(--background)] text-[var(--foreground)] text-sm"
                                onChange={(selectedOptions) => setCourseData({ ...courseData, faculity: selectedOptions })}
                            />
                        </div>
                        {error.faculity && <label className="text-red-500 text-sm -mt-3">{error.faculity}</label>}
                    </div>

                    {/* Upload Video. */}
                    <div className="w-full space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Video upload here.. <span className="text-red-500">*</span>
                        </label>
                        <input type="file"
                            name="video"
                            className="file-input file-input-bordered w-full h-10 bg-[var(--background)] text-[var(--foreground)]"
                            onChange={(event)=>setCourseData({...courseData, 'video': event.target.files[0]})} />
                        {error.courseVideo && <label className="text-red-500 text-sm -mt-3">{error.courseVideo}</label>}
                    </div>

                    {/* Logo Upload. */}
                    <div className="w-full space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-[var(--card-foreground)]">
                            Course Logo upload here.. <span className="text-red-500">*</span>
                        </label>
                        <input type="file"
                            name="logo"
                            className="file-input file-input-bordered w-full h-10 bg-[var(--background)] text-[var(--foreground)]"
                            onChange={(event)=>setCourseData({...courseData, 'logo': event.target.files[0]})} />
                        {error.courselogo && <label className="text-red-500 text-sm -mt-3">{error.courselogo}</label>}
                    </div>


                    <div className="flex justify-end items-center">
                        <button className="w-24 flex justify-center items-center gap-x-2 bg-[var(--primary)] p-2 text-white rounded 
                            shadow-md duration-300 ease-in-out active:scale-90">
                            Submit <IconComponent iconType="arrowIcon" iconSize="12"/>
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
};

FormCourse.propTypes = {
    list: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }))).isRequired,
};

FormCourse.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                name: PropTypes.string,
                tagName: PropTypes.string,
            })
        )
    ).isRequired,
};


export default FormCourse;