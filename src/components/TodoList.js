import React, { Component } from "react";
import "./TodoList.css";
import { MdEditSquare } from "react-icons/md";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: "",
    };
  }

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  setFocus = (id) => {
    setTimeout(() => {
      const input = document.getElementById(id);
      input.focus();
    }, 0);
  };

  render() {
    /*  const todoItems = this.props.items.map((todo) => (
      <li key={todo.key}>
        {todo.text}
        <button onClick={() => this.props.deleteTodo(todo.key)}>DEL</button>
      </li>
    )); */

    const todoList = this.props?.items?.map((item) => {
      return (
        <div
          key={item.key}
          className="todo-item"
          style={{
            backgroundColor: item.isEditingEnabled
              ? "rgb(219, 219, 88)"
              : "rgb(99, 99, 207)",
          }}
        >
          <input
            type="checkbox"
            onClick={() => this.props.completedTodo(item.key)}
            checked={item.completed}
            disabled={item.isEditingEnabled}
          />
          {item.isEditingEnabled ? (
            <>
              <input
                type="text"
                id={item.key}
                defaultValue={item?.text}
                onChange={this.handleChange}
              />
              {/* <button
                
              >
                SUBMIT
              </button> */}
              <AiFillCheckCircle
                className="icon-enabled"
                onClick={() => {
                  this.props.updateTodo(
                    item.key,
                    this.state.newTodo ? this.state.newTodo : item.text
                  );
                  this.setState({ newTodo: "" });
                }}
                fontSize={32}
              />
            </>
          ) : (
            <>
              <p
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </p>
              {/* <button>EDIT</button> */}
              <MdEditSquare
                className={item.completed ? "icon-disabled" : "icon-enabled"}
                onClick={() => {
                  this.props.editTodo(item.key);
                  this.setFocus(item.key);
                }}
                disabled={item.completed}
                fontSize={32}
              />
            </>
          )}

          {/* <button onClick={() => props.deleteTodo(item.key)}>DEL</button> */}
          <AiFillDelete
            className={item.isEditingEnabled ? "icon-disabled" : "icon-enabled"}
            onClick={() => this.props.deleteTodo(item.key)}
            fontSize={32}
          />
        </div>
      );
    });

    return <div className="todo-list">{todoList}</div>;
  }
}

export default TodoList;
