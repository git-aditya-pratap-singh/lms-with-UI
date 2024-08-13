//import Table from "../../components/students/Table";
import { useSelector } from "react-redux";
import { useLoaderData } from 'react-router-dom';

import StudentAddTable from "../../components/form/StudentAddTable";
import AddForm from "../../components/students/StudentForm";

const Registration = () => {
  
  const tempStudentList = useLoaderData();
  const studentsPopup = useSelector((store) => store.openPopup.add_student_popup);

  return (
    <>
      <section className="space-y-3">

        <div className="w-48 pb-5">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
            bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
          </div>
        </div>
      </section>

      <StudentAddTable list={tempStudentList.data} />

      {/* Add Form */}
      {(studentsPopup.add || studentsPopup.edit) &&
        <div className={`transition-all-duration-700 ease w-full left-0 h-full top-0 fixed z-10 bg-[#0707077a] flex
                    justify-center items-center ease-in-out`}>
          <AddForm />
        </div>
      }
    </>
  )
}
export default Registration;