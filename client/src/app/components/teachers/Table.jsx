//import { useContext } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { add_teacher_popup } from "../../Store/Slices/StateSlice";
import toTitleCase from "../../common/titleCase"

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ig from "../../../assets/img/admin.jpg";
import "../../../assets/css/component/_table.scss";

const Table = (props) => {
  const dispatch = useDispatch();
  //const allTeacherList = useContext(teacherContext)
  console.log(props.list);

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
                  <FaEdit size={18} className="text-[#00FFCC]" />
                  <MdDelete size={18} className="text-[#FF3675]" />
                </span>
              </th>
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
                      <span className="badge badge-ghost badge-sm">
                        Dev-Teachers
                      </span>
                    </td>
                    <td>+91 {item?.phone}</td>
                    <td>{item?.gender}</td>
                    <td>{item?.course}</td>
                    <td>
                      <label className="p-[0.3rem] rounded bg-[#a6ffe6] text-[#1E8267]">
                        {item?.status}
                      </label>
                    </td>
                    <td>
                      <span className="flex gap-5">
                        <FaEdit
                          size={18}
                          className="text-[#00FFCC] cursor-pointer ease-in-out duration-200 active:scale-90"
                          onClick={() =>
                            dispatch(
                              add_teacher_popup({ check: true, key: "edit", item: item})
                            )
                          }
                        />
                        <MdDelete
                          size={18}
                          className="text-[#FF3675] cursor-pointer"
                        />
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
    list: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imgUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })).isRequired,
  };
export default Table;
