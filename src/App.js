import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useEffect, useState } from 'react';

function App() {
  const[tasks, setTasks] = useState([]);
  
  useEffect(()=>{
    if(tasks && tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(()=> {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks);
   }, []);

  /*function addTask(name){
    setTasks(prev =>{
      return [...prev, {name:name, done:false}]
    })
  }*/

  function addTask(name) {
    setTasks(prev => {
      if (!Array.isArray(prev)) {
        prev = []; // Initialize prev as an empty array if it's not already an array
      }
      return [...prev, {name: name, done: false}];
    });
  }

 function removeTask(indexToRemove){
    setTasks(prev => {
      return prev?.filter((taskObject, index) => index !== indexToRemove);
    });
  }



  function updateTaskDone(taskIndex, newDone){
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    })
  }

  const numberComplete = tasks?.filter(t => t.done).length;
  const numberTotal = tasks?.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return "Start with one, you've got this! 🌟";
    }
    if (percentage === 100) {
      return "Great progress, keep it up! 💪";
    }
    return "Almost there, keep pushing forward! 💥";
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <h1>Create your own todo list</h1>
      <h1>{numberComplete}/{numberTotal} Completed</h1>
      <h2>{getMessage()}</h2>
     <TaskForm onAdd={addTask}/>
     {tasks && tasks.map((task, index) =>
     <Task {...task} 
          onRename={newName => renameTask(index,newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index,done)}/>
     )}
    </main>
  );
}

export default App;
