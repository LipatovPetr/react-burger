import cn from "classnames";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function IngredientDetails() {
  const { id } = useParams();

  const ingredients = useSelector((state) => state.ingredients.data);
  const clickedIngredient = ingredients.find((item) => item._id === id);

  return (
    clickedIngredient && (
      <div className={styles.box}>
        <img
          src={clickedIngredient.image}
          alt={clickedIngredient.name}
          className={styles.image}
        />

        <h3 className={cn("text", "text_type_main-medium", "pt-4", "pb-8")}>
          {clickedIngredient.name}
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
            {clickedIngredient.calories}
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
            {clickedIngredient.proteins}
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
            {clickedIngredient.fat}
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
            {clickedIngredient.carbohydrates}
          </li>
        </ul>
      </div>
    )
  );
}

export default IngredientDetails;
