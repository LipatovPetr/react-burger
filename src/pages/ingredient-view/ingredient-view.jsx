import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./ingredient-view.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientView() {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.data);
  const chosenIngredient = ingredients.find((item) => item._id === id);

  return (
    <section className={styles.section}>
      {chosenIngredient && (
        <div className={styles.box}>
          <h2 className={styles.title}>Детали ингредиента</h2>
          <img
            src={chosenIngredient.image}
            alt={chosenIngredient.name}
            className={styles.image}
          />

          <h3 className={cn("text", "text_type_main-medium", "pt-4", "pb-8")}>
            {chosenIngredient.name}
          </h3>

          <ul className={cn(styles.details, "pt-8")}>
            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Калории,ккал</span>
              {chosenIngredient.calories}
            </li>

            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Белки, г</span>
              {chosenIngredient.proteins}
            </li>

            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Жиры, г</span>
              {chosenIngredient.fat}
            </li>

            <li
              className={cn(
                styles.detail,
                "text",
                "text_type_main-default",
                "text_color_inactive"
              )}
            >
              <span>Углеводы, г</span>
              {chosenIngredient.carbohydrates}
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default IngredientView;
