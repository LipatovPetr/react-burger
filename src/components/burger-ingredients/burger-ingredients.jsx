import { useEffect, useState } from "react";

import cn from "classnames";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "./ingredient-details/ingredient-details";
import Placeholder from "./placeholder/placeholder";

import { INGREDIENTS_TYPES } from "../../utils/constants";

import { ingredientsPopupClosed } from "../../services/popup-ingredient-details-slice";

import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const [current, setCurrent] = useState(INGREDIENTS_TYPES.buns);

  const [bunsRef, bunsInView, bunsEntry] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView, saucesEntry] = useInView({ threshold: 0 });
  const [mainRef, mainInView, mainEntry] = useInView({ threshold: 0 });

  useEffect(() => {
    mainInView && setCurrent(INGREDIENTS_TYPES.main);
    saucesInView && setCurrent(INGREDIENTS_TYPES.sauces);
    bunsInView && setCurrent(INGREDIENTS_TYPES.buns);
  }, [bunsInView, saucesInView, mainInView]);

  const onTabClick = (tab, entry) => (e) => {
    setCurrent(tab);
    entry.target.scrollIntoView({ behavior: "smooth" });
  };

  const popupOpened = useSelector((state) => state.ingredientsPopup.opened);
  const fetchStatus = useSelector((state) => state.burgerIngredients.status);

  return (
    <div className={styles.section}>
      <h1 className={cn(styles.heading, "text", "text_type_main-large")}>
        Build a burger
      </h1>

      <div className={cn(styles.tab, "mt-5")}>
        <Tab
          value={INGREDIENTS_TYPES.buns}
          active={current === INGREDIENTS_TYPES.buns}
          onClick={onTabClick(INGREDIENTS_TYPES.buns, bunsEntry)}
        >
          {INGREDIENTS_TYPES.buns}
        </Tab>
        <Tab
          value={INGREDIENTS_TYPES.sauces}
          active={current === INGREDIENTS_TYPES.sauces}
          onClick={onTabClick(INGREDIENTS_TYPES.sauces, saucesEntry)}
        >
          {INGREDIENTS_TYPES.sauces}
        </Tab>
        <Tab
          value={INGREDIENTS_TYPES.main}
          active={current === INGREDIENTS_TYPES.main}
          onClick={onTabClick(INGREDIENTS_TYPES.main, mainEntry)}
        >
          {INGREDIENTS_TYPES.main}
        </Tab>
      </div>

      <div className={styles.menuSection}>
        {fetchStatus === "loading" ? (
          <Placeholder />
        ) : (
          <>
            <IngredientsGroup name="Buns" type="bun" ref={bunsRef} />
            <IngredientsGroup name="Sauces" type="sauce" ref={saucesRef} />
            <IngredientsGroup name="Main" type="main" ref={mainRef} />
          </>
        )}
      </div>
      {popupOpened && (
        <Modal popupClosed={ingredientsPopupClosed} title="Детали ингредиентов">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerIngredients;
