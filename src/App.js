import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complate = !todo.complate
    setTodos(newTodos)
  }

  function handeAddTodo (e) {
    const name = todoNameRef.current.value
    if ( name === '' ) return
    setTodos(prevTodos => {
      return [...prevTodos, {id: 1, name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handelClear () {
    const newTodos = todos.filter(todo => !todo.complate)
    setTodos(newTodos)
   }
   
  return (
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handeAddTodo}> Add ToDo </button>
      <button onClick={handelClear}> Clear </button>
      <div> {todos.filter(todo => !todo.complate).length} left to do</div>
    </>
  );
}

export default App;