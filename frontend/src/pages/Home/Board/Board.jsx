import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import Table from "../../../components/Table/Table";
import PropTypes from "prop-types";
import { api } from "../../../services/api";
import { configToken } from "../../../services/utils";
import KanbanBoard from "../../../components/KanbanBoard/KanbanBoard";

export default function Board({ tasks, setTasks, status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clearNewTask = {
    description: "",
    status: "",
    title: "",
  };
  const [newTask, setNewTask] = useState(clearNewTask);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tasks.rows.length) {
        return;
      }
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [tasks.rows.length, setTasks]
  );

  const handleSubmit = async () => {
    
    try {
      await api.post("/tasks", {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
      }, configToken());
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
      <Table data={tasks} handleDeleteRow={handleDeleteRow} />
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
          label="Status"
          required={true}
          placeholder={"Select status"}
          options={status}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, status: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}

Board.propTypes = {
  status: PropTypes.array.isRequired,
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
};
