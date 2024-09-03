const RegisterStructure = [
    {
        id: 'textInput',
        type: 'text',
        name: 'name',
        placeholder: 'enter the name...',
        autoComplete: 'off',
        icon: 'userIcon',
    },
    {
        id: 'textInput',
        type: 'text',
        name: 'email',
        placeholder: 'john.doe@company.com',
        autoComplete: 'off',
        icon: 'emailIcon',
    },
    {
        id: 'textInput',
        type: 'text',
        name: 'phone',
        placeholder: '123-456-7890',
        autoComplete: 'off',
        icon: 'phoneIcon',
    },
    {
        id: 'multiSelectInput',
        type: '',
        name: 'course',
        value: [],
        placeholder: 'Select Course...',
        autoComplete: 'off',
        icon: '',
    },
    {
        id: 'textAreaInput',
        type: 'text',
        name: 'address',
        placeholder: 'Enter the Parmanent address...',
        autoComplete: 'on',
        icon: '',
    },
    {
        id: 'radioInput',
        type: 'radio',
        name: 'gender',
        options: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
        ],
        icon: '',
    },
    ]
    export default RegisterStructure;
    