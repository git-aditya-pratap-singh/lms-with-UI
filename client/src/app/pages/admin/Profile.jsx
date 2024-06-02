import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { img_update_popup } from "../../Store/Slices/StateSlice"

import { FaEdit, FaUser, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

import ag from "../../../assets/img/admin.jpg";
import "../../../assets/css/admin/_profile.scss";

const Profile_admin = () => {

    const dispatch = useDispatch();
    
    return (
        <>
            <section className="_container1">
                <div className="_subContainer11">
                    <div className="_profile">
                        <img src={ag} alt="Error!" />
                    </div>
                    <div className="_pfedit" 
                    onClick={()=>dispatch(img_update_popup(true))}
                    ><FaEdit /></div>
                </div>

                <div className="_subContainer22">
                    <h2>Role: Admin</h2>

                    <form className="_infodetails">

                        <span>
                            <label>
                                <FaUser />
                            </label>
                            <input type="text" placeholder="enter name..." name="name" />
                        </span>

                        <span>
                            <label>
                                <MdOutlineAlternateEmail />
                            </label>
                            <input type="email" placeholder="enter email..." name="email" />
                        </span>

                        <span>
                            <label>
                                <FaPhoneAlt />
                            </label>
                            <input type="text" placeholder="enter phone no..." name="phone" />
                        </span>

                        <span>
                            <label>
                                <FaPhoneAlt />
                            </label>
                            <input type="text" placeholder="enter another phone no..." name="ano_phone" />
                        </span>

                        <span>
                            <label>
                                <FaCalendarAlt />
                            </label>
                            <input type="date" placeholder="enter DOB..." name="dob" />
                        </span>

                        <div className="flex justify-start items-center space-x-4">
                            <label>Gender : </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p>Male</p><input type="radio" name="radio-3" className="radio radio-primary" defaultChecked /></label>
                            <label className="flex justify-center items-center space-x-2">
                                <p>Female</p><input type="radio" name="radio-3" className="radio radio-primary" /></label>
                        </div>

                        <textarea className="textarea textarea-bordered" style={{resize: "none"}}placeholder="Address"></textarea>
                        <button><GrUpdate />Update</button>
                    </form>

                </div>
                <ImgUpdate/>
            </section>
        </>
    )
}

const ImgUpdate = () => {

    const popupState = useSelector((store)=>store.openPopup.img_update_popup);
    const dispatch = useDispatch();

    return (
        <>
            <section className={`w-full h-full absolute bg-[#07070763] flex 
            justify-center items-start duration-300 ease-in-out ${popupState ? "scale-100" : "scale-0"}`}>

                <form className="_imgupdate mt-16">
                    <span className="flex justify-between items-center">
                        <h2 className="text-gray-700 font-semibold text-xl">Upload Image..!</h2>
                        <h3 style={{cursor: "pointer"}} onClick={()=>
                        dispatch(img_update_popup(false))}><RxCross1 /></h3>
                    </span>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs h-10" />
                    <button><GrUpdate />Update</button>
                </form>
                
            </section>
        </>
    )
}

ImgUpdate.propTypes={
    toggle : PropTypes.any.isRequired
}
export default Profile_admin;