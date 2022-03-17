import React from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "../../config/firebase_config";
import "./TodoList.scss"

export default function TodoListItem({ todo, state, id }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      state: !state,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }


  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={state ? "En Desarrollo 🚧" : "Completa ✅"}
        />
      </ListItem>

      <Button onClick={toggleInProgress}>
        {state ? "Lista" : "No Completada"}
      </Button>
      <Button onClick={deleteTodo}>
      <i class="bi bi-trash"></i>
      </Button>
    </div>
  );
}