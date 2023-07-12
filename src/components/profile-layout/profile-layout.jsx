import { Outlet, NavLink, useLocation } from "react-router-dom";
import styles from "./profile-layout.module.css";
import cn from "classnames";
import { logout } from "../../services/slices/user";
import { useDispatch } from "react-redux";

function ProfileLayout() {
  const dispatch = useDispatch();
  const location = useLocation();

  function locationF() {
    dispatch(logout());
  }

  return (
    <div className={styles.section}>
      <div className={styles.navigationContainer}>
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link_inactive
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link_inactive
          }
        >
          История заказов
        </NavLink>
        <button className={styles.button} onClick={locationF}>
          Выход
        </button>
        <p className={styles.caption}>
          {location.pathname === "/profile"
            ? "В этом разделе вы можете изменить свои персональные данные"
            : "В этом разделе вы можете просмотреть свою историю заказов"}
        </p>
      </div>
      <Outlet className={styles.outlet} />
    </div>
  );
}

export default ProfileLayout;
