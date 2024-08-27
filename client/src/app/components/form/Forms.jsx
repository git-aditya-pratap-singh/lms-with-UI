import React from "react";
import PropTypes from 'prop-types';

const Forms = ({forms, schema})=>{
  console.log(forms)
    return(
        <>
        <div className="p-5 bg-red-400">
            {forms.map((form, index)=>(
                <label key={index}>
                    <span>{form.label}</span>
                    <input type="text" id={form.id}/>
                </label>
            ))}
        </div>
        </>
    )
}

Forms.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  schema: PropTypes.object, // Assuming `schema` might be an object, adjust according to actual use
};

export default Forms;