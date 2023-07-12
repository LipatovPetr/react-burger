import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./constructor.module.css";

import IngredientsSection from "./ingredients-section/ingredients-section";
import ConstructorSection from "./constructor-section/constructor-section";

export default function Constructor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.constructor}>
        <IngredientsSection />
        <ConstructorSection />
      </div>
    </DndProvider>
  );
}
