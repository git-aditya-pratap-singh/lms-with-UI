import LoginForms from "../../components/form/LoginForms";
import loginStructure from "../../validation/FormStructure/loginStructure"; 
import validateSchema from "../../validation/validate";

const Login = () => {return <LoginForms forms={loginStructure} schema={validateSchema} />}
export default Login;