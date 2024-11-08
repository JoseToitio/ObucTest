import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { configToken } from "../../services/utils";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [tasksTableData, setTasksTableData] = useState({
    headers: [
      { label: "Responsible", column: "assignedTo" },
      { label: "Description", column: "description" },
      { label: "Status", column: "status" },
    ],
    rows: [],
  });

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

  useEffect(() => {
    setTasksTableData({
      headers: [
        { label: "Responsible", column: "assignedTo" },
        { label: "Description", column: "description" },
        { label: "Status", column: "status" },
      ],
      rows: tasks,
    });
  }, [tasks, setTasks]);

  const statusOptions = [{ id: 1, value: "pending", label: "Pending" }, { id: 2, value: "inProgress", label: "In Progress" }, { id: 3, value: "completed", label: "Done" }];

  const tabs = {
    board: (
      <Board
        status={statusOptions}
        tasks={tasksTableData}
        setTasks={setTasks}
      />
    ),
    tags: <Tags  />,
  };
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
