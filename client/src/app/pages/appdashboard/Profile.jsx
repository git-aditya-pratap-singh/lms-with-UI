import { useState, useEffect, Suspense, lazy } from 'react';
import PropTypes from "prop-types";
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { img_update_popup } from "../../redux/Slices/StateSlice";
//import  AboutShimmersLoad from "../../components/shimmers/AboutShimmers";
//import { useAuthGuard, storeTokenInStorage } from "../../_guard/auth.guard";
import toTitleCase from "../../common/titleCase";
import DateFormet from "../../common/dateFormet";
import ApiService from "../../_service/api.service";
import Apiadmin from "../../_api/admin/Apiadmin.service";

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
        hasAllAccess: null,
        dob: "",
        gender: "",
        address: ""
    });

    //const [auth, setAuth] = useAuthGuard();
    const userprofileData = useLoaderData();
    const AboutShimmersLoad = lazy(()=> import('../../components/shimmers/AboutShimmers'));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

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
            setFormData({ ...formData, ['username']: userName })
            // api call
            new Apiadmin().profileUpdate(formData);
        }
    }

    useEffect(() => {
        if (userprofileData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                ...userprofileData
            }));
        }
    }, [userprofileData]);

    console.log(formData)

    return (
        <>
        <Suspense fallback={<AboutShimmersLoad/>}>
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

                    <div className="flex justify-start items-center gap-x-10 text-[var(--foreground)]">
                        <h2>Username:
                            <span className="text-[var(--primary)]"> {formData.username}</span>
                        </h2>
                        <h2>Role:
                            <span className="text-[var(--primary)]"> {formData.designation}</span>
                        </h2>
                    </div>

                    <form className="_infodetails" onSubmit={handleSubmit}>

                        <span>
                            <label>
                                <FaUser />
                            </label>
                            <input type="text" placeholder="enter name..." name="name" className="bg-[var(--background)] text-[var(--foreground)]"
                                value={toTitleCase(formData.name)}
                                onChange={handleChange} />
                        </span>

                        <span>
                            <label>
                                <MdOutlineAlternateEmail />
                            </label>
                            <input type="email" placeholder="enter email..." name="email" className="bg-[var(--background)] text-[var(--foreground)]"
                                value={formData.email}
                                onChange={handleChange} />
                        </span>

                        <span>
                            <label>
                                <FaPhoneAlt />
                            </label>
                            <input type="text" placeholder="enter phone no..." name="phone" className="bg-[var(--background)] text-[var(--foreground)]"
                                value={formData.phone}
                                onChange={handleChange} />
                        </span>

                        <span>
                            <label>
                                <FaCalendarAlt />
                            </label>
                            <input type="date" placeholder="enter DOB..." name="dob" className="bg-[var(--background)] text-[var(--foreground)]"
                                value={DateFormet(formData.dob)}
                                onChange={handleChange} />
                        </span>

                        <div className="flex justify-start items-center space-x-4">
                            <label className="text-[var(--foreground)]">Gender : </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p className="text-[var(--foreground)]">Male</p>
                                <input type="radio"
                                    name="gender"
                                    className="radio radio-primary accent-[var(--primary)]"
                                    value="Male"
                                    checked={formData.gender === 'Male'}
                                    onChange={handleChange}
                                />
                            </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p className="text-[var(--foreground)]">Female</p>
                                <input type="radio"
                                    name="gender"
                                    className="radio radio-primary accent-[var(--primary)]"
                                    value="Female"
                                    checked={formData.gender === 'Female'}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="flex justify-start items-center space-x-4">
                            <label className="text-[var(--foreground)]">All-Access : </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p className="text-[var(--foreground)]">True</p>
                                <input type="radio"
                                    name="hasAllAccess"
                                    className="radio radio-primary accent-[var(--primary)] "
                                    value="true"
                                    checked={formData.hasAllAccess == "true"}
                                    onChange={handleChange}

                                />
                            </label>
                            <label className="flex justify-center items-center space-x-2">
                                <p className="text-[var(--foreground)]">False</p>
                                <input type="radio"
                                    name="hasAllAccess"
                                    className="radio radio-primary accent-[var(--primary)]"
                                    value="false"
                                    checked={formData.hasAllAccess == "false"}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>


                        <textarea className="textarea textarea-bordered bg-[var(--background)] text-[var(--foreground)]"
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
        </Suspense>
        </>
    )
}


const ImgUpdate = () => {

    const popupState = useSelector((store) => store.openPopup.img_update_popup);
    const dispatch = useDispatch();
    const [file, setFile] = useState({
        file: ""
    });

    const API_INSTANCE = new ApiService();

    const FileUploadFunc = async (event) => {
        event.preventDefault();
        console.log(file)
        try {
            const response = await API_INSTANCE.post('/dashboard/profiles/uploadProfilePicture', { 'image': file.name });
            if (response.status) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }

        } catch (err) {
            toast.error('An error occurred while trying to upload image.');
        }
    }

    return (
        <>
            <section className={`w-full h-full absolute bg-[#07070763] flex 
            justify-center items-start duration-300 ease-in-out ${popupState ? "scale-100" : "scale-0"}`}>

                <form className="_imgupdate mt-16" encType="multipart/form-data" onSubmit={FileUploadFunc}>
                    <span className="flex justify-between items-center">
                        <h2 className="text-gray-700 font-semibold text-xl">Upload Image..!</h2>
                        <h3 style={{ cursor: "pointer" }} onClick={() =>
                            dispatch(img_update_popup(false))}><RxCross1 /></h3>
                    </span>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs h-10"
                        name="image" accept="image/*" required onChange={(event) => setFile(event.target.files[0])} />
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