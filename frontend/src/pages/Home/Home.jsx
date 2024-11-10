import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { TagsContext } from "../../context/TagsContext";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");
  const { tasksTableData, setTasks } = useContext(TasksContext);
  const { tags, addTag, removeTag } =  useContext(TagsContext);

  const tabs = {
    board: (
      <Board
        tag={tags}
        tasks={tasksTableData}
        setTasks={setTasks}
      />
    ),
    tags: <Tags addTag={addTag} removeTag={removeTag} tags={tags}  />,
  };
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
