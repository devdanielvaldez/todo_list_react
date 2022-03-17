import { useEffect, useState } from 'react';
import './App.scss';
import { Button, TextField } from '@material-ui/core';
import { db } from './config/firebase_config';
import TodoListItem from './components/todoList/TodoList';
import { ClipLoader, ClimbingBoxLoader } from 'react-spinners';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodos();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          state: doc.data().state,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      state: true,
      timestamp: Date.now(),
      todo: todoInput,
    })

    setTodoInput("");
  }

  return (
    <div className="App">
      {
        loading ?
        <ClimbingBoxLoader 
        size={10}
        color={"#282c34"}
        loading={loading}
        />
        :
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1 className="title">TODO LIST</h1>
        <p className="subTitle">Escriba su tarea y presione enter para guardar</p>
        <form>
          <TextField
            id="standard-basic"
            label="Escriba su tarea aquí"
            value={todoInput}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
          </Button>
        </form>

        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              state={todo.state}
              id={todo.id}
            />
          ))}
        </div>
      </div>
      }

    </div>
  );
}

export default App;