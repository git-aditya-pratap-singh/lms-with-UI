import {useState} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, placeholder = "Select ...", name, value }) => {
  
  const [select, setSelect] = useState([]);
  console.log(value)

  return (
    <div className="relative mt-2 rounded shadow w-full">
      <Select
        options={options}
        isMulti
        name={name}
        value={select.label}
        className="text-[var(--foreground)]"
        placeholder={placeholder}
        onChange={(selectedOptions) => setSelect({ ...select, select: selectedOptions })}
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
