import RegistrationForms from "../../components/form/RegistrationForms";
import RegisterStructure from "../../validation/FormStructure/RegisterStructure"; 
import validateSchema from "../../validation/validate";

const Registration = () => {return <RegistrationForms forms={RegisterStructure} schema={validateSchema} />}
export default Registration;