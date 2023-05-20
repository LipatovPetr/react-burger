import styles from "./ingredients-list.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { addItem } from "../../../services/burger-constructor-slice";
import {
  totalPriceUpdated,
  orderListUpdated,
} from "../../../services/order-slice";

import Placeholder from "../placeholder/placeholder";
import BunElement from "../bun-element/bun-element";
import StuffingElement from "../stuffing-element/stuffing-element";

function IngredientsList() {
  const dispatch = useDispatch();

  const { availableIngredients, chosenStuffings, chosenBun } = useSelector(
    (state) => ({
      availableIngredients: state.burgerIngredients.data,
      chosenStuffings: state.burgerConstructor.stuffings,
      chosenBun: state.burgerConstructor.bun,
    })
  );

  const handleDrop = (item) => {
    const draggedItem = availableIngredients.find(
      (ingredient) => ingredient._id === item._id
    );
    dispatch(addItem(draggedItem));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    },
  });

  useEffect(
    function updateTotalPrice() {
      if (chosenBun || chosenStuffings) {
        dispatch(totalPriceUpdated({ bun: chosenBun, stuff: chosenStuffings }));
      }
    },
    [chosenBun, chosenStuffings]
  );

  useEffect(
    function updateOrderList() {
      if (chosenBun !== null && chosenStuffings.length > 0) {
        dispatch(orderListUpdated({ bun: chosenBun, stuff: chosenStuffings }));
      }
    },
    [chosenBun, chosenStuffings]
  );

  return (
    <div className={cn(styles.ingredients, "mt-25")} ref={dropTarget}>
      {chosenBun ? (
        <BunElement item={chosenBun} type={"top"} />
      ) : (
        <Placeholder text={"булочку"} />
      )}

      <div className={styles.scrolledSection}>
        {chosenStuffings.length > 0 ? (
          chosenStuffings.map((ingredient, index) => (
            <StuffingElement
              ingredient={ingredient}
              index={index}
              key={ingredient.uuid}
            />
          ))
        ) : (
          <Placeholder text={"начинку и соусы"} />
        )}
      </div>
      {chosenBun ? (
        <BunElement item={chosenBun} type={"bottom"} />
      ) : (
        <Placeholder text={"булочку"} />
      )}
    </div>
  );
}

export default IngredientsList;