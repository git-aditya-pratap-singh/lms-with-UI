//import { FaUser } from "react-icons/fa";
import { FaBookOpen, FaHandHoldingDollar, FaDollarSign, FaTag, FaBuffer } from "react-icons/fa6";
import { FaVideo, FaLink } from "react-icons/fa";

import { Editor } from 'primereact/editor';


import "../../../assets/css/component/_formcourse.scss";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

const FormCourse = () => {
    return (
        <>
            <section className="_courseForm">

                <form className="_courseForm1">
                    {/* Name */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Name
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    < FaBookOpen color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course name.."
                            />
                        </div>
                    </div>



                    {/* Discription. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Discription
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-600 sm:text-sm">

                                </span>
                            </div>
                            <div className="card">
                                <Editor style={{ height: '250px' }} />
                            </div>
                        </div>
                    </div>


                    {/* Price */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Price
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaHandHoldingDollar color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Price..."
                            />
                        </div>
                    </div>

                    {/* Estimated Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Estimated Price(optional)
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaDollarSign color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Estimated Price.."
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Tags
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaTag color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Tags.."
                            />
                        </div>
                    </div>


                    {/* categories */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Categories
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaBuffer color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Course name.."
                            />
                        </div>
                    </div>

                    {/* Level */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Level
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">


                            <select className="block w-full rounded-md border-0 py-2 pl-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6">
                                <option disabled selected>Select Course Level</option>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                                <option>Deep Dive</option>
                            </select>
                        </div>
                    </div>

                    {/* Video Title */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Video Title
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaVideo color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Video Title.."
                            />
                        </div>
                    </div>


                    {/* Video URL */}
                    <div className="">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Video URL
                        </label>
                        <div className="w-full relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaLink color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="url"
                                id="url"
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
                                    <FaLink color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="sourceCode"
                                id="sourceCode"
                                className="block w-full rounded-md border-0 py-2 pl-9 pr-7 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the Source Code Link.."
                            />
                        </div>
                    </div>

                    {/* Video Discription. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Video Discription
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-600 sm:text-sm">

                                </span>
                            </div>
                            <textarea
                                name="videodes"
                                id="videodes"
                                className="resize-none block w-full rounded-md border-0 py-2 pl-3 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter the Video Discription.."
                                rows="3">

                            </textarea>
                        </div>
                    </div>

                    {/* Video Discription. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Course Benifits
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-600 sm:text-sm">

                                </span>
                            </div>
                            <textarea
                                name="benifit"
                                id="benifit"
                                className="resize-none block w-full rounded-md border-0 py-2 pl-3 pr-20 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter the Course Benifits.."
                                rows="3">

                            </textarea>
                        </div>
                    </div>

                    {/* Select Facuility & Upload Video. */}

                    <div className="space-y-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-600">
                            Select Facuilty
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <select className="block w-full rounded-md border-0 py-2 pl-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6">
                                <option disabled selected>Select Course Facuilty</option>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                                <option>Deep Dive</option>
                            </select>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs h-10" />
                    </div>


                </form>

            </section>


        </>
    )
}


export default FormCourse;