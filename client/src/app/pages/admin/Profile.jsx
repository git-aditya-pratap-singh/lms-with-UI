import { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { img_update_popup } from "../../Store/Slices/StateSlice";
import { useAuthGuard } from "../../_guard/auth.guard";
import toTitleCase from "../../common/titleCase";
import ApiService from "../../_service/api.service";

import { FaEdit, FaUser, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

import ag from "../../../assets/img/admin.jpg";
import "../../../assets/css/admin/_profile.scss";

const Profile_admin = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        designation: "",
        name: "",
        email: "",
        phone: "",
        hasAllAccess: "",
        dob: "",
        gender: "",
        address: ""
    });

    const [auth, setAuth] = useAuthGuard();
    console.log(auth)

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const validateFormData = () => {
            return (
                !formData.name ? toast.warning("Name can not be empty!") :
                !formData.email ? toast.warning("Email can not be empty!") :
                !formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ? toast.warning("Invalid email!") :
                !formData.phone ? toast.warning("Phone can not be empty!") :
                !formData.dob ? toast.warning("DOB can not be empty!") :
                !formData.gender ? toast.warning("Please, Choose any gender!") :
                !formData.hasAllAccess ? toast.warning("Please, Choose any AccessType!") :
                !formData.address ? toast.warning("Address can not be empty!") :
                true
            );
        }
        if (validateFormData() !== true) {
            return;
        } else {
            // build userName---------
            const userName = formData.name.split(" ")[0].toLowerCase();
            setFormData({...formData, ['username']: userName})
            // Api Call
            API_CALL(formData);
        }
    }

    const API_INSTANCE = new ApiService();

    const API_CALL = async(formData)=>{
        try{
            const response = await API_INSTANCE.post('/admin/updateDetails', formData);

            if(response.status){
                    // storeTokenInStorage(response.data);
                    // setAuth({
                    //   ...auth,
                    //   user: response.data.userValid,
                    //   token: response.data.token
                    // });
                    
                    // dispatch(login_popup(false))
                toast.success(response.message);
            }else{
                toast.error(response.message);
            }

        }catch(err){
            console.error('API call error:', err);
            toast.error('An error occurred while trying to log in.');   
        }
    }

    useEffect(() => {
        if (auth?.user) {
          setFormData(prevFormData => ({
            ...prevFormData,
            ...auth?.user
          }));
        }
      }, [auth?.user]);

    return (
        <>
            <section className="_container1">
                <div className="_subContainer11">
                    <div className="_profile">
                        <img src={ag} alt="Error!" />
                    </div>
                    <div className="_pfedit"
                        onClick={() => dispatch(img_update_popup(true))}
                    ><FaEdit /></div>
                </div>

                <div className="_subContainer22">

                    <div className="flex justify-start items-center gap-x-10">
                        <h2>Username:
                            <span className="text-blue-500">{formData.username}</span>
                        </h2>
                        <h2>Role:
                            <span className="text-blue-500">{formData.designation}</span>
                        </h2>
                    </div>

                    <form className="_infodetails" onSubmit={handleSubmit}>

                        <span>
                            <label>
                                <FaUser />
                            </label>
                            <input type="text" placeholder="enter name..." name="name"
                                value={toTitleCase(formData.name)}
                                onChange={handleChange} />
                        </span>

                        <span>
                            <label>
                                <MdOutlineAlternateEmail />
                            </label>
                            <input type="email" placeholder="enter email..." name="email"
                                value={formData.email}
                                onChange={handleChange} />
                        </span>

                        <span>
                            <label>
                                <FaPhoneAlt />
                            </label>
                            <input type="text" placeholder="enter phone no..." name="phone"
                                value={formData.phone}
                                onChange={handleChange} />
                        </span>

                        {/* <span>
                            <label>
                                <FaPhoneAlt />
                            </label>
                            <input type="text" placeholder="enter another phone no..." name="ano_phone" />
                        </span> */}

                        <span>
                            <label>
                                <FaCalendarAlt />
                            </label>
                            <input type="date" placeholder="enter DOB..." name="dob"
                                value={formData.dob}
                                onChange={handleChange} />
                        </span>

                        <div className="flex justify-start items-center space-x-4">
                            <label>Gender : </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p>Male</p>
                                <input type="radio"
                                    name="radio-gender"
                                    className="radio radio-primary"
                                    value="Male"
                                    checked={formData.gender === 'Male'}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p>Female</p>
                                <input type="radio"
                                    name="radio-gender"
                                    className="radio radio-primary"
                                    value="Female"
                                    checked={formData.gender === 'Female'}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="flex justify-start items-center space-x-4">
                            <label>All-Access : </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p>True</p>
                                <input type="radio"
                                    name="radio-access"
                                    className="radio radio-primary"
                                    value="true"
                                    checked={formData.hasAllAccess === true}
                                    onChange={handleChange}

                                />
                            </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p>false</p>
                                <input type="radio"
                                    name="radio-access"
                                    className="radio radio-primary"
                                    value="false"
                                    checked={formData.hasAllAccess === false}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>


                        <textarea className="textarea textarea-bordered"
                            style={{ resize: "none" }}
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                        >
                        </textarea>
                        <button><GrUpdate />Update</button>
                    </form>

                </div>
                <ImgUpdate />
            </section>
        </>
    )
}


const ImgUpdate = () => {

    const popupState = useSelector((store) => store.openPopup.img_update_popup);
    const dispatch = useDispatch();

    return (
        <>
            <section className={`w-full h-full absolute bg-[#07070763] flex 
            justify-center items-start duration-300 ease-in-out ${popupState ? "scale-100" : "scale-0"}`}>

                <form className="_imgupdate mt-16">
                    <span className="flex justify-between items-center">
                        <h2 className="text-gray-700 font-semibold text-xl">Upload Image..!</h2>
                        <h3 style={{ cursor: "pointer" }} onClick={() =>
                            dispatch(img_update_popup(false))}><RxCross1 /></h3>
                    </span>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs h-10" />
                    <button><GrUpdate />Update</button>
                </form>

            </section>
        </>
    )
}

ImgUpdate.propTypes = {
    toggle: PropTypes.any.isRequired
}


export default Profile_admin;