
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedinIn, FaFingerprint, FaUser, FaPhoneAlt } from 'react-icons/fa';
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
    'crossIcon'
  ]).isRequired,
};

export default IconComponent;
