import { FaFacebookF, FaTwitter, FaGoogle, FaPinterestP, FaDiscord, FaHome, FaPhoneAlt } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";

import '../../assets/css/_footer.scss';

const Footer = () => {
    return (
        <>
            <section className="_container-footer">
                <div className="_subContainer-1">
                    <h1>More About elearn</h1>
                    <p>elearn Solutions Inc. is a pioneering tech firm revolutionizing digital solutions in the field of cybersecurity.
                        Founded in 2024 by a team of cybersecurity experts, our mission is to safeguard businesses
                        and individuals from evolving digital threats while empowering them to navigate the online world with confidence.
                    </p>
                    <p className="_ceo">James Peter, CEO</p>
                </div>
                <div className="_subContainer-2">
                    <h2>Keep Connected</h2>
                    <div className="_icon">
                        <span>
                            <label><FaFacebookF /></label>Like us on facebook
                        </span>
                        <span>
                            <label><FaTwitter /></label>Follow on Twitter
                        </span>
                        <span>
                            <label><FaGoogle /></label>Add on us Google Plus
                        </span>
                        <span>
                            <label><FaDiscord /></label>Follow on Discord
                        </span>
                        <span>
                            <label><FaPinterestP /></label>Follow on Pinterest
                        </span>
                    </div>
                </div>

                <div className="_subContainer-3">
                    <h2>Contact Information</h2>
                    <div className="_icon">
                        <span>
                            <span><FaHome /></span>
                            1600 Amphitheatre Parkway
                            Mountain View, CA 94043
                            United States
                        </span>
                        <span>
                            <span><FaPhoneAlt /></span>+91 9889399250
                        </span>
                        <span>
                            <span><IoMdMailUnread /></span>elearn.web.@yahoo.in
                        </span>
                    </div>
                </div>
            </section>
            <section className="_bottom">
                <h1>Copyright - 2024 Wep Application made by <span>Aditya Singh</span> @all Rights Reserved.</h1>
            </section>
        </>
    )
}

export default Footer;