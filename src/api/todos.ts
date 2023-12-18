import axios from "axios";
import { Todo } from "../types/todoType";

const SERVER_URI = "http://localhost:4000";

const getTodos = async () => {
  const response = await axios.get(`${SERVER_URI}/todos`);
  return response.data;
};

const addTodo = async (newTodo: Todo) => {
  const response = await axios.post(
    `${SERVER_URI}/todos`,newTodo
    );
  return response.data;
};

const deleteTodo = async (id: string) => {
  const response = await axios.delete(
    `${SERVER_URI}/todos/${id}`
  );
  return response.data;
};

const switchTodo = async ({ id, isDone }: { id: string; isDone: boolean }) => {
  const response = await axios.patch(
    `${SERVER_URI}/todos/${id}`,{isDone: !isDone,}
  );
  return response.data;
};

export { getTodos, addTodo, deleteTodo, switchTodo };
