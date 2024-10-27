
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedinIn, FaFingerprint, FaUser, FaPhoneAlt, FaLaptopCode, FaChalkboardTeacher, FaChrome, FaUserPlus, FaDownload, FaEdit, 
  FaCalendarAlt, FaVideo, FaLink, FaArrowRight  } from 'react-icons/fa';
import { FaArrowRotateLeft, FaBook, FaUsersLine, FaBookOpen, FaHandHoldingDollar, FaDollarSign, FaTag, FaBuffer } from "react-icons/fa6";
import { } from "react-icons/fa6";
import { BsLinkedin, BsGithub, BsYoutube } from "react-icons/bs";
import { MdOutlineAlternateEmail, MdDelete, MdPhotoSizeSelectActual } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BiLogInCircle } from 'react-icons/bi';
import { GrUpdate } from "react-icons/gr";
import { RxCross1 } from 'react-icons/rx';


const IconComponent = ({ iconType, iconSize=null, iconColor=null, iconStyle=null }) => {
  const icons = {
    userIcon: <FaUser size={iconSize} color={iconColor} className={iconStyle}/>,
    emailIcon: <MdOutlineAlternateEmail size={iconSize} color={iconColor} className={iconStyle}/>,
    passwordIcon: <FaFingerprint size={iconSize} color={iconColor} className={iconStyle}/>,
    phoneIcon: <FaPhoneAlt size={iconSize} color={iconColor} className={iconStyle}/>,
    googleIcon: <FcGoogle size={iconSize} color={iconColor} className={iconStyle}/>,
    linkedInIcon: <FaLinkedinIn size={iconSize} color={iconColor} className={iconStyle}/>,
    githubIcon: <FaGithub size={iconSize} color={iconColor} className={iconStyle}/>,
    loginIcon: <BiLogInCircle size={iconSize} color={iconColor} className={iconStyle}/>,
    crossIcon: <RxCross1 size={iconSize} color={iconColor} className={iconStyle}/>,
    arrowLeftIcon: <FaArrowRotateLeft size={iconSize} color={iconColor} className={iconStyle}/>,
    laptopCodeIcon: <FaLaptopCode size={iconSize} color={iconColor} className={iconStyle}/>,
    chalkBoardIcon: <FaChalkboardTeacher size={iconSize} color={iconColor} className={iconStyle}/>,
    booksIcon: <FaBook size={iconSize} color={iconColor} className={iconStyle}/>,
    userLineIcon: <FaUsersLine size={iconSize} color={iconColor} className={iconStyle}/>,
    chromeIcon: <FaChrome size={iconSize} color={iconColor} className={iconStyle}/>,
    xmLinkedinIcon: <BsLinkedin size={iconSize} color={iconColor} className={iconStyle}/>,
    xmGithubIcon: <BsGithub size={iconSize} color={iconColor} className={iconStyle}/>,
    xmYoutubeIcon: <BsYoutube size={iconSize} color={iconColor} className={iconStyle}/>,
    adduserIcon: <FaUserPlus size={iconSize} color={iconColor} className={iconStyle}/>,
    downloadIcon: <FaDownload size={iconSize} color={iconColor} className={iconStyle}/>,
    deleteIcon: <MdDelete size={iconSize} color={iconColor} className={iconStyle}/>,
    editIcon: <FaEdit size={iconSize} color={iconColor} className={iconStyle}/>,
    calenderIcon: <FaCalendarAlt size={iconSize} color={iconColor} className={iconStyle}/>,
    updateIcon: <GrUpdate size={iconSize} color={iconColor} className={iconStyle}/>,
    photoIcon: <MdPhotoSizeSelectActual size={iconSize} color={iconColor} className={iconStyle}/>,
    videoIcon: <FaVideo size={iconSize} color={iconColor} className={iconStyle}/>,
    linkIcon: <FaLink size={iconSize} color={iconColor} className={iconStyle}/>,
    arrowIcon: <FaArrowRight size={iconSize} color={iconColor} className={iconStyle}/>,
    bookopenIcon: <FaBookOpen size={iconSize} color={iconColor} className={iconStyle}/>,
    holdDollerIcon: <FaHandHoldingDollar size={iconSize} color={iconColor} className={iconStyle}/>,
    dollerIcon: <FaDollarSign size={iconSize} color={iconColor} className={iconStyle}/>,
    tagIcon: <FaTag size={iconSize} color={iconColor} className={iconStyle}/>,
    bufferIcon: <FaBuffer size={iconSize} color={iconColor} className={iconStyle}/>,
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
    'deleteIcon',
    'editIcon',
    'calenderIcon',
    'updateIcon',
    'photoIcon',
    'videoIcon',
    'linkIcon',
    'arrowIcon',
    'bookopenIcon',
    'holdDollerIcon',
    'dollerIcon',
    'tagIcon',
    'bufferIcon'
  ]).isRequired,
  iconSize: PropTypes.string,
  iconColor: PropTypes.any,
  iconStyle: PropTypes.any,
};

export default IconComponent;
