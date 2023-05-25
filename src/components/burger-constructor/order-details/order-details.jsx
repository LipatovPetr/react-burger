import styles from "./order-details.module.css";
import imageCheck from "../../../images/done.png";
import PropTypes from "prop-types";
import cn from "classnames";
import { useSelector } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";

function OrderDetails() {
  const orderStatus = useSelector((state) => state.order.status);
  const orderNum = useSelector((state) => state.order.orderNum);

  return (
    <div className={styles.box}>
      <span className={cn("text", "text_type_digits-large", "pt-10")}>
        {orderStatus === "loading" ? (
          <MoonLoader
            color="white"
            loading={true}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          orderNum
        )}
      </span>
      <p className={cn("pt-8", "pb-15", "text", "text_type_main-medium")}>
        order id
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
        We have started preparing your order
      </p>
      <p
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          "pb-15"
        )}
      >
        Wait until your order is ready
      </p>
    </div>
  );
}

export default OrderDetails;
