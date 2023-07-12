import styles from "./preloader.module.css";

import MoonLoader from "react-spinners/MoonLoader";

function Preloader() {
  return (
    <div className={styles.container}>
      <MoonLoader
        color="white"
        loading={true}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Preloader;
