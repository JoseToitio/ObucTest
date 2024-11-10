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
import { IoCloseOutline } from "react-icons/io5";

export default function Board({ tasks, tag, setTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTasks, setFilterTasks] = useState([]);
  const clearNewTask = {
    description: "",
    categories: [],
    title: "",
  };
  const [newTask, setNewTask] = useState(clearNewTask);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
    setNewTask(clearNewTask);
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
          categories: newTask.categories,
        },
        configToken()
      );
      const response = await api.get("/tasks", configToken());
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !newTask.categories.includes(selectedOption)) {
      setNewTask((prev) => ({
        ...prev,
        categories: [...prev.categories, selectedOption],
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setNewTask((prev) => ({
      ...prev,
      categories: prev.categories.filter((tag) => tag !== tagToRemove),
    }));
  };

  const filterTask = (event) => {
    const { value } = event.target;
    const lowerCaseValue = value.toLowerCase();

    if (value === "") {
      setFilterTasks([]);
      return;
    }

    const filtered = tasks.rows.filter((task) =>
      task.categories.some((categoryArray) =>
        Array.isArray(categoryArray)
          ? categoryArray.some((category) =>
              category.toLowerCase().includes(lowerCaseValue)
            )
          : categoryArray.toLowerCase().includes(lowerCaseValue)
      )
    );

    setFilterTasks(filtered);
  };

  const filteredTasks = filterTasks.length > 0 ? filterTasks : tasks.rows;

  return (
    <div id="board-wrapper">
      <div className="button-input">
        <Button onClick={handleOpenModal}>
          <FaPlus />
          Add Task
        </Button>
        <InputText
          placeholder="Digite a categoria desejada"
          onChange={filterTask}
        />
      </div>
      <KanbanBoard
        data={{
          headers: tasks.headers,
          rows: filteredTasks,
        }}
      />
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
          onChange={handleTagChange}
        />
        <div className="tag-modal">
          {newTask.categories.map((tag, index) => (
            <div key={index} className="tag-card div-tag-modal">
              <span>{tag}</span>
              <IoCloseOutline onClick={() => removeTag(tag)} size={16} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

Board.propTypes = {
  tasks: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
  tag: PropTypes.array.isRequired,
};
