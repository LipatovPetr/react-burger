import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./ingredient-card.module.css";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch, useSelector } from "react-redux";
import { ingredientClicked } from "../../../services/popup-ingredient-details-slice";
import { ingredientsPopupOpened } from "../../../services/popup-ingredient-details-slice";

function Card({ item: { _id, image, name, price } }) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
  });

const availableIngredients = useSelector((state) => state.burgerIngredients.data);
const chosenStuffings = useSelector((state) => state.burgerConstructor.stuffings);
const chosenBun = useSelector((state) => state.burgerConstructor.bun);
const count = chosenStuffings.filter((item) => item._id === _id).length;

  const handleIngredientClick = (evt) => {
    const ingredientId = evt.currentTarget.dataset.id;
    dispatch(ingredientClicked({availableIngredients, ingredientId}));
    dispatch(ingredientsPopupOpened());
  };

  return (
    <div
      className={cn(styles.card, "ml-4", "mt-6")}
      data-id={_id}
      onClick={handleIngredientClick}
      ref={dragRef}
    >
      <img
        className={cn(styles.cardImage, "mt-1", "ml-4")}
        src={image}
        alt={image}
      ></img>
      <div
        className={cn(
          styles.priceElement,
          "mt-1",
          "text",
          "text_type_digits-default"
        )}
      >
        <span className={cn(styles.price, "mr-2")}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={cn(styles.cardTitle, "mt-1", "text", "text_type_main-small")}
      >
        {name}
      </p>
      <Counter count={chosenBun?._id === _id ? count + 2 : count} size="default" extraClass="m-1" />
    </div>
  );
}

export default Card;
