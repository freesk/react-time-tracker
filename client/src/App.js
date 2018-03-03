// react
import React, { Component } from 'react';

// style
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

import collectjs from '../node_modules/collect.js';

// my components
import Slider from './Slider';

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
    // hardcoded for now
    const username = "dmitry";
    const password = "password";

    // get token and user id
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

  // on init
  componentDidMount() {

    const that = this;

    this.handleLogIn(function() {

      // get token from the local storage
      const token = localStorage.getItem("token");
      // get user id from the local storage
      const userId = localStorage.getItem("userId");
      // for a url
      const url = 'http://localhost:8000/record?userId=' + userId + '&token=' + token;
      // fetch
      fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => {

          const tasks = responseJson.doc;

          // debug
          console.log(tasks);

          // update the state with data
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
    // send requests to the server with
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

    console.log(id);

    const that = this;
    const data = { recordId: id };
    const userId = this.state.userId;
    const token = this.state.token;
    const url = 'http://localhost:8000/record?userId=' + userId + '&token=' + token;

    fetch(url, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {

      console.log(responseJson.message);

      // create a copy of the array
      let tasks = this.state.tasks.slice();
      // find a record by its id
      const found = tasks.find(task => {
        return task._id === id;
      });
      // get its index
      const index = tasks.indexOf(found);
      // remove the record from the array
      tasks.splice(index, 1);
      // apply the change to the state
      this.setState({ tasks: tasks });
    })
    .catch((error) => {
      console.error(error);
    });

  }

  handleNewTask(task) {

    const that = this;
    const data = {
      project: task.project,
      activity: task.activity,
      details: task.details,
      date: task.date
    };

    const userId = this.state.userId;
    const token = this.state.token;
    const url = 'http://localhost:8000/record?userId=' + userId + '&token=' + token;

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {
      const task = responseJson.doc;
      // create a copy of the task array
      let tasks = this.state.tasks.slice();
      // push a new record
      tasks.push(task);
      // update the state with a new array
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
