import PropTypes from "prop-types";

import { BiLogInCircle } from "react-icons/bi";
import { FaPen, FaGraduationCap, FaCode} from "react-icons/fa6";
import { FaLaptopCode, FaBookReader, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { PiCertificate, PiUsersThree, PiBooksLight, PiApplePodcastsLogoLight, PiCertificateLight } from "react-icons/pi";
import { MdComputer } from "react-icons/md";

import header from "../../../assets/img/home-image.png";
import join from "../../../assets/img/cd.png";
import img_1 from "../../../assets/img/img_1.jpg";
import img_2 from "../../../assets/img/img_2.jpg";
import img_3 from "../../../assets/img/img_3.jpg";
import user from "../../../assets/img/user.jpg";

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { useDispatch, useSelector } from "react-redux"
import { login_popup, registration_popup } from "../../redux/Slices/StateSlice"

import Registration from "./Registration";
import OtpRegistrationLayout from './OtpRegistrationLayout';

import "../../../assets/css/home/_home.scss";
import Data from "../../Data/Data.json";

const iconComponents = {
    FaGraduationCap,
    FaLaptopCode,
    FaCode,
    HiSpeakerphone,
    FaBookReader,
    FaChalkboardTeacher,
    FaUserGraduate,
    PiCertificate,
    PiCertificateLight,
    MdComputer,
    PiApplePodcastsLogoLight,
    PiBooksLight
    // Add more icons here as needed
};


const Home = () => {
    const dispatch = useDispatch();
    const registrationState = useSelector((store)=>store.openPopup.open_registration);
    const registrationOTPpopupStatus = useSelector((store)=>store.openPopup.registrationOTPpopup);
    return (
        <> 
        { registrationState && <Registration/> }
        { registrationOTPpopupStatus && <OtpRegistrationLayout/> }

            <section className="_container">
                <div className="_subContainer1">
                    <span>The Leader in Online Learning</span>
                    <h1>Better <span>Learning future</span> starts with elearn</h1>
                    <span>It is a long established fact that reader will be distracted readable content of a page when.</span>
                    <div className="_btnSection">
                        <button className="_loginbtn1" 
                        onClick={()=>dispatch(registration_popup(true))}><FaPen />Register here..</button>
                        <button className="_loginbtn2" 
                        onClick={()=>dispatch(login_popup(true))}><BiLogInCircle />login</button>
                    </div>
                </div>
                <div className="_subContainer2">
                    <div className="_subIconContainer">
                        <span><PiUsersThree /></span>
                        <div>
                            <h1>7500+</h1>
                            <p>Active Students</p>
                        </div>
                    </div>
                    <div className="_subIconContainer2">
                        <span><PiCertificate /></span>
                        <div>
                            <h1>4500+</h1>
                            <p>Total Courses</p>
                        </div>
                    </div>
                    <img src={header} className="_img" />
                </div>
            </section>
            <Carrier />
            <Trained />
            <MasterSkills />
            <Strip/>
            <Review />
            
        </>
    )
};


const Carrier = () => {
    return (
        <>
            <section className="_carrier">
                <h1 className="_carrierText">Browse Top Essential <span>Carrier Course</span></h1>
                <div className="_grid">
                    {
                        Data.Carrier_course.map((data) => {
                            return (
                                <CarrierItem 
                                key={data.id}
                                icon={data.icon}
                                heading={data.heading}
                                paragraph={data.paragraph}
                                />
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
};


const CarrierItem = ({icon, heading, paragraph }) => {
    const IconComponent = iconComponents[icon];   // Get the icon component based on the icon name
    return (
        <div className="_grid-item">
            <span>{IconComponent && <IconComponent />}</span>
            <h1>{heading}</h1>
            <p>{paragraph}</p>
        </div>
    )
}
CarrierItem.propTypes={
   icon:PropTypes.string.isRequired,
   heading:PropTypes.string.isRequired,
   paragraph:PropTypes.string.isRequired
}

const Trained = () => {
    const imgData = [img_1, img_2, img_3];
    return (
        <>
            <section className="_TrainedSection">
                <div className="_Trained-child-1">
                    <span>Learn with elearn</span>
                    <h1>Get Trained By Exports & Professionals around the World</h1>
                    <p>It is a dynamic platform fostering global learning. With a diverse array of courses, it connects eager learners to seasoned specialists hailing from various corners of the globe.
                        Through interactive sessions and hands-on modules, it offers unparalleled insights and expertise.
                        Students gain access to a rich tapestry of knowledge, benefiting from the firsthand experience of industry leaders across continents.
                        Its curated curriculum spans industries, from tech and business to arts and sciences, ensuring comprehensive learning opportunities. With a commitment to excellence,
                        it empowers individuals to thrive in their respective fields by imbibing world-class wisdom. </p>
                    <div className="_image-slide">
                        {
                            imgData.map((imgPath, index) => {
                                return (
                                        <span key={index}>
                                            <img src={imgPath} alt="error!" className="_img" />
                                        </span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="_Trained-child-2">
                    {
                        Data.trainedSection.map((item) => {
                            const IconComponent = iconComponents[item.icon];
                            return (
                                <div className="_sub-child" key={item.id}>
                                    <span>{IconComponent && <IconComponent />}</span>
                                    <h1>{item.name}</h1>
                                    <p>{item.subname}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}

const MasterSkills = () => {
    return (
        <>
            <section className="_masterSkills">
                <div className="_child-masterSkills-1">
                    <label>What is New</label>
                    <h1>Master the Skills to drive your Career</h1>
                    <p>Get certified, master modern tech skills, and level up your career - whether you are starting out or a seasoned pro.
                        95% of eLearning learners report our hands - on content directly halped their careers.
                    </p>
                    <div className="_subChild-masterSkills">
                        {
                            Data.masterSkills.map((item) => {
                                const IconComponent = iconComponents[item.icon];
                                return (
                                        <div className="_subChild-container" key={item.id}>
                                            <span>{IconComponent && <IconComponent />}</span>
                                            <p>{item.msg}</p>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="_child-masterSkills-2">
                    <img src={join} className="" />
                </div>
            </section>
        </>
    )
}

const Strip = ()=>{
    return(
        <>
        <section className="_stripDetails">
                {
                    Data.trainedSection.map((item) => {
                        const IconComponent = iconComponents[item.icon];
                        return (
                                <div className="_sub-strip" key={item.id}>
                                    <span>{IconComponent && <IconComponent />}</span>
                                    <div>
                                        <h1>{item.name}</h1>
                                        <p>{item.subname}</p>
                                    </div>
                                </div>
                        )
                    })
                }
            </section>
        </>
    )
}

const Review = () => {
    return (
        <>
            <section className="_review">
                <p>Testimonial</p>
                <h1>What Says <span>Our Students</span></h1>
                
                <div className="_studentReview">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        centeredSlides={false}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: false,
                        }}

                        modules={[Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            "0": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },

                            "800": {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            "1100": {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            "1200": {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            "1900": {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            }
                        }}
                    >
                        {
                            Data.review.map((item) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <ReviewSection {...item} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </section>

        </>
    )
}


const ReviewSection = ({ review, reviewName, desigination }) => {
    return (
        <>
            <div className="_reviewSection">
                <span>⭐⭐⭐⭐⭐</span>
                <p>{review}</p>
                <span className="_reviewByName">
                    <img src={user} alt="error!" />
                    <span>
                        <h2>{reviewName}</h2>
                        <label>- {desigination}</label>
                    </span>
                </span>
            </div>
        </>
    )
}
ReviewSection.propTypes={
    review : PropTypes.string.isRequired,
    reviewName : PropTypes.string.isRequired,
    desigination : PropTypes.string.isRequired
}

export default Home;