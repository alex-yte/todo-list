import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      if (newTaskTitle.trim() !== "") {
        props.addItem(newTaskTitle);
        setNewTaskTitle("");
      } else {
        setError("Title is required");
      }
    }
  };
  const addTask = () => {
    debugger;
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  return (
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
  );
}
