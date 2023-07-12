import styles from "./error.module.css";
import cn from "classnames";

function Error() {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}> 😅 Упс! Что-то не так... </h2>
    </div>
  );
}

export default Error;
