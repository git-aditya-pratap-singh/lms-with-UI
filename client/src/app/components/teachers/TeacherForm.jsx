import { useDispatch, useSelector } from 'react-redux';
import { add_teacher_popup } from "../../Store/Slices/StateSlice";

import Select from 'react-select'
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";

import "../../../assets/css/component/_addform.scss";

const options = [
    { value: 'MERN', label: 'MERN' },
    { value: 'MEAN', label: 'MEAN' },
    { value: 'MEVN', label: 'MEVN' }
]

const TeacherForm = () => {

    const dispatch = useDispatch();
    const formCheck = useSelector((store) => store.openPopup.add_teacher_popup);

    return (
        <>
            <section className="_addForm">

                <div className='flex justify-between items-center'>
                    <h3>{`${formCheck.add ? 'Add' : 'Edit'} Teachers 🙋‍♂️`}</h3>
                    <span className='cursor-pointer'>
                        <RxCross1 onClick={() => {
                            if (formCheck.add == true) {
                                dispatch(add_teacher_popup({ check: false, key: 'add' }))
                            }
                            if (formCheck.edit == true) {
                                dispatch(add_teacher_popup({ check: false, key: 'edit' }))
                            }
                        }
                        }
                        />
                    </span>
                </div>
                <h2>{`Please, ${formCheck.add ? 'add' : 'edit'} Teachers`}</h2>
                <form className="_form">
                    {/* Name */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Name
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaUser color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 pl-9 pr-7 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#007DFC] sm:text-sm sm:leading-6"
                                placeholder="Enter the name.."
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Email
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <MdOutlineAlternateEmail color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-md border-0 py-1.5 pl-9 pr-7 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter the email.."
                            />
                        </div>
                    </div>

                    {/* phone no. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Phone no.
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">
                                    <FaPhoneAlt color='#007DFC' />
                                </span>
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="block w-full rounded-md border-0 py-1.5 pl-9 pr-10 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter the phone no.."
                            />
                        </div>
                    </div>

                    {/* Multiple select Course */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Select Course's
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">

                                </span>
                            </div>
                            <Select options={options}
                                isMulti
                            />
                        </div>
                    </div>

                    {/* Select Gender */}
                    <div className="space-x-2 flex items-center">
                        <label className="text-[0.9rem]">Gender : </label>
                        <div className="flex">
                            <div className="flex items-center me-4">
                                <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                            </div>
                        </div>
                    </div>

                    {/* Select Status */}
                    <div className="space-x-2 flex items-center">
                        <label className="text-[0.9rem]">Status : </label>
                        <div className="flex">
                            <div className="flex items-center me-4">
                                <input id="inline-radio" type="checkbox" value="" name="inline-radio-group" className="w-4 h-4 text-[#007DFC] bg-gray-100 border-gray-300 focus:ring-[#007DFC]
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 " defaultChecked />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input id="inline-radio" type="checkbox" value="" name="inline-radio-group" className="w-4 h-4 text-[#007DFC] bg-gray-100 border-gray-300 focus:ring-[#007DFC]
                 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 " disabled />
                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</label>
                            </div>
                        </div>
                    </div>

                    {/* Address. */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-3 text-gray-800">
                            Parmanent address
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-800 sm:text-sm">

                                </span>
                            </div>
                            <textarea
                                name="address"
                                id="address"
                                className="resize-none block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter the Parmanent address.."
                                rows="5">

                            </textarea>
                        </div>
                    </div>

                    {/* upload image */}
                    <div className='hidden md:block'>
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <MdPhotoSizeSelectActual className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    <button className='button'>
                        {`${formCheck.add ? 'Add Teachers' : 'Update'}`}
                        {formCheck.add ? <FaPlus/> : <GrUpdate />}
                    </button>
                </form>
            </section>
        </>
    )
}
export default TeacherForm;