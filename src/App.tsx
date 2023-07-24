import { useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "HTML", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => {
      return t.id !== id;
    });
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div>
      <div className="App">
        <Todolist
          title="What to learn"
          tasks={tasksForTodoList}
          removeTasks={removeTask}
          changeFilter={changeFilter}
        />
      </div>
    </div>
  );
}

export default App;
