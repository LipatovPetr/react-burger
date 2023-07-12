import styles from "./ingredients-list.module.css";
import cn from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../services/slices/burger-constructor";
import {
  totalPriceUpdated,
  orderListUpdated,
} from "../../../../services/slices/order";
import Placeholder from "../placeholder/placeholder";
import BunElement from "../bun-element/bun-element";
import StuffingCard from "../stuffing-card/stuffing-card";

function IngredientsList() {
  const dispatch = useDispatch();

  const { availableIngredients, chosenStuffings, chosenBun } = useSelector(
    (state) => ({
      availableIngredients: state.ingredients.data,
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
        <Placeholder text={"your bun"} />
      )}

      <div className={styles.scrolledSection}>
        {chosenStuffings.length > 0 ? (
          chosenStuffings.map((ingredient, i) => (
            <StuffingCard
              ingredient={ingredient}
              key={ingredient.uuid}
              index={i}
            />
          ))
        ) : (
          <Placeholder text={"main and sauces"} />
        )}
      </div>
      {chosenBun ? (
        <BunElement item={chosenBun} type={"bottom"} />
      ) : (
        <Placeholder text={"your bun"} />
      )}
    </div>
  );
}

export default IngredientsList;
