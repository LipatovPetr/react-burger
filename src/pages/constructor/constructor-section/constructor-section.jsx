import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../../../components/modal/modal";
import styles from "./constructor-section.module.css";
import OrderDetails from "./order-details/order-details";
import IngredientsList from "./ingredients-list/ingredients-list";
import {
  checkoutPopupOpened,
  checkoutPopupClosed,
} from "../../../services/slices/popup-checkout-details";
import { postData } from "../../../services/slices/order";

function ConstructorSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const orderData = useSelector((state) => state.order.orderList);
  const orderPopupIsOpen = useSelector((state) => state.checkoutPopup.opened);
  const chosenBun = useSelector((state) => state.burgerConstructor.bun);
  const isUserLogged = useSelector((state) => state.user.user);
  const chosenStuffings = useSelector(
    (state) => state.burgerConstructor.stuffings
  );

  const handleOrderClick = () => {
    if (!isUserLogged) {
      return navigate("/login");
    }
    dispatch(postData(orderData));
    dispatch(checkoutPopupOpened());
  };

  return (
    <div className={styles.section}>
      <IngredientsList />
      <div className={cn(styles.orderInfo, "mt-10", "mr-4")}>
        <div className={cn(styles.priceContainer, "mr-10")}>
          <span
            className={cn(styles.priceValue, "text text_type_digits-medium")}
          >
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
          Оформить заказ
        </Button>
      </div>

      {orderPopupIsOpen && (
        <Modal popupClosed={() => dispatch(checkoutPopupClosed())}>
          <OrderDetails checkOutData={"checkOutData"} />
        </Modal>
      )}
    </div>
  );
}

export default ConstructorSection;
