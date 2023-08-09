import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string, todolistId: string) => void;
  id: string;
};
export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      if (newTaskTitle.trim() !== "") {
        props.addItem(newTaskTitle, props.id);
        setNewTaskTitle("");
      } else {
        setError("Title is required");
      }
    }
  };
  const [error, setError] = useState<null | string>(null);
  const addItem = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    props.addItem(newTaskTitle.trim(), props.id);
    setNewTaskTitle("");
  };

  return (
    <div className="addList">
      <input
        type="text"
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addItem}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
