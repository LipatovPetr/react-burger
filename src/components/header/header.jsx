import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import cn from "classnames";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./header.module.css";

function Header() {
  const location = useLocation();
  return (
    <header className={styles.navContainer}>
      <nav className={styles.navElement}>
        <div className={styles.navContent}>
          <div className={styles.navSubsection}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link_inactive
              }
            >
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
              <span className={cn("ml-2")}>Конструктор</span>
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link_inactive
              }
            >
              <ListIcon
                type={location.pathname === "/orders" ? "primary" : "secondary"}
              />
              <span className={cn("ml-2")}>Лента заказов</span>
            </NavLink>
          </div>

          <div className={`${styles.navSubsection} ${styles.navLogo}`}>
            <Logo />
          </div>

          <div className={`${styles.navSubsection} ${styles.navProfile}`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? styles.link_active : styles.link_inactive
              }
            >
              <ProfileIcon
                type={
                  location.pathname === "/profile" ? "primary" : "secondary"
                }
              />
              <span className={cn("ml-2")}>Личный кабинет</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
