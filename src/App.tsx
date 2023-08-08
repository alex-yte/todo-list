import { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  // let [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: "CSS", isDone: true },
  //   { id: v1(), title: "HTML", isDone: true },
  //   { id: v1(), title: "React", isDone: false },
  //   { id: v1(), title: "Redux", isDone: false },
  // ]);

  // let [tasks2, setTasks2] = useState<Array<TaskType>>([
  //   { id: v1(), title: "NodeJS", isDone: true },
  //   { id: v1(), title: "HTML5", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Yarn", isDone: false },
  // ]);

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => {
      return t.id !== id;
    });
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function changeStasus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];

    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setToodoList([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();
  let todolistId3 = v1();

  let [todolists, setToodoList] = useState<Array<TodoListType>>([
    { id: todolistId1, title: "what to learn", filter: "active" },
    { id: todolistId2, title: "what to buy", filter: "completed" },
    { id: todolistId3, title: "what to hey", filter: "completed" },
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "NodeJS", isDone: true },
      { id: v1(), title: "HTML5", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Yarn", isDone: false },
    ],
    [todolistId3]: [
      { id: v1(), title: "NodeJS1", isDone: true },
      { id: v1(), title: "HTML52", isDone: true },
      { id: v1(), title: "ReactJS3", isDone: false },
      { id: v1(), title: "Yarn4", isDone: false },
    ],
  });
  let removeTodolist = (todolistId: string) => {
    let filteredTdolists = todolists.filter((tl) => tl.id !== todolistId);
    setToodoList(filteredTdolists);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };
  return (
    <div>
      <div className="App">
        {todolists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(
              (t) => t.isDone === true
            );
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(
              (t) => t.isDone === false
            );
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
              removeTodolist={removeTodolist}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
