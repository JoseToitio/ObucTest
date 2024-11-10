import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';
import { configToken } from '../services/utils';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksTableData, setTasksTableData] = useState({
    headers: [
      { label: "To do", column: "pending" },
      { label: "In progress", column: "inProgress" },
      { label: "Done", column: "done" },
    ],
    rows: [],
  });

  const handleDeleteRow = useCallback(
    async (id) => {
      if (!tasks.length) {
        return;
      }
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [tasks.length, setTasks]
  );

    useEffect(() => {
    setTasksTableData({
      headers: [
        { label: "To do", column: "pending" },
        { label: "In progress", column: "inProgress" },
        { label: "Done", column: "completed" },
      ],
      rows: tasks,
    });
  }, [tasks, setTasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks", configToken());
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const removeTask = (taskToRemove) => {
    handleDeleteRow(taskToRemove);
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskToRemove.id));
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };



  return (
    <TasksContext.Provider value={{ tasks, removeTask, updateTask, setTasks, tasksTableData }}>
      {children}
    </TasksContext.Provider>
  );
};

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
