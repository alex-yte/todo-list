import { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTasks: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: () => void;
};

function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={() => {
            setNewTaskTitle;
          }}
        />
        <button
          onClick={() => {
            props.addTask();
          }}
        >
          +
        </button>
      </div>
      <ul className="list">
        {props.tasks.map((t) => {
          return (
            <li>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  props.removeTasks(t.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;
