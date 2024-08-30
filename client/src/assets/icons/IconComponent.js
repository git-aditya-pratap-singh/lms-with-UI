
import PropTypes from 'prop-types';
import { FaGithub, FaLinkedinIn, FaFingerprint } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { BiLogInCircle } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';


const IconComponent = ({ iconType }) => {
  const icons = {
    emailIcon: <MdOutlineAlternateEmail />,
    passwordIcon: <FaFingerprint />,
    googleIcon: <FcGoogle />,
    linkedInIcon: <FaLinkedinIn />,
    githubIcon: <FaGithub />,
    loginIcon: <BiLogInCircle />,
    crossIcon: <RxCross1 />,
  };
  return icons[iconType] || null;
};

// Define PropTypes for the component
IconComponent.propTypes = {
  iconType: PropTypes.oneOf([
    'emailIcon', 
    'passwordIcon', 
    'googleIcon', 
    'linkedInIcon', 
    'githubIcon', 
    'loginIcon', 
    'crossIcon'
  ]).isRequired,
};

export default IconComponent;
