import styles from "./checkout-details.module.css";
import imageCheck from "../../../images/done.png";
import cn from "classnames";
import { useAppSelector } from "../../app/app";
import MoonLoader from "react-spinners/MoonLoader";

function CheckoutDetails() {
  const orderStatus = useAppSelector((state) => state.order.status);
  const orderNum = useAppSelector((state) => state.order.orderNum);

  return (
    <div className={styles.box}>
      <span
        className={cn(
          "text",
          "text_type_digits-large",
          "pt-10",
          styles.orderNumber
        )}
      >
        {orderStatus === "loading" ? null : orderNum}
      </span>
      <p className={cn("pt-8", "pb-15", "text", "text_type_main-medium")}>
        Идентификатор заказа
      </p>
      <div className="pb-15">
        {orderStatus === "loading" ? (
          <MoonLoader
            color="white"
            loading={true}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <img src={imageCheck} alt="галочка" />
        )}
      </div>

      <p className={cn("text", "text_type_main-default", "pb-2")}>
        Ваш заказ начали готовить
      </p>
      <p
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          "pb-15"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default CheckoutDetails;
