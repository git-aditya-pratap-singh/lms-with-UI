const validateSchema = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z]+$/,
        errorKey: 'Name'
    },
    email:{
        required: true,
        errorKey: 'Email',
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
        },
        errorKey: 'Password'
    },
    pswd:{
        required: true,
        errorKey: 'Password'
    }
}
export default validateSchema;