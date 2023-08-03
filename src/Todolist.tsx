import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTasks: (id: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      if (newTaskTitle.trim() !== "") {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
      } else {
        setError("Title is required");
      }
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addTask(newTaskTitle.trim());
    setNewTaskTitle("");
  };
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul className="list">
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTasks(t.id);
          };
          const onChangeHandlerCheck = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={onChangeHandlerCheck}
              />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={onAllClickHandler}
          className={props.filter === "all" ? "active-filter" : ""}
        >
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={props.filter === "active" ? "active-filter" : ""}
        >
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={props.filter === "completed" ? "active-filter" : ""}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;
