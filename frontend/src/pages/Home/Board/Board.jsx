import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useState } from "react";
import InputText from "../../../components/InputText/InputText";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import { configToken } from "../../../services/utils";
import KanbanBoard from "../../../components/KanbanBoard/KanbanBoard";

export default function Board({ tasks, tag,  onFilterTask, setTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearNewTask = {
    description: "",
    categories: [],
    title: "",
  };
  const [newTask, setNewTask] = useState(clearNewTask);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      await api.post(
        "/tasks",
        {
          title: newTask.title,
          description: newTask.description,
          categories: [newTask.categories],
        },
        configToken()
      );
      const response = await api.get("/tasks", configToken());
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div id="board-wrapper">
      <Button onClick={handleOpenModal}>
        <FaPlus />
        Add Task
      </Button>
      <InputText placeholder="Digite a categoria desejada" onChange={onFilterTask} />
      <KanbanBoard data={tasks} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Add new task`}
        handleSubmit={handleSubmit}
        setNewTask={setNewTask}
      >
        <InputText
          label="Title"
          placeholder={"Insert task title"}
          required={true}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <InputText
          required={true}
          label="Description"
          placeholder={"Insert task description"}
          textarea
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <OptionSelect
          label="Tags"
          required={true}
          placeholder={"Select tag"}
          options={tag}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, categories: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}

Board.propTypes = {
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
  tag: PropTypes.array.isRequired,
  onFilterTask: PropTypes.func.isRequired,
};
