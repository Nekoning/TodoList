import React, { Component } from 'react';

class TodoFooter extends Component {
    // Change the completion status of to-do item 
    handlerSelectAll(event) {
        console.log("checked: " +  event.target.checked)
        this.props.changeTodoState(null, null, event.target.checked, true); // true represents all operations
    }

    // Delete all completed items
    handlerDeleteDone() {
        this.props.clearDone();
    }

    render() {
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={this.props.isAllChecked} onChange={this.handlerSelectAll.bind(this)} />Select All
                </label>
                <span><span className="text-success">Completed {this.props.todoDoneCount}</span> / <span className="text-muted">All {this.props.todoCount}</span></span>
                <button className="btn btn-danger" onClick={this.handlerDeleteDone.bind(this)}>Clear completed</button>
            </div>
        ) 
    }   
}

export default TodoFooter;