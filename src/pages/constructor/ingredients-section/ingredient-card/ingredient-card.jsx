import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { ingredientClicked } from "../../../../services/slices/popup-ingredient-details";
import { ingredientsPopupOpened } from "../../../../services/slices/popup-ingredient-details";

function Card({ item: { _id, image, name, price } }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
  });

  const chosenStuffings = useSelector(
    (state) => state.burgerConstructor.stuffings
  );
  const chosenBun = useSelector((state) => state.burgerConstructor.bun);
  const count = chosenStuffings.filter((item) => item._id === _id).length;

  return (
    <Link
      className={cn(styles.card, "ml-4", "mt-6")}
      data-id={_id}
      ref={dragRef}
      to={`/ingredient/${_id}`}
      state={{ background: location }}
    >
      <img
        className={cn(styles.cardImage, "mt-1", "ml-4")}
        src={image}
        alt={image}
      ></img>
      <div className={styles.priceElement}>
        <span className={cn(styles.price, "mr-2")}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.cardTitle}>{name}</p>
      <Counter
        count={chosenBun?._id === _id ? count + 2 : count}
        size="default"
        extraClass="m-1"
      />
    </Link>
  );
}

export default Card;
