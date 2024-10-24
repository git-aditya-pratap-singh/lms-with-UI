import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { add_teacher_popup } from "../../redux/Slices/StateSlice";
import toTitleCase from "../../common/titleCase";
import profileName from "../../common/profileName";
import getRandomHexColor from "../../common/randomColorgenerate";
import IconComponent from "../../../assets/icons/IconComponent"; 

import "../../../assets/css/component/_table.scss";

const Table = (props) => { 

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.list.map((item) => {
              return (
                <tr key={item?._id}>
                  <td>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="avatar placeholder">
                          <div className={`text-white w-11 shadow rounded-full`} style={{ backgroundColor: getRandomHexColor()}} >
                            <span className="text-[1rem]">{profileName(item?.name)}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {toTitleCase(item?.name)}
                        </div>
                        <div className="text-sm opacity-60">INDIA</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item?.email}
                    <br />
                    <span className= "text-[0.7rem] p-[0.2rem] rounded-sm shadow-sm bg-[#a6ffe6] text-[#1E8267]">
                      Dev-Teachers
                    </span>
                  </td>
                  <td>+91 {item?.phone}</td>
                  <td>{item?.gender}</td>
                  <td>
                    {item?.courseList.map((items) => {
                      return (
                        <span key={items._id} className="m-1 text-[0.7rem] p-[0.2rem] rounded-sm shadow-sm bg-[#a6ffe6] text-[#1E8267]">{toTitleCase(items?.label)}</span>
                      );
                    })}
                  </td>
                  <td>
                    <label
                      className={`p-[0.3rem] rounded ${
                        item?.status === "Active"? "bg-[#a6ffe6] text-[#1E8267]": "bg-[#FFBAD6] text-[#CC0052]"
                      }`}
                    >
                      {item?.status}
                    </label>
                  </td>
                  <td>
                    <span className="flex gap-5">
                      <label onClick={() => dispatch(add_teacher_popup({ check: true, key: "edit", item: item}) )}>
                        <IconComponent iconType="editIcon" iconSize="18" 
                           iconStyle="text-gray-600 cursor-pointer ease-in-out duration-200 active:scale-90 hover:text-green-500"/>
                      </label>
                     
                     <label>
                        <IconComponent iconType="deleteIcon" iconSize="18" 
                          iconStyle="text-gray-600 cursor-pointer ease-in-out duration-200 active:scale-90 hover:text-red-500" />
                     </label>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imgUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Table;
