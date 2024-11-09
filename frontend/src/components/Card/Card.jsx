import PropTypes from "prop-types";
import "./Card.css";
import { Draggable } from "@hello-pangea/dnd";

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    transitionDuration: `0.001s`,
  };
}

export default function Card({ task, index }) {
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
          className="list-group"
        >
          <div className="title-card">
            <p>{task.title}</p>
          </div>
          <div className="description">
            <p>{task.description}</p>
          </div>
          <hr className="last-line"/>
          <div className="tag-card">{task.status}</div>
        </li>
      )}
    </Draggable>
  );
}

Card.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
};
