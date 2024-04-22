import { useDispatch } from "react-redux";
import { add_teacher_popup } from "../../Store/Slices/StateSlice";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ig from "../../../assets/img/admin.jpg";
import "../../../assets/css/component/_table.scss";

const Table = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="_tableContainer">
                
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
                                    <FaEdit size={18} className="text-green-400"/> 
                                    <MdDelete size={18} className="text-red-500"/>
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
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
                                    <FaEdit size={18} className="text-green-400 cursor-pointer ease-in-out duration-200 active:scale-90"
                                    onClick={()=>
                                        dispatch(add_teacher_popup({check: true, key: 'edit'}))}/> 
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
                            </td>
                            <td>+91 8433399250</td>
                            <td>
                                Male
                            </td>
                            <td>
                                Mern
                            </td>
                            <td>
                                <label className="p-[0.3rem] rounded bg-red-300">Inactive</label>
                            </td>
                            <td>
                                <span className="flex gap-5">
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"/> 
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
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
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"/> 
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
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
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"/> 
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
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
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"/> 
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
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
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"/> 
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
                                <span className="badge badge-ghost badge-sm">Dev-Teachers</span>
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
                                    <FaEdit size={18} className="text-green-400 cursor-pointer"/> 
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
export default Table;