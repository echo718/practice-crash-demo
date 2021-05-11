import { useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [clickShowTask, setClickShowTask] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
    {
      id: 2,
      task: "Meeting at School",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
    {
      id: 3,
      task: "Food Shopping",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = ({ task, day, reminder }) => {
    const id = Math.floor(Math.random() * 1000) + 1;

    const newTask = { id, task, day, reminder };

    setTasks([...tasks, newTask]);
  };

  const doubleClick = (id) => {
    // 后面为什么不能用{task}
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        clickShow={() => setClickShowTask(!clickShowTask)}
        showAdd={clickShowTask}
      />

      {clickShowTask && <AddTask onAdd={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={doubleClick} />
      ) : (
        "no task to show"
      )}
    </div>
  );
}

export default App;
