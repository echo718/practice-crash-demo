import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    if(!task){
        alert('Please input task.')
        return
    }

    onAdd({ task,day,reminder })

    setTask('')
    setDay('')
    setReminder(false)

  };

  return (
    <form action="" onSubmit={submit}>
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input type="text" placeholder='Add task' value={task} onChange={(e) => setTask(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="">Day</label>
        <input type="text" value={day} onChange={(e) => setDay(e.target.value)} />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="">Set Reminder</label>
        <input
          type="checkbox"
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.value)}
        />
      </div>
      <input type="submit" value=" save" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
