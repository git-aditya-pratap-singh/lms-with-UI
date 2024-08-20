import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { add_student_popup } from "../../redux/Slices/StateSlice";
import toTitleCase from "../../common/titleCase";

import { FaUserPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ig from "../../../assets/img/admin.jpg";
import "../../../assets/css/component/_studentaddTable.scss";

const StudentAddTable = (props) => {
    
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
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {props.list.map((item)=>{
                            return(
                                <tr key={item?._id}>
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
                                        <div className="font-bold">{toTitleCase(item?.name)}</div>
                                        <div className="text-sm opacity-50">INDIA</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                               {item?.email}
                                <br />
                                <span className="badge badge-ghost badge-sm">Dev-Students</span>
                            </td>
                            <td>+91 {item?.phone}</td>
                            <td>
                                {toTitleCase(item?.gender)}
                            </td>
                            <td>
                                {item?.selectedCourseList.map((items) => {
                                  return (
                                   <span key={items._id} 
                                   className="badge badge-ghost badge-sm">
                                    {toTitleCase(items?.label)}</span>
                                );
                                })}
                            </td>
                            <td>
                                {item?.address}
                            </td>
                        
                            <td>
                                <span className="flex gap-5">
                                    <FaUserPlus size={18} className="text-gray-600 cursor-pointer ease-in-out duration-200 active:scale-90 hover:text-green-500"
                                    onClick={()=>
                                        dispatch(add_student_popup({check: true, key: 'add'}))}/> 
                                    <MdDelete size={18} className="text-gray-600 cursor-pointer ease-in-out duration-200 active:scale-90 hover:text-red-500"/>
                                </span>
                            </td>
                        </tr> 
                            )
                        })}  
                    </tbody>
                    {/* foot */}
                </table>
            </div>
        </>
    )
}


StudentAddTable.propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        course: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      })
    ).isRequired,
};

export default StudentAddTable;