import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Filter from "./components/Filter";
import About from "./components/About";


//this is new add on 14/02/2022-v2
function App() {
  const [clickShowTask, setClickShowTask] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const dataFromServer = await fetchTasks();
      setTasks(dataFromServer);
    };

    getTasks();
  }, []);


  //fetch data
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();

    return data;
  };

  //fetch data
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const [tasksAll, setTasksAll] = useState(tasks);

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    console.log("delete");

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = async ({ task, day, reminder }) => {
    const newTask = { task, day, reminder };

    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 1000) + 1;

    // const newTask = { id, task, day, reminder };

    // setTasks([...tasks, newTask]);
  };
  //double click for reminder
  const doubleClick = async (id) => {
    const toggleData = await fetchTask(id);
    const updTask = { ...toggleData, reminder: !toggleData.reminder };

    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    console.log(1, updTask, data);

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
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
    <Router>
      <div className="container">
        <Header
          clickShow={() => setClickShowTask(!clickShowTask)}
          showAdd={clickShowTask}
        />

        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {clickShowTask && <AddTask onAdd={addTask} />}

              <Filter option={TargetOption} />

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={doubleClick}
                />
              ) : (
                "no task to show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
