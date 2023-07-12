import { Outlet } from "react-router-dom";
import Header from "../header/header";
import styles from "./layout.module.css";

export default function Layout() {
  return (
    <div className={styles.page}>
      <Header />
      <Outlet />
    </div>
  );
}
