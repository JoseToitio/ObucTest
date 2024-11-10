import PropTypes from "prop-types";
import "./KanbanBoard.css";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import { TasksContext } from "../../context/TasksContext";

function borderColor(label) {
  switch (label) {
    case "To do":
      return "#00569E";
    case "In progress":
      return "#FFA500";
    case "Done":
      return "#40A737";
    default:
      break;
  }
}


export default function KanbanBoard({ data }) {
  const [columns, setColumns] = useState(data);
  const { updateTask } = useContext(TasksContext);
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      removed.status = destination.droppableId;
      destItems.splice(destination.index, 0, removed);
      updateTask(removed, {
        status: destination.droppableId,
      });
      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: copiedItems,
      });
    }
  };
  useEffect(() => {
    const groupedTasks = data.headers.reduce((acc, { column }) => {
      acc[column] = data.rows.filter((task) => task.status === column);
      return acc;
    }, {});
    setColumns(groupedTasks);
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="drag-drop">
        {data.headers.map(({ label, column }) => (
          <Droppable droppableId={column} key={column}>
            {(provided) => (
              <ul
                className="column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="label">
                  <label>{label}</label>
                  <hr style={{ borderTop: `3px solid ${borderColor(label)}` }} />
                </div>
                {columns[column]?.map((task, index) => (
                  <Card key={index} index={index} task={task}/>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

KanbanBoard.propTypes = {
  data: PropTypes.object.isRequired,
};
