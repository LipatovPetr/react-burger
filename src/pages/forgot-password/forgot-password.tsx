import styles from "./forgot-password.module.css";
import cn from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useAppSelector } from "../../components/app/app";
import { fetchRequest, handleResponse } from "../../utils/api/api";

import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormInputs } from "../../hooks/useForm";

function ForgotPassword() {
  const navigate = useNavigate();
  const errorMessage = useAppSelector((state) => state.user.error);
  const { values, handleChange } = useFormInputs();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await fetchRequest("/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      handleResponse(res);
      localStorage.setItem("password-status", "reset-approved");
      navigate("/reset-password");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
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
            value={values.email || ""}
            name="email"
            inputMode="email"
            required
          />
          {errorMessage ? <p>{`Error: ${errorMessage}`}</p> : null}
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
