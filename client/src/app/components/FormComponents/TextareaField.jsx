import PropTypes from 'prop-types';

const TextareaField = ({ name, placeholder, rows }) => {
  return (
        <div className="relative mt-2 rounded shadow-sm w-full">
            <textarea
                name={name}
                placeholder={placeholder}
                className="resize-none block w-full rounded-md py-1.5 pl-3 pr-20 bg-[var(--background)] text-[var(--foreground)] border border-gray-300  focus:ring-ring placeholder:text-gray-400  sm:text-sm sm:leading-6"
                rows={rows}
            >
            </textarea>
        </div>
  );
};

TextareaField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired
};

export default TextareaField;
