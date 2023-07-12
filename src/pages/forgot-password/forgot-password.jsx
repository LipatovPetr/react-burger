import styles from "./forgot-password.module.css";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRequest, clearError } from "../../services/slices/user";
import { postRequest, handleResponse } from "../../services/utils/api";

import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
  const [forgotPassFormData, setForgotPassFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.user.error);

  function handleChange(event) {
    const { name, value } = event.target;
    setForgotPassFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    return postRequest("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgotPassFormData),
    })
      .then((res) => {
        handleResponse(res);
      })
      .then(localStorage.setItem("password-status", "reset-approved"))
      .then(navigate("/reset-password"))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Восстановление пароля</h2>
        <form
          onSubmit={handleSubmit}
          className={cn(styles.inputsContainer, "mt-6")}
        >
          <EmailInput
            onChange={handleChange}
            value={forgotPassFormData.email}
            name="email"
            inputMode="email"
            required
          />
          {errorMessage ? (
            <p className={styles.error}>{`Error: ${errorMessage}`}</p>
          ) : null}
          <Button htmlType="submit" type="primary" size="medium">
            Восстановить
          </Button>
        </form>

        <div className={cn(styles.linksContainer, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <Link to="../login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
