import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoForm from './components/Todos/TodoForm'
import TodoList from './components/Todos/TodoList'
import TodoActions from './components/Todos/TodoActions'
import './App.css'


function App() {
  const [todos, setTodos] = useState([])
  console.log(todos)
  
  const addTodoHandler = (text) => {
    const newTodo = {
      text: text,
      isCompleted: false,
      id: uuidv4()
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => id !== todo.id))
  }

  const toggleTodoHandler = (id) => {
    setTodos(todos.map(todo => id === todo.id ? 
      {...todo, isCompleted: !todo.isCompleted} :
      {...todo}
    ))
  }

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter(todo => !todo.isCompleted))
  }

  const resetTodosHandler = () => {
    setTodos([])
  }

  const completedTodosCount = todos.filter(todo => todo.isCompleted).length
  console.log(completedTodosCount)

  return (
    <>
      <h2> Todo List </h2>
      <TodoForm addTodo = {addTodoHandler} />
      {!!todos.length && <TodoActions deleteCompletedTodos = {deleteCompletedTodosHandler} resetTodos = {resetTodosHandler} completedTodosExist = {!!completedTodosCount} /> }
      <TodoList todos = {todos} deleteTodo = {deleteTodoHandler} toggleTodo = {toggleTodoHandler} completedTodos = {completedTodosCount} />
      {!!completedTodosCount && <h2>{`You have ${completedTodosCount} completed ${completedTodosCount > 1 ? "todos" : "todo"}`}</h2>}
    </>
  );
}

export default App;
