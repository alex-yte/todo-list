import "./App.css";
import Todolist from "./Todolist";

function App() {
  let tasks1 = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "HTML", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ];
  // let tasks2 = [
  //   { id: 1, title: "Terminal", isDone: false },
  //   { id: 2, title: "Resident", isDone: true },
  //   { id: 3, title: "Jango", isDone: true },
  // ];

  function removeTask(id: number) {
    let resultTasks = tasks1.filter((t) => {
      if (t.id !== id) return true;
      else return false;
    });
    console.log(resultTasks);
  }

  return (
    <div>
      <div className="App">
        <Todolist
          title="What to learn"
          tasks={tasks1}
          removeTasks={removeTask}
        />
      </div>
    </div>
  );
}

export default App;
