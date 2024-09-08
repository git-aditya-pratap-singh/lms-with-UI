import {useState, useEffect} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, placeholder = "Select ...", name, value, onChange }) => {
  
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    onChange(selectedOptions); // Notify parent component about the change
  };

  return (
    <div className="relative mt-2 rounded shadow w-full">
      <Select
        options={options}
        isMulti
        name={name}
        value={selectedOptions}
        className="text-[var(--foreground)]"
        placeholder={placeholder}
        onChange={handleSelectChange}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default MultiSelectField;



