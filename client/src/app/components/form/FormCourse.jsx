import { useState } from "react";
import PropTypes from 'prop-types';
import Select from 'react-select'
import JoditEditor from 'jodit-react';
import toTitleCase from '../../common/titleCase';
import Apiadmin from "../../_api/admin/Apiadmin.service";
import IconComponent from "../../../assets/icons/IconComponent";

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
        courseVideo: '',
        courselogo: ''
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
            if (!courseData.courseVideo) 
                error.courseVideo = 'Please! Upload a Video.'

            //------------course courselogo -----------------
            if (!courseData.courselogo) 
                error.courselogo = 'Please! Upload a Logo.'

            return error;
        }

        const validateFormError = FormValidation();

        if (Object.keys(validateFormError).length > 0) 
            setError(validateFormError);
        else {
            setError(validateFormError);
            {/* Api Calling */ }
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
                <form className="_courseForm1" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Name <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <IconComponent iconType="bookopenIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="courseName"
                                value={courseData.courseName}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course name.."
                            />
                        </div>
                        {error.courseName && <label className="text-red-500 text-sm -mt-3">{error.courseName}</label>}
                    </div>

                    {/* Discription. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
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
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <IconComponent iconType="holdDollerIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="coursePrice"
                                value={courseData.coursePrice}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Price..."
                            />
                        </div>
                        {error.coursePrice && <label className="text-red-500 text-sm -mt-3">{error.coursePrice}</label>}
                    </div>

                    {/* Estimated Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Estimated Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="dollerIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="courseEstiPrice"
                                id="courseEstiPrice"
                                value={courseData.courseEstiPrice}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Estimated Price.."
                            />
                        </div>
                        {error.courseEstiPrice && <label className="text-red-500 text-sm -mt-3">{error.courseEstiPrice}</label>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Tags <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="tagIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <Select
                                options={courseTagsList}
                                isMulti
                                name="courseTags"
                                value={courseData.courseTags}
                                onChange={(selectedOptions) => setCourseData({ ...courseData, courseTags: selectedOptions })}
                            />
                        </div>
                        {error.courseTags && <label className="text-red-500 text-sm -mt-3">{error.courseTags}</label>}
                    </div>

                    {/* categories */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Categories <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="bufferIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="courseCategories"
                                id="courseCategories"
                                value={courseData.courseCategories}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course name.."
                            />
                        </div>
                        {error.courseCategories && <label className="text-red-500 text-sm -mt-3">{error.courseCategories}</label>}
                    </div>

                    {/* Level */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Level <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <select name="courseLevel" value={courseData.courseLevel} onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6">
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
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Video Title <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <IconComponent iconType="videoIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="videoTitle"
                                value={courseData.videoTitle}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Video Title.."
                            />
                        </div>
                        {error.videoTitle && <label className="text-red-500 text-sm -mt-3">{error.videoTitle}</label>}
                    </div>

                    {/* Video URL */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Video URL
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                   <IconComponent iconType="videoIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="videoURL"
                                value={courseData.videoURL}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Video URL.."
                            />
                        </div>
                    </div>

                    {/* Source Code */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Source Code Link
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <IconComponent iconType="linkIcon" iconColor="#007DFC"/>
                                </span>
                            </div>
                            <input
                                type="text"
                                name="sourceCode"
                                value={courseData.sourceCode}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Source Code Link.."
                            />
                        </div>
                    </div>

                    {/* Course Benifits */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
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
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Select Faculity <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm bg-black">
                            <Select
                                options={faculityList}
                                isMulti
                                name="faculity"
                                value={courseData.faculity}
                                onChange={(selectedOptions) => setCourseData({ ...courseData, faculity: selectedOptions })}
                            />
                        </div>
                        {error.faculity && <label className="text-red-500 text-sm -mt-3">{error.faculity}</label>}
                    </div>

                    {/* Upload Video. */}
                    <div className="w-full space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Video upload here.. <span className="text-red-500">*</span>
                        </label>
                        <input type="file"
                            name="courseVideo"
                            className="file-input file-input-bordered w-full h-10"
                            value={courseData.courseVideo}
                            onChange={handleChange} />
                        {error.courseVideo && <label className="text-red-500 text-sm -mt-3">{error.courseVideo}</label>}
                    </div>

                    {/* Logo Upload. */}
                    <div className="w-full space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Course Logo upload here.. <span className="text-red-500">*</span>
                        </label>
                        <input type="file"
                            name="courselogo"
                            className="file-input file-input-bordered w-full h-10"
                            value={courseData.courselogo}
                            onChange={handleChange} />
                        {error.courselogo && <label className="text-red-500 text-sm -mt-3">{error.courselogo}</label>}
                    </div>


                    <div className="flex justify-end items-center">
                        <button className=" w-24 flex justify-center items-center gap-x-2 bg-[#007DFC] p-2 text-white rounded 
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