import React from 'react';
import ReactDOM from 'react-dom';
import LocalDb from 'localDb';
import axios from 'axios';

import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';

class App extends React.Component { // Define components, inherit parent
    constructor() { // Define the constructor of the App class-base component
        super(); // Call the constructor of the parent class
        this.state = { // Define the status of components
            todos: [],
            isAllChecked: false
        };
    }

    // (Read) Viewing to-do lists
    componentDidMount() {
        var thiss = this;
        axios.get('/todolist')
        .then(function(result) {
            thiss.setState({
                todos: result.data.map((todo) => {
                    var newItem = {
                        ID : todo.ID,
                        todoitem : todo.todoitem,
                        isDone : todo.isDone
                    }
                    return newItem;
                })
            });
        }).catch(err => {
            console.log('Oops!', err);
        });
    }

    // (Create) Add to-do item
    addNewTodoItem(todoItem) {
        console.log("todoitem: " + JSON.stringify(todoItem));
        axios.post('/todoitem', todoItem)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log('Oops!', err);
        });
    }

    // (Delete) Delete to-do item
    deleteCurrentItem(index) {
        axios.delete('/todoitem', index)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log('Oops!', err);
        });
    }

    // (Update) Selete to-do item
    selectOne(index) {
        var thiss = this;
        var obj = { ID: index, isDone: this.props.isDone };
        axios.put('/todoitem', obj)
        .then(function(res) {
            console.log(res);
            thiss.allChecked();
        }).catch(err => {
            console.log('Oops!', err);
        });
    }

    // (Update) Selete all completed items
    selectAll(isAllCheck) {
        axios.put('/completeditem', isAllCheck)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log('Oops!', err);
        });
    }

    // (Delete) Delete all completed items
    deleteCompeltedItem() {
        axios.delete('/completeditem')
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log('Oops!', err);
        });
    }

    // Determine if the status of all tasks is completed, sync the bottom of the box
    allChecked() {
        let isAllChecked = false;
        if (this.state.todos.every(todo => todo.isDone)) {
            isAllChecked = true;
        }
        this.setState({ // Change the status, render the component
            todos: this.state.todos,
            isAllChecked: isAllChecked
        });
    }

    // Add to-do item, pass to Header 
    addTodo(todoItem) {
        this.state.todos.push(todoItem);
        this.addNewTodoItem(todoItem);
        this.allChecked();
    }

    // Delete current item, pass to TodoItem
    deleteTodo(pos, index) {
        this.state.todos.splice(pos, 1);
        this.setState({todos: this.state.todos}); // Change the status
        this.deleteCurrentItem(index);
    }
    editTodo(todoItem) {}
    // Clear completed items, pass to Footer
    clearDone() {
        let todos = this.state.todos.filter(todo => !todo.isDone); // Filter the items in array with todo.isDone
        this.setState({
            todos: todos,
            isAllChecked: false
        });
        this.deleteCompeltedItem();
    }
    
    // Change the status of to-do item, pass to TodoItem and Footer
    changeTodoState(pos, index, isDone, isChangeAll) { // Initialize isChaneAll as false
        if(isChangeAll) { // All operations
            this.setState({
                todos: this.state.todos.map((todo) => {
                    todo.isDone = isDone;
                    return todo;
                }),
                isAllChecked: isDone
            });
            this.selectAll(isDone);
        } else { // Operate one of to-do items
            this.state.todos[pos].isDone = isDone;
            // this.allChecked();
            this.selectOne(index);
        }
    }

    // Render components
    render() {
        let info = {
            isAllChecked: this.state.isAllChecked,
            todoCount: this.state.todos.length || 0,
            todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
        };
        return (<div className="todo-wrap">
                <TodoHeader addTodo={this.addTodo.bind(this)} />
                <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} editTodo={this.editTodo.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
                <TodoFooter {...info} changeTodoState={this.changeTodoState.bind(this)} clearDone={this.clearDone.bind(this)} />
            </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));