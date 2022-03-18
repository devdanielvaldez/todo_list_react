/*
Daniel A. Valdez Guzman
FullStack Developer
hello@daniel-valdez.com
https://daniel-valdez.com
+1 (829) 696 - 7695 **/

import React from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "../../config/firebase_config";
import "./TodoList.scss"
import moment from "moment";

export default function TodoListItem({ todo, state, id, des, date }) {
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
      <Button onClick={deleteTodo}>
        EDIT
      </Button>
    </div>
  );
}