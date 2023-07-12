// Libs

import { configureStore } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { useEffect, memo } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

// Components

import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import Layout from "../layout/layout.jsx";
import ProfileLayout from "../profile-layout/profile-layout";
import Modal from "../modal/modal";
import IngredientDetails from "../../pages/constructor/ingredients-section/ingredient-details/ingredient-details";
import Preloader from "../preloader/preloader";

// Pages

import Constructor from "../../pages/constructor/constructor";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile-edit/profile-edit";
import Orders from "../../pages/profile/orders/orders";
import IngredientView from "../../pages/ingredient-view/ingredient-view";
import ErrorPage from "../../pages/error/error";

// Reducers

import loginReducer from "../../services/slices/user";
import ingredientsReducer from "../../services/slices/burger-ingredients";
import modalReducer from "../../services/slices/popup-ingredient-details";
import constructorReducer from "../../services/slices/burger-constructor";
import orderReducer from "../../services/slices/order";
import checkoutReducer from "../../services/slices/popup-checkout-details";

// Functions

import { fetchIngredients } from "../../services/slices/burger-ingredients";
import { authorizeUser, authChecked } from "../../services/slices/user";

const store = configureStore({
  reducer: {
    user: loginReducer,
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    ingredientsPopup: modalReducer,
    checkoutPopup: checkoutReducer,
  },
});

const App = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    store.dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (accessToken) {
      store.dispatch(authorizeUser(accessToken));
    } else {
      store.dispatch(authChecked());
    }
  }, []);

  return (
    <Provider store={store}>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Constructor />} />
          <Route path="login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="test" element={<Preloader />} />

          <Route
            path="register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path="/ingredient/:id" element={<IngredientView />} />

          <Route
            path="profile"
            element={<OnlyAuth component={<ProfileLayout />} />}
          >
            <Route index element={<Profile />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredient/:id"
            element={
              <Modal
                title={"Детали ингредиента"}
                popupClosed={() => navigate(-1)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      <Toaster />
    </Provider>
  );
});

export default App;
