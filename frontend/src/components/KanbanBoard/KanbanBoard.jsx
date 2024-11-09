import PropTypes from "prop-types";
import "./KanbanBoard.css";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { updateTaskStatus } from "../../services/api";

export default function KanbanBoard({ data }) {
  const [columns, setColumns] = useState(data);
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
      updateTaskStatus(removed.id, {
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
    <div className="container-board">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.headers.map(({ label, column }) => (
          <Droppable droppableId={column} key={column}>
            {(provided, snapshot) => (
              <ul
                className="tasks"
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "lightgrey",
                  padding: 4,
                  width: 250,
                }}
              >
                <label>{label}</label>
                {columns[column]?.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="title">
                          <p>{task.title}</p>
                          <hr />
                        </div>
                        <div className="description">
                          <p>{task.description}</p>
                        </div>
                        <div className={`status ${task.status}`}>
                          {task.status}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

KanbanBoard.propTypes = {
  data: PropTypes.object.isRequired,
};
