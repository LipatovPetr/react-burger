import cn from "classnames";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.navContainer}>
      <nav className={styles.navElement}>
        <div className={styles.navContent}>
          <div className={styles.navSubsection}>
            <a className={cn(styles.button, "pl-5", "pr-5", "mb-4", "mt-4")}>
              <BurgerIcon type="secondary" />
              <span className="text text_type_main-default ml-2">
                Constructor
              </span>
            </a>
            <a className={cn(styles.button, "pl-5", "pr-5", "mb-4", "mt-4")}>
              <ListIcon type="secondary" />
              <span className={cn("text", "text_type_main-default", "text_color_inactive", "ml-2")}>
                Orders
              </span>
            </a>
          </div>

          <div className={`${styles.navSubsection} ${styles.navLogo}`}>
            <Logo />
          </div>

          <div className={`${styles.navSubsection} ${styles.navProfile}`}>
            <a className={styles.button + " pl-5 pr-5 mb-4 mt-4"}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-2">
                Profile
              </span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
