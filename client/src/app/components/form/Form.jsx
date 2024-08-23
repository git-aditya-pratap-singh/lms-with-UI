import React from "react";
import PropTypes from 'prop-types';

const Form2 = ({forms, schema})=>{
    return(
        <>
        <form>
            {forms.map((form)=>{
                <label>
                    <span>{form.label}</span>
                    <input id={form.id} name={form.name}/>
                </label>
            })}
        </form>
        </>
    )
}

Form.propTypes = {
    forms: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
export default Form2;