import { useRef } from "react";
import styles from "./stuffing-card.module.css";
import PropTypes from "prop-types";
import cn from "classnames";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ingredientMoved,
  removeItem,
} from "../../../../services/slices/burger-constructor";

function StuffingCard({ ingredient, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const uuid = ingredient.uuid;

  const [{ handlerId }, drop] = useDrop({
    accept: "stuffing",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(ingredientMoved({ fromIndex: dragIndex, toIndex: hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "stuffing",
    item: () => {
      return { uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleRemoveItemClick = () => {
    dispatch(removeItem(index));
  };

  return (
    <div
      className={cn(styles.ingredientContainer, "pl-4", "pr-4")}
      style={{ opacity }}
      key={ingredient._id}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={handleRemoveItemClick}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </div>
  );
}

export default StuffingCard;
