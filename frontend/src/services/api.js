import axios from "axios";
import { configToken } from "./utils";

export const api = axios.create({
  baseURL: import.meta.env.VITE_HOSTNAME_BACKEND,
});

export const updateTaskStatus = (id, body) => {
  try {
    api.patch(`/tasks/${id}`, body, configToken);
  } catch (e) {
    console.error("Error updating task status:", e);
  }
};
