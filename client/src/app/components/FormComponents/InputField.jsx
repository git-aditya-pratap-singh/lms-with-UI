import PropTypes from 'prop-types';
import IconComponent from "../../../assets/icons/IconComponent";

const InputField = ({type = 'text', name, value, placeholder, autoComplete = 'off', icon }) => {
  return (
    <span>
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
        />
        { icon && 
        <label>
            <IconComponent iconType={icon}/>
        </label>
        }
    </span>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  icon: PropTypes.elementType, // For rendering icon components
};

export default InputField;
