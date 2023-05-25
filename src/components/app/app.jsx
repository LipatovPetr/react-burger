import { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import styles from "./app.module.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ingredientsReducer from "../../services/burger-ingredients-slice";
import modalReducer from "../../services/popup-ingredient-details-slice";
import constructorReducer from "../../services/burger-constructor-slice";
import orderReducer from "../../services/order-slice";
import checkoutReducer from "../../services/popup-checkout-details-slice";

import { fetchData } from "../../services/burger-ingredients-slice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const store = configureStore({
  reducer: {
    burgerIngredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    ingredientsPopup: modalReducer,
    checkoutPopup: checkoutReducer,
  },
});

function App() {
  useEffect(function fetchIngredients() {
    store.dispatch(fetchData());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </Provider>
      </main>
    </div>
  );
}

export default App;
