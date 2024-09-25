
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedinIn, FaFingerprint, FaUser, FaPhoneAlt, FaLaptopCode, FaChalkboardTeacher, FaChrome, FaUserPlus, FaDownload, MdDelete } from 'react-icons/fa';
import { FaArrowRotateLeft, FaBook, FaUsersLine } from "react-icons/fa6";
import { BsLinkedin, BsGithub, BsYoutube } from "react-icons/bs";
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BiLogInCircle } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';


const IconComponent = ({ iconType }) => {
  const icons = {
    userIcon: <FaUser/>,
    emailIcon: <MdOutlineAlternateEmail />,
    passwordIcon: <FaFingerprint />,
    phoneIcon: <FaPhoneAlt/>,
    googleIcon: <FcGoogle size={20}/>,
    linkedInIcon: <FaLinkedinIn size={20} color="#007DFC" />,
    githubIcon: <FaGithub size={20} className="text-gray-700" />,
    loginIcon: <BiLogInCircle />,
    crossIcon: <RxCross1 />,
    arrowLeftIcon: <FaArrowRotateLeft/>,
    laptopCodeIcon: <FaLaptopCode/>,
    chalkBoardIcon: <FaChalkboardTeacher/>,
    booksIcon: <FaBook/>,
    userLineIcon: <FaUsersLine/>,
    chromeIcon: <FaChrome/>,
    xmLinkedinIcon: <BsLinkedin/>,
    xmGithubIcon: <BsGithub/>,
    xmYoutubeIcon: <BsYoutube/>,
    adduserIcon: <FaUserPlus />,
    downloadIcon: <FaDownload />,
    deleteIcon: <MdDelete />
  };
  return icons[iconType] || null;
};

// Define PropTypes for the component
IconComponent.propTypes = {
  iconType: PropTypes.oneOf([
    'userIcon',
    'emailIcon', 
    'passwordIcon', 
    'phoneIcon',
    'googleIcon', 
    'linkedInIcon', 
    'githubIcon', 
    'loginIcon', 
    'crossIcon',
    'arrowLeftIcon',
    'laptopCodeIcon',
    'chalkBoardIcon',
    'booksIcon',
    'userLineIcon',
    'chromeIcon',
    'xmLinkedinIcon',
    'xmGithubIcon',
    'xmYoutubeIcon',
    'adduserIcon',
    'downloadIcon',
    'deleteIcon'
  ]).isRequired,
};

export default IconComponent;
