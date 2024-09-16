
import { add_student_popup } from "../../redux/Slices/StateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from 'react-router-dom';
import Table from "../../components/students/Table";
import AddForm from "../../components/students/StudentForm";
import Apiadmin from "../../_api/admin/Apiadmin.service";

import { FaUserPlus, FaDownload  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "../../../assets/css/admin/_students.scss";

const Students = () => {

    const dispatch = useDispatch();
    const studentsPopup = useSelector((store) => store.openPopup.add_student_popup);
    const itemList = useLoaderData();

    const DownloadToExcelSheet = async() =>{
        const download = await new Apiadmin().downloadExcelSheetforStudents();

    }

    return (
        <>
            <section className="_studentContainer">
                <div className="_studentSubConatiner1">
                    <div className="_studentSearch">

                        <div className="_searchToggle">
                            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 ring-1 ring-gray-300 rounded-lg
                                    bg-gray-50 focus:ring-blue-500" placeholder="Search..." required />
                            </div>
                        </div>
                    </div>
                    <div className="_studentAddDel">

                        <button className="_bt bg-green-50 "
                            onClick={() => 
                                dispatch(add_student_popup({check: true, key:'add', item: ''}))}>
                                <FaUserPlus  className="text-green-600" /></button>

                        <button className="_bt bg-red-100 text-red-500"><MdDelete /></button>
                        <button className="_bt bg-blue-100 text-blue-500" title="Download to Excel"
                        onClick={DownloadToExcelSheet}><FaDownload/></button>
                        
                    </div>

                </div>

                <div className="_studentSubContainer2">
                    <div className="_tableHeader">
                        <div role="tablist" className="tabs tabs-lifted _tav">
                            <a role="tab" className="tab tab-active [--tab-bg:aliceblue;] [--tab-border-color:aliceblue] text-gray">All<span>(45)</span></a>
                            <a role="tab" className="tab">Active<span>(45)</span></a>
                            <a role="tab" className="tab">InActive<span>(45)</span></a>
                        </div>
                    </div>
                </div>
            </section>
            
            <Table list={itemList[0]}/>

            {/* Add Form */}
            {(studentsPopup.add || studentsPopup.edit) &&
                <div className={`transition-all-duration-700 ease w-full left-0 h-full top-0 fixed z-10 bg-[#0707077a] flex
                    justify-center items-center ease-in-out`}>
                    <AddForm courseList={itemList[1]}/>
                </div>
            }
        </>
    )
}

export default Students;