
import { useDispatch } from "react-redux";
import { add_student_popup } from "../../Store/Slices/StateSlice";

import { FaUserPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ig from "../../../assets/img/admin.jpg";
import "../../../assets/css/component/_studentaddTable.scss";

const StudentAddTable = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="_tableContainerAdd">
                
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone no.</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-[#00FFCC]"/> 
                                    <MdDelete size={18} className="text-[#FF3675]"/>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-[#FFBAD6] text-[#CC0052]">Inactive</label>
                            </td>
                        
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-[#00ffcc8b] cursor-pointer ease-in-out duration-200 active:scale-90"
                                    onClick={()=>
                                        dispatch(add_student_popup({check: true, key: 'add'}))}/> 
                                    <MdDelete size={18} className="text-[#FF3675] cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-[#FFBAD6] text-[#CC0052]">Inactive</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-green-400 cursor-pointer"/> 
                                    <MdDelete size={18} className="text-[#FF0066] cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-green-300">Active</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-green-400 cursor-pointer"/> 
                                    <MdDelete size={18} className="text-red-500 cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-green-300">Active</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-green-400 cursor-pointer"/> 
                                    <MdDelete size={18} className="text-red-500 cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-green-300">Active</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    
                                    <button className="_bt bg-green-50 "
                            onClick={() => 
                                dispatch(add_student_popup({check: true, key:'add'}))}>
                                <FaUserPlus size={18} className="text-green-400 cursor-pointer" /></button>

                                    <MdDelete size={18} className="text-red-500 cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-green-300">Active</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-green-400 cursor-pointer"/> 
                                    <MdDelete size={18} className="text-red-500 cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ig} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Aditya Pratap Singh</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                dev.theaditya@gmail.com
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-green-300">Active</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-green-400 cursor-pointer"/> 
                                    <MdDelete size={18} className="text-red-500 cursor-pointer"/>
                                </span>
                            </td>
                        </tr>

                        
                        
                    </tbody>
                    {/* foot */}


                </table>
            </div>
        </>
    )
}
export default StudentAddTable;