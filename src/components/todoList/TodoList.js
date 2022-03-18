/*
Daniel A. Valdez Guzman
FullStack Developer
hello@daniel-valdez.com
https://daniel-valdez.com
+1 (829) 696 - 7695 **/

import React, { useState } from "react";
import { ListItem, ListItemText, Button, Modal, Typography, Box, TextField } from "@material-ui/core";
import { db } from "../../config/firebase_config";
import "./TodoList.scss"
import DateMomentUtils from '@date-io/moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

export default function TodoListItem({ todo, state, id, des, date }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [todoId, setTodoId] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [todoDesInput, setTodoDesInput] = useState("");
  const [selectDate, setSelectDate] = useState(new Date);

  /**
   * this function performs an update to the "state" property on a specific record within the "all" collection
   */
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      state: !state,
    });
  }

  /**
   * this function performs a delete to the property on a specific record within the "all" collection
   */
  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  function openModal() {
    handleOpen();
    setSelectDate(date);
    setTodoInput(todo);
    setTodoDesInput(des);
    setTodoId(id);
  }

  function handleDataChange(date) {
    setSelectDate(date);
  }

  function updateTodo() {
    db.collection("todos").doc(todoId).update({
      todo: todoInput,
      description: todoDesInput,
      date: moment(selectDate).format()
    });
    handleClose();
  }



  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={state ? "Developing 🚧" : "Done ✅"}
        />
        <ListItemText
          primary={des}
          secondary={moment(date).format('LL')}
        />
      </ListItem>

      <Button onClick={toggleInProgress}>
        {state ? "Done" : "Not Completed"}
      </Button>
      <Button onClick={deleteTodo}>
        <i className="bi bi-trash"></i>
      </Button>
      <Button onClick={openModal}>
        EDIT
      </Button>

      {/* begin::modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit_modal"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit TODO
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <form>
              <TextField
                id="standard-basic"
                label="Title"
                value={todoInput}
                style={{ width: "90vw", maxWidth: "400px" }}
                onChange={(e) => setTodoInput(e.target.value)}
                inputProps={{ maxLength: 15 }}
              />
              <TextField
                id="standard-basic"
                label="Description"
                value={todoDesInput}
                style={{ width: "90vw", maxWidth: "400px" }}
                onChange={(e) => setTodoDesInput(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />

              <MuiPickersUtilsProvider utils={DateMomentUtils}>
                <DatePicker value={selectDate} onChange={handleDataChange} label="Date" format='DD/MM/yyy' style={{ width: "90vw", maxWidth: "400px" }} />
              </MuiPickersUtilsProvider>

              <Button onClick={updateTodo} style={{ marginTop: "5px", backgroundColor: "#1C4966", color: "#FFF" }}>
                SAVE
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
      {/* end::modal */}
    </div>
  );
}