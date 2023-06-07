import React, { useState } from "react";
import AuthForm from "./AuthForm";

const Login = (props) => {
    const [formValue, setFormValue] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setFormValue({
        ...formValue,
        [name]: value,
      });
    };
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      props.onLogin(formValue);
    };
  

  return (
    <div className="auth">
      <div className="auth__container">
        <AuthForm 
          name="login"
          title={props.title}
          email={formValue.email}
          password={formValue.password}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          buttonText={props.buttonText}
        />
      </div>
    </div>
  );
}
export default Login;