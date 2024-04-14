import { PiBooksLight } from "react-icons/pi";
import { FaChalkboardTeacher, FaRegLightbulb } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FcAddressBook, FcMindMap, FcPositiveDynamic  } from "react-icons/fc";

import ServiceImg from "../../../assets/img/serviceImg.jpg";

import Data from "../../Data/Data.json";
import "../../../assets/css/home/_service.scss";

const Service = () => {
    const iconComponents = {
        PiBooksLight,
        FaChalkboardTeacher,
        FaRegLightbulb,
        CiUser,
        IoEyeOutline,
        MdOutlineMarkEmailUnread
    }

    return (
        <>
            <section className="_serviceHeader">
                <label>Find the <span>best features</span> of elearn</label>
                <div className="_itemGrid">
                    {
                        Data.services.map((item,index) => {
                            const IconComponent = iconComponents[item.icon]
                            return (
                                <>
                                    <section className="_servicecard" key={index}>
                                        <div className="_head">
                                            <span>{IconComponent && <IconComponent/>}</span>
                                            <h2>{item.heading}</h2>
                                        </div>
                                        <p>{item.paragraph}</p>
                                    </section>
                                </>
                            )
                        })
                    }
                </div>
            </section>

            <section className="_serviceFooter">
                <div className="_serviceFooterChild-1">
                    <span>Best Online Learning Platform</span>
                    <h2>One Platform & Many <span>Courses</span> For You</h2>
                    <p>From blogs to emails to ad copies, auto-generate catchy, original, and high converting copies in popular tones languages.</p>
                    <div className="_checkbox">
                        <span className="_item">
                           <input type="checkbox" name="checkbox-checked" checked />
                           <label>9/10 Average Satisfaction Rate</label>
                        </span>
                        <span className="_item">
                           <input type="checkbox" name="checkbox-checked" checked />
                           <label>96% Completitation Rate</label>
                        </span>
                        <span className="_item">
                           <input type="checkbox" name="checkbox-checked" checked />
                           <label>Friendly Environment & Expert Teacher</label>
                        </span>
                    </div>
                </div>
                <div className="_serviceFooterChild-2">
                    <div className="_grid">
                        <div className="gridItem">
                            <span><FcAddressBook size={50}/></span>
                            <span>
                                <h2>20% off</h2>
                                <p>For all Course</p>
                            </span>
                        </div>
                        <div className="gridItem">
                            <span><FcMindMap  size={50}/></span>
                            <span>
                                <h2>MERN</h2>
                                <p>Many Tech.</p>
                            </span>
                        </div>
                        
                        <div className="gridItem">
                            <span><FcPositiveDynamic size={50}/></span>
                            <span>
                                <h2>Grow..</h2>
                                <p>For Your Skills</p>
                            </span>
                        </div>
                    </div>
                    <img src={ServiceImg} alt="" className=""/>
                </div>
            </section>
        </>
    )
}
export default Service;
