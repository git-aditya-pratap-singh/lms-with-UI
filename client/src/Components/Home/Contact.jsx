import { FaHome, FaPhone } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import { IoSend } from "react-icons/io5";
//import back from "../../assets/img/toor.jpg";
import "../../assets/css/_contact.scss";

const Contact = () => {
    return (
        <>
            <section className="_contactContainer">
                <div className="_childDiv1">
                    <h2>Get in <span>touch</span></h2>
                    <p id="msg">We believe that great things happen when people collaborate. Get in touch, and let is start a conversation.</p>
                    <div className="_info">
                        <div className="_block">
                            <span><FaHome size={25} /></span>
                            <div>
                                <label>Bengaluru,Karnataka,India</label>
                                <p>RMV 2nd Stage, NEW BEL Road</p>
                            </div>
                        </div>
                        <div className="_block">
                            <span><FaPhone size={25} /></span>
                            <div>
                                <label>+91 5845-89624</label>
                                <p>Sun to Sat 6am to 12pm.</p>
                            </div>
                        </div>
                        <div className="_block">
                            <span><IoMdMailUnread size={25} /></span>
                            <div>
                                <label>elearns1k@yahoo.com</label>
                                <p>Send us your query anytime!</p>
                            </div>
                        </div>
                    </div>
                    {/* <img src={back}/> */}
                </div>
                <div className="_childDiv2">
                    <div className="_contactForm">
                        <form>
                            <h2>Send Message...</h2>
                            <div className="inputBox">
                                <input type="text" name="user_name" required="required" />
                                <span>Full Name</span>
                            </div>

                            <div className="inputBox">
                                <input type="email" name="user_mail" required="required" />
                                <span>Email</span>
                            </div>

                            <div className="inputBox">
                                <textarea required="required" name="user_msg"></textarea>
                                <span>Type Your Message...</span>
                            </div>

                            <div className="inputBox">
                                <button className="bg-[#007DFC] p-2 w-28 rounded-md 
                        text-white shadow-md flex justify-center items-center gap-x-2 active:scale-90 ease-in-out duration-300">
                                    <IoSend /> Send</button>
                            </div>
                        </form>
                    </div>
                </div>

            </section>

        </>
    )
}

export default Contact;