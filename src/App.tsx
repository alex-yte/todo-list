import { useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  let [tasks2, setTasks2] = useState<Array<TaskType>>([
    { id: v1(), title: "NodeJS", isDone: true },
    { id: v1(), title: "HTML5", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Yarn", isDone: false },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => {
      return t.id !== id;
    });
    setTasks(filteredTasks);
  }

  function changeStasus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    let copy = [...tasks];
    setTasks(copy);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    // setFilter(value);
  }

  let [todoList, setToodoList] = useState<Array<TodoListType>>([
    { id: v1(), title: "what to learn", filter: "active" },
    { id: v1(), title: "what to buy", filter: "completed" },
  ]);

  return (
    <div>
      <div className="App">
        {todoList.map((tl) => {
          let tasksForTodoList = tasks;
          if (tl.filter === "completed") {
            tasksForTodoList = tasks.filter((t) => t.isDone === true);
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasks.filter((t) => t.isDone === false);
          }

          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodoList}
              removeTasks={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStasus}
              filter={tl.filter}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
