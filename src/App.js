import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Filter from "./components/Filter";
//this is add json file
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

  const [tasksAll, setTasksAll] = useState(tasks);

  useEffect(() => {
    setTasks(tasks);
  }, [])
  //为了tasks值变化时候调用
  useEffect(() => {
    console.log(tasks);
  }, [tasks])
 
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = ({ task, day, reminder }) => {
    const id = Math.floor(Math.random() * 1000) + 1;

    const newTask = { id, task, day, reminder };

    setTasks([...tasks, newTask]);
  };

  const doubleClick = (id) => {
   
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const reminderTrue = () => {

    setTasks(tasksAll);
    console.log(tasks, tasksAll);

    setTasks(tasks.filter((task) => task.reminder));
    console.log(true);
  };

  
  const reminderFalse = () => {
    //给tasks赋值后，还是用的旧值，为什么不回调useEffect
    setTasks(tasksAll);
    console.log(tasks, tasksAll);

    setTasks(tasks.filter((task) => !task.reminder));
    console.log(false);
  };

  
//filter功能，点击set/unset 获得reminder=true的列表
  const TargetOption = (value) => {
  
    if (value == 1) {
      reminderTrue();
    } else if (value == 2) {
      reminderFalse();
    } else {
      setTasks(tasksAll);
    }
  };

  return (
    <div className="container">
      <Header
        clickShow={() => setClickShowTask(!clickShowTask)}
        showAdd={clickShowTask}
      />

      {clickShowTask && <AddTask onAdd={addTask} />}

      <Filter option={TargetOption} />

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={doubleClick} />
      ) : (
        "no task to show"
      )}
    </div>
  );
}

export default App;
