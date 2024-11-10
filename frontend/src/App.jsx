import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/AuthUser/Login/Login";
import Register from "./pages/AuthUser/Register/Register";
import { TasksProvider } from "./context/TasksContext";
import { TagsProvider } from "./context/TagsContext";
function App() {
  return (
    <TasksProvider>
      <TagsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </TagsProvider>
    </TasksProvider>
  );
}

export default App;
