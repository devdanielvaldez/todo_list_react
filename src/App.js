/*
Daniel A. Valdez Guzman
FullStack Developer
hello@daniel-valdez.com
https://daniel-valdez.com
+1 (829) 696 - 7695 **/

import { useEffect, useState } from 'react';
import './App.scss';
import { Button, TextField, Grid } from '@material-ui/core';
import { db } from './config/firebase_config';
import TodoListItem from './components/todoList/TodoList';
import { ClimbingBoxLoader } from 'react-spinners';
import DateMomentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

/**
 * Main function
 * @returns 
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoDesInput, setTodoDesInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date);

  useEffect(() => {
    getTodos();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /**
   * this function captures the data returned from the "todos" collection in firestore and is loaded into setTodos
   * properties:
   *  - id: string
   *  - todo: string
   *  - state: boolean
   */
  function getTodos() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      querySnapshot.docs.map((doc) => {
        console.log(doc.data())
      })
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          state: doc.data().state,
          description: doc.data().description,
          date: doc.data().date
        }))
      );
    });
  }

  function handleDataChange(date) {
    setSelectDate(date);
  }

  /**
   * this function captures the entered task and sends it to firestore
   * properties:
   *  - state: boolean
   *  - timestamp: date
   *  - todo: string
   * @param {*} e 
   */
  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      state: true,
      timestamp: Date.now(),
      todo: todoInput,
      description: todoDesInput,
      date: moment(selectDate).format()
    })

    setTodoInput("");
    setTodoDesInput("");
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
            <p className="subTitle">Type your task and press enter to save</p>
            <form>
              <TextField
                id="standard-basic"
                label="Title"
                value={todoInput}
                style={{ width: "90vw", maxWidth: "200px" }}
                onChange={(e) => setTodoInput(e.target.value)}
                inputProps={{ maxLength: 15 }}
              />
              <TextField
                id="standard-basic"
                label="Description"
                value={todoDesInput}
                style={{ width: "90vw", maxWidth: "500px", marginLeft: "10px" }}
                onChange={(e) => setTodoDesInput(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />

              <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <DatePicker value={selectDate} onChange={handleDataChange} label="Date" format='DD/MM/yyy' style={{ width: "90vw", maxWidth: "200px", marginLeft: "10px" }} />
              </MuiPickersUtilsProvider>

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
                  des={todo.description}
                  date={todo.date}
                />
              ))}
            </div>
          </div>
      }

    </div>
  );
}

export default App;