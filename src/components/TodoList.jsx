import React, { Component } from 'react';
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        if(this.props.todos.length === 0) {
            return (
                <div className="todo-empty">Everything is Done! </div>
            )
        } else {
            return (
                <ul className="todo-list">
                    {
                        this.props.todos.map((todo, idx) => {
                            // console.log(index + " : " + todo + "-- ID: " + todo.ID + "-- ToDoItem: " + todo.todoitem)
                            // {...this.props} is used to pass todos attributes of TodoList
                            // and delete, change, edit methods
                            return <TodoItem key={idx} pos={idx} todoitem={todo.todoitem} isDone={todo.isDone} index={todo.ID} {...this.props} />
                        })
                    }
                </ul>
            )
        }
    }
}

export default TodoList;