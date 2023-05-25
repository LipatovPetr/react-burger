import styles from "./placeholder.module.css";
import cn from "classnames";


function Placeholder({ text }) {
  return (
    <div className={styles.container}>
      <h2 className={cn(styles.title, "text_type_main-default", "text_color_inactive")}>Drag here { text }</h2>
    </div>
  );
}

export default Placeholder;


