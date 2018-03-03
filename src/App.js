// react
import React, { Component } from 'react';

// style
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

import collectjs from '../node_modules/collect.js';

// my components
import Slider from './Slider';

// temporal solution for unique id
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      userId: null,
      token: null
    };

    // to store ids of updated records
    this.toSync = [];

    // once a minute
    this.timerId = setInterval(() => {
        // sync time records with the server
        this.syncTime();
    }, 1000 * 60);

    this.syncTime = this.syncTime.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn(callback) {
    const username = "dmitry";
    const password = "password";

    fetch('http://localhost:8000/user/login?username=' + username + '&password=' + password + '')
      .then((response) => response.json())
      .then((responseJson) => {
        const userId = responseJson.userId;
        const token = responseJson.token;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {

    const that = this;

    this.handleLogIn(function() {

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const url = 'http://localhost:8000/record?userId=' + userId + '&token=' + token;

      fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => {

          const tasks = responseJson.doc;

          console.log(tasks);

          that.setState({
            tasks: tasks,
            token: token,
            userId: userId
          });

        })
        .catch((error) => {
          console.error(error);
        });

    });
  }

  syncTime() {

  }

  handleTimeUpdate(obj) {
    let tasks = this.state.tasks.slice();
    const found = tasks.find(task => {
      return task._id === obj._id;
    });
    const index = tasks.indexOf(found);
    tasks[index].seconds = obj.seconds;

    const that = this;

    // send a request to the server ???
    // push an id into to-sync-array

    this.setState({ tasks: tasks });
  }

  handleDeleteClick(id) {
    let tasks = this.state.tasks.slice();
    const found = tasks.find(task => {
      return task._id === id;
    });
    const index = tasks.indexOf(found);
    tasks.splice(index, 1);

    // send a request to the server
    // ...

    this.setState({ tasks: tasks });
  }

  handleNewTask(task) {

    const that = this;
    const data = {
      project: task.project,
      activity: task.activity,
      details: task.details,
      date: task.date
    };

    console.log(data);

    const userId = this.state.userId;
    const token = this.state.token;
    const url = 'http://localhost:8000/record?userId=' + userId + '&token=' + token;

    // let tasks = this.state.tasks.slice();
    // tasks.push(task);

    // console.log(task);

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {

      const task = responseJson.doc;

      let tasks = this.state.tasks.slice();
      tasks.push(task);

      this.setState({ tasks: tasks });

    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {

    // collect all projects for autofill
    const collection = collectjs(this.state.tasks);
    const grouped = collection.groupBy("project").keys();
    const projects = grouped.items;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">React Time Tracker</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Slider
              tasks={this.state.tasks}
              projects={projects}
              onHandleNewTask={this.handleNewTask}
              onHandleTimeUpdate={this.handleTimeUpdate}
              onHandleDeleteClick={this.handleDeleteClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
