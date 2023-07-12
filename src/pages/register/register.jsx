import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, clearError } from "../../services/slices/user";
import toast from "react-hot-toast";
import cn from "classnames";

import styles from "./register.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // const notify = (text) => toast(text);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.error);
  const registerStatus = useSelector((state) => state.user.registerStatus);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
      return () => {
        clearTimeout(timer);
      };
    }, "3000");
  }, [errorMessage]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(register(registerFormData));
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Регистрация</h2>
        <form
          onSubmit={handleSubmit}
          className={cn(styles.inputsContainer, "mt-6")}
        >
          <Input
            name="name"
            value={registerFormData.name}
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            required
          />
          <EmailInput
            name="email"
            value={registerFormData.email}
            inputMode="email"
            onChange={handleChange}
            required
          />
          <PasswordInput
            name="password"
            value={registerFormData.password}
            inputMode="text"
            onChange={handleChange}
            required
          />
          {errorMessage ? (
            <p className={styles.error}>{`Error: ${errorMessage}`}</p>
          ) : null}
          <Button htmlType="submit" type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
        <div className={cn(styles.linksContainer, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{" "}
            <Link to="../login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
