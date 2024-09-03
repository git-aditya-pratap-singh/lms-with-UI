import PropTypes from 'prop-types';

const RadioField = ({name, value, checkedValue, label }) => {
  console.log(checkedValue, value)
  return (
        <div className="flex items-center me-4">
            <input id="inline-radio"
                type="radio"
                name={name}
                value={value}
                checked={checkedValue === value}
                className="w-4 h-4 text-[var(--primary)] bg-gray-100 border-gray-300 focus:ring-ring accent-[var(--primary)]
                     focus:ring-2"/>
            <label className="ms-2 text-sm font-medium text-[var(--foreground)] dark:text-[var(--foreground)]">{label}</label>
       </div>
  );
};

RadioField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checkedValue: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default RadioField;
