import { useState } from 'react'
import './App.css'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import Todo from './components/Todos/Todo'
import deleteAllIcon from './assets/images/renew.png'
import deleteCompletedIcon from './assets/images/trash.png'

function App() {
  const [tasks, setTasks] = useState([])
  console.log(tasks)
  const complTasks = tasks.reduce((acc, curr) => curr.completed ? acc += 1 : acc, 0)
  console.log(complTasks)
  
  const formHandler = event => {
    event.preventDefault()
    const newTaskValue = document.getElementById("todo-create").value
    if (newTaskValue) {
      setTasks((prevTasks) => [...prevTasks, { task: newTaskValue, completed: false }])
      document.getElementById("todo-create").value = ''
    }
  }

  const taskCompleteAction = (event) => {
    setTasks(tasks.map((element, index) => {
        const allTodos = Array.from(event.target.parentNode.parentNode.parentNode.children)
        const i = allTodos.indexOf(event.target.parentNode.parentNode)
        return element.task === event.target.closest(`.todo`).textContent && index === i ? 
          {task: element.task, completed: !element.completed} : 
          element
      }
    ))   
  }

  const deleteAllCompleted = (event) => {
    setTasks(tasks.filter(todo => todo.completed === false))
  }

  const deleteAll = (event) => {
    setTasks([])
  }

  const taskDeleteAction = (event) => {
      // const parentTodo = event.target.closest(`.todo`)
      // const parentTodoText = parentTodo.textContent
      const allTodos = Array.from(event.target.parentNode.parentNode.parentNode.children)
      const i = allTodos.indexOf(event.target.parentNode.parentNode)
      setTasks(tasks.filter((_, ind) => ind !== i))
  }

  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>Todo List</h1>
      <TodoForm onSubmit = {formHandler}/>
      <div className="bulkActionsContainer">
        <button className = "deleteAll" onClick = {deleteAll}> <img src={deleteAllIcon} alt="" /> </button>
        <button className = "deleteCompleted" onClick = {deleteAllCompleted}> <img src={deleteCompletedIcon} alt="" /> </button>
      </div>
      <TodoList>
        {
          tasks.length ? 
            tasks.map((todo, index) => 
            <Todo 
              key={index} 
              text={todo.task} 
              status={todo.completed} 
              deleteAction={taskDeleteAction} 
              completeAction={taskCompleteAction}
            />) : 
            <h2 style={{textAlign: "center"}}>Todo list is empty</h2>        
        }
      </TodoList>
      { 
        complTasks ? 
          <h2 style={{textAlign: "center", marginTop: "20px"}}>You have completed {complTasks} todos</h2> : 
          null
      }
    </div>
  );
}

export default App;
