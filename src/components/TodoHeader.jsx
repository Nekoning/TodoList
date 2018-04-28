import React, { Component } from 'react';

var ENTER_KEY = 13;

class TodoHeader extends Component {
    // Bind keyboard returns, add new tasks
    handleKeyUp(event) {
        if (event.keyCode === ENTER_KEY) {
            let value = event.target.value;

            if (!value) {
                return false;
            }

            let newTodoItem = {
                todoitem: value,
                isDone: false
            };

            event.target.value = '';
            this.props.addTodo(newTodoItem); // Use props to call App component
        }
    }

    render() {
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp.bind(this)} type="text" placeholder="What needs to be done?" />
            </div>
        )
    }
}

export default TodoHeader;