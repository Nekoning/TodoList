import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TodoItem extends Component {
    constructor(props) {
       super(props);
    }
    

    // Toggle the completion status of the to-do item
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.pos, this.props.index, isDone, false);
    }

    // Move in mouse
    handlerMouseOver() {
        ReactDOM.findDOMNode(this).style.background = '#eee';
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'inline-block';
    }

    // Move out mouse
    handlerMouseOut() {
        ReactDOM.findDOMNode(this).style.background = '#fff';
        ReactDOM.findDOMNode(this.refs.delButton).style.display = 'none';
    }

    // Edit current to-do item
    handlerEdit() {

    }

    // Delete current to-do item
    handlerDelete() {
        this.props.deleteTodo(this.props.pos, this.props.index);
    }

    render() {
        let className = this.props.isDone ? 'task-done' : '';
        return (
            <li key={this.props.pos} onMouseOver={this.handlerMouseOver.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
                <label>
                <input type="checkbox" checked={this.props.isDone} onChange={this.handlerChange.bind(this)} />
                <span className={className}>{this.props.todoitem}</span>
                </label>
                <button ref="delButton" className="btn btn-danger" onClick={this.handlerDelete.bind(this)}>Delete</button>
            </li>
        )
    }
}

export default TodoItem;