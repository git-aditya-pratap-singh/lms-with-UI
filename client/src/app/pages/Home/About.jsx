import {NavLink} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import about_img from "../../../assets/img/about.png"
import admin from "../../../assets/img/admin.jpg";
//-------------ICON--------------------
import IconComponent from "../../../assets/icons/IconComponent";
//--------------CSS--------------------
import '../../../assets/css/home/_about.scss'

const About = () => {
    return (
        <>
            <section className='_header'>
                <div className='_subHeaderA'>
                    <img src={about_img} alt="Error!" />
                </div>
                <div className='_subHeaderB'>
                    <label>Learn New Skills To Go <span>Ahead For Your</span> Career.</label>
                    <p>One learns from books and example only that certain things can be done. Actual learning requires that you do those things.</p>
                    <div className='_childContainerA'>
                        <span><IconComponent iconType="laptopCodeIcon" /></span>
                        <div>
                            <label>Our Mission</label>
                            <p>Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young. The greatest
                                thing in life is to keep your mind young.</p>
                        </div>
                    </div>
                    <div className='_childContainerB'>
                        <span><IconComponent iconType="chalkBoardIcon" /></span>
                        <div>
                            <label>Our Vision</label>
                            <p>Study hard what interests you the most in the most undisciplined
                                irreverent and original manner possible.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Instructor />
            <Aboutme/>
        </>
    )
}

const Instructor = () => {
    return (
        <>
            <section className='_instructor'>
                <label>Our Expert <span>Instructors</span></label>
                 <div className="_scrollContainer">
                   <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    centeredSlides={false}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
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
                    
                    <SwiperSlide><Card/></SwiperSlide>
                    <SwiperSlide><Card/></SwiperSlide>
                    <SwiperSlide><Card/></SwiperSlide>
                    <SwiperSlide><Card/></SwiperSlide>
                </Swiper>
                </div>
            </section>
        </>
    )
}

const Card = () => {
    return (
        <>
            <section className='_cardSection'>
                <span>
                   <img src={about_img} alt="Error!" />
                </span>
                <div className="_infoSection">
                    <h2>Aditya Pratap Singh</h2>
                    <span>Software Developer</span>
                    <p><IconComponent iconType="booksIcon" />3 Courses</p>
                    <p><IconComponent iconType="userLineIcon" />45 Students</p>
                </div>
            </section>
        </>
    )
}

const Aboutme = ()=>{
    return(
        <>
        <section className="_class flex flex-col justify-center items-center space-y-5 w-11/12 mx-auto py-10 px-5 rounded" data-aos="zoom-in">
            <h1 className="font text-4xl text-[var(--primary)]">About me</h1>
            <img src={admin} alt="Error!" className="w-44 h-44 object-cover rounded-full flex justify-center items-center drop-shadow-xl" data-aos="zoom-out"/>
            <h1 className="font text-xl text-[var(--foreground)]">Aditya Pratap Singh</h1>
            <p className="text-[var(--paragraph-color)] text-justify font-serif lg:w-1/2 text-[1rem]"> Hello! I am Aditya Pratap Singh, a passionate MERN-Stack Web developer specializing in Reactjs, Nodejs, Expressjs & MongoDB. With a strong foundation 
            in HTML, CSS, and responsive web design, I have the skills to create visually appealing and user-friendly web applications.</p>
            <span className="font text-md text-[var(--paragraph-color)]">Connect with me</span>
            
            <span className="flex justify-center items-center gap-x-8 text-2xl">

               <NavLink to="https://www.Linkedin.com/in/theaditya-pratap-singh/">
                <h1 className="text-blue-500"><IconComponent iconType="xmLinkedinIcon" /></h1></NavLink>

               <NavLink to="https://github.com/git-aditya-pratap-singh"><h1 className="text-[var(--foreground)]">
                <IconComponent iconType="xmGithubIcon" /></h1></NavLink>

               <NavLink to="https://gitweb-portfolio.netlify.app/"><h1 className="text-[#8c03fcfd]">
                <IconComponent iconType="chromeIcon" /></h1></NavLink>

               <NavLink to="https://www.youtube.com/@CodingHubTech"><h1 className="text-red-500">
               <IconComponent iconType="xmYoutubeIcon" /></h1></NavLink>
            </span>
            
        </section>
        </>
    )
}
export default About;