import cn from "classnames";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import styles from "./burger-constructor.module.css";
import OrderDetails from "./order-details/order-details";
import IngredientsList from "./ingredients-list/ingredients-list";
import { useDispatch } from "react-redux";
import {
  checkoutPopupOpened,
  checkoutPopupClosed,
} from "../../services/popup-checkout-details-slice";
import { postData } from "../../services/order-slice";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const orderData = useSelector((state) => state.order.orderList);
  const orderPopupIsOpen = useSelector((state) => state.checkoutPopup.opened);
  const chosenBun = useSelector((state) => state.burgerConstructor.bun);
  const chosenStuffings = useSelector(
    (state) => state.burgerConstructor.stuffings
  );

  const handleOrderClick = () => {
    dispatch(postData(orderData));
    dispatch(checkoutPopupOpened());
  };

  return (
    <div className={styles.section}>
      <IngredientsList />
      <div className={cn(styles.orderInfo, "mt-10", "mr-4")}>
        <div className={styles.priceContainer + " mr-10"}>
          <span className={styles.priceValue + " text text_type_digits-medium"}>
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={!chosenBun || chosenStuffings.length === 0}
          onClick={handleOrderClick}
        >
          Order
        </Button>
      </div>

      {orderPopupIsOpen && (
        <Modal popupClosed={checkoutPopupClosed}>
          <OrderDetails checkOutData={"checkOutData"} />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
