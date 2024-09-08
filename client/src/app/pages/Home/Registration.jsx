import RegistrationForms from "../../components/form/RegistrationForms";
import RegisterStructure from "../../validation/FormStructure/RegisterStructure"; 
import validateSchema from "../../validation/validateSchema";

const Registration = () => <RegistrationForms forms={RegisterStructure} schema={validateSchema} />
export default Registration;