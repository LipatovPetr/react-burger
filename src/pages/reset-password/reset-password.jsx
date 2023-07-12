import React, { useState } from "react";
import styles from "./reset-password.module.css";
import cn from "classnames";
import { postRequest, handleResponse } from "../../services/utils/api";
import { Link, Navigate, useNavigate } from "react-router-dom";

import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword() {
  const navigate = useNavigate();
  const isResetInitiated = localStorage.getItem("password-status");
  const [resetPassFormData, setResetPassFormData] = useState({
    password: "",
    token: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setResetPassFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    return postRequest("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetPassFormData),
    })
      .then((res) => {
        return handleResponse(res);
      })
      .then(() => {
        localStorage.removeItem("password-status");
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage(null);
    }, "3000");
  }
  if (isResetInitiated) {
    return (
      <div className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.heading}>Восстановление пароля</h2>
          <form
            onSubmit={handleSubmit}
            className={cn(styles.inputsContainer, "mt-6")}
          >
            <PasswordInput
              name="password"
              value={resetPassFormData.password}
              placeholder={"Введите новый пароль"}
              onChange={handleChange}
              inputMode="text"
              required
            />
            <Input
              name="token"
              value={resetPassFormData.token}
              type={"text"}
              inputMode="text"
              placeholder={"Введите код из письма"}
              onChange={handleChange}
              required
            />
            {errorMessage ? (
              <p className={styles.error}>{`${errorMessage}`}</p>
            ) : null}
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </form>

          <div className={cn(styles.linksContainer, "mt-20")}>
            <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
              <Link to="../login" className={styles.link}>
                {" "}
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default ResetPassword;
