import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./ingredients-group.module.css";
import Card from "../ingredient-card/ingredient-card";
import { useSelector } from "react-redux";
import React from "react";

const IngredientsGroup = React.forwardRef(({ name, type }, ref) => {
  const data = useSelector((state) => state.ingredients.data);
  const subgroupData = data.filter((item) => item.type === type);

  return (
    <>
      <h2 className={cn("mt-10", "text", "text_type_main-medium")}>{name}</h2>
      <div className={styles.ingredientsSubgroup} ref={ref}>
        {subgroupData.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </>
  );
});

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsGroup;
