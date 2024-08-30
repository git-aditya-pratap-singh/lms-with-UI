const validateSchema = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z]+$/
    },
    email:{
        required: true,
        pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        required: true,
        minLength: 8,
        strength: {
            uppercase: 1,
            lowercase: 1,
            digit: 1,
            special: 1
        }
    }
}

// const validatePasswordStrength = (password, strengthSchema) => {
//     const errors = [];
//     if (strengthSchema.uppercase && !/[A-Z]/.test(password)) {
//         errors.push("Must contain at least one uppercase letter");
//     }
//     if (strengthSchema.lowercase && !/[a-z]/.test(password)) {
//         errors.push("Must contain at least one lowercase letter");
//     }
//     if (strengthSchema.digit && !/\d/.test(password)) {
//         errors.push("Must contain at least one digit");
//     }
//     if (
//         strengthSchema.special &&
//         !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
//     ) {
//         errors.push("Must contain at least one special character");
//     }
//     return errors;
// };


const validateField = (fieldName, fieldValue, fieldSchema) => {
    if (fieldSchema.required && !fieldValue) {
        return `${fieldName} should not be empty !!`;
    }
    if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
        return `${fieldName} must be at least ${fieldSchema.minLength} characters long`;
    }
    // if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
    //     return `${fieldName} must be no more than ${fieldSchema.maxLength} characters long`;
    // }
    if (fieldSchema.pattern && !fieldSchema.pattern.test(fieldValue)) {
        return `${fieldName} Invalid Format`;
    }
    // if (fieldSchema.strength) {
    //     return validatePasswordStrength(fieldValue, fieldSchema.strength).join(
    //         ", "
    //     );
    // }
    if (fieldSchema.match) {
        // if (fieldName[fieldSchema.match] !== fieldValue) {
        //     return "Passwords do not match";
        // }
    }
    return null;
};


const validateForm = (formData, schema)=>{
    const errors = {}
    Object.keys(formData).forEach((field)=>{
        const fieldSchema = schema[field];
        const fieldValue = formData[field];
        const error = validateField(field, fieldValue, fieldSchema);
        if (error) errors[field] = error;  
    });
    return errors;
}

export default validateSchema;
export {validateForm};