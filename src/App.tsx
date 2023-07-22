import "./App.css";
import Todolist from "./Todolist";

function App() {
  let tasks1 = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "HTML", isDone: true },
    { id: 3, title: "React", isDone: false },
  ];
  let tasks2 = [
    { id: 1, title: "Terminal", isDone: false },
    { id: 2, title: "Resident", isDone: true },
    { id: 3, title: "Jango", isDone: true },
  ];

  return (
    <div>
      <div className="App">
        <Todolist title="What to learn" tasks={tasks1} />
        <Todolist title="Movies" tasks={tasks2} />
      </div>
    </div>
  );
}

export default App;
