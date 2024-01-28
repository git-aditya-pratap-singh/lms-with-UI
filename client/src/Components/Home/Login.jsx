import "../../assets/css/_login.scss";

const Login = () => {
  return (
    <>
      <section className="_loginContainer">
        <div className="_loginForm">
          <h1>Welcome Back!</h1>
          <p>Choose one of the option to go.</p>
          <form className="_form">
            <input
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
            />
            <button>login</button>
          </form>
          <span>
            <p>or continue with</p>
          </span>
          <div className="_loginIcon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;