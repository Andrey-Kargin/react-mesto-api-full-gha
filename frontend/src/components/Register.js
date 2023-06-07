import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

//функция заполнения полей
function Register(props) {
  const [regFormValue, setRegFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegFormValue({
      ...regFormValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(regFormValue);
  };

  //разметка формы регистрации
  return (
      <div className="auth">
      <div className="auth__container">
      <AuthForm 
          name="register"
          title={props.title}
          email={regFormValue.email}
          password={regFormValue.password}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          buttonText={props.buttonText}
        />
      <span className="auth__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </span>
        </div>
    </div>
  );
}

export default Register;