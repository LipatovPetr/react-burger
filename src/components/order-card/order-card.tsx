import cn from "classnames";
import styles from "./order-card.module.css";
import { useAppSelector } from "../app/app";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { OrderItem } from "../../store/FeedAllOrders/types";
import {
  getOrderIngredients,
  calculateTotalPrice,
  mapStatusToOrderStatus,
} from "../../utils/helpers/order.helpers";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

type OrderCardProps = {
  data: OrderItem;
  isProfile?: boolean;
};

function OrderCard({ data, isProfile = false }: OrderCardProps) {
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState("");
  const { createdAt, number, name, status } = data;
  const allIngredients = useAppSelector((state) => state.ingredients.data);

  const orderIngredients = useMemo(() => {
    return getOrderIngredients(data, allIngredients);
  }, [data, allIngredients]);

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(orderIngredients);
  }, [orderIngredients]);

  const renderIngredients = () => {
    const filteredIngredients = orderIngredients.slice(0, 5);
    return filteredIngredients.map((ingredient, index) => (
      <div
        key={index}
        className={styles.image}
        style={{
          backgroundImage: `url("${ingredient?.image_mobile}")`,
          zIndex: filteredIngredients.length - index,
        }}
      />
    ));
  };

  useEffect(() => {
    const newOrderStatus = mapStatusToOrderStatus(status);
    setOrderStatus(newOrderStatus);
  }, [status]);

  return (
    <Link
      to={`${number}`}
      state={{ background: location }}
      className={styles.card}
    >
      <div className={styles.infoContainer}>
        <p className={styles.number}>{`#${number}`}</p>
        <div className={styles.dateContainer}>
          <FormattedDate className={styles.date} date={new Date(createdAt)} />
          <span>i-GMT+3</span>
        </div>
      </div>

      <p
        className={cn(styles.title, {
          [styles["title-text-small"]]: name.length > 100,
        })}
      >
        {name}
      </p>
      {isProfile && (
        <p className={status === "done" ? styles.status_done : styles.status}>
          {orderStatus}
        </p>
      )}
      <div className={styles.ingredientsInfo}>
        <div className={styles.imagesContainer}>
          {renderIngredients()}
          {orderIngredients.length > 5 && (
            <div
              key={5}
              className={styles.image}
              style={{
                backgroundImage: `url("${orderIngredients[5]?.image_mobile}")`,
                zIndex: 0.1,
              }}
            >
              <div className={styles.imageOverlay}>
                {`+${orderIngredients.length - 5}`}
              </div>
            </div>
          )}
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;
