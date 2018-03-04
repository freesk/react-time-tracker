// react
import React, { Component } from 'react';

// style
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

import collectjs from '../node_modules/collect.js';

// my components
import Slider from './Slider';
import Modal from './Modal';
import LogIn from './LogIn';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      token: null,
      error: ""
    };

    this.syncTimeSpan = 1000 * 10;

    // to store ids of updated records
    this.toSync = [];

    this.syncTime = this.syncTime.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.startSyncTimer = this.startSyncTimer.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
  }

  getTheRecords() {
    const token = this.state.token;
    // form a url string
    const url = 'http://localhost:8000/record?token=' + token;
    // fetch
    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error)
          // update the state with an error message and reset
          // the token if this request returns an error
          return this.setState({
            error: responseJson.error,
            token: ""
          });
        // a reference
        const tasks = responseJson.doc;
        // update the state with data
        this.setState({ tasks: tasks }, () => {
          this.startSyncTimer();
        });
      })
      .catch(() => {
        // critical error
        // ...
      });
  }

  componentDidMount() {
    // get a token from the local storage
    const token = localStorage.getItem("token");

    // debug
    // const token = null;

    // try to use an available token
    if(token)
      // update the state with the token form the local storage
      this.setState({ token: token }, () => {
        // once it is set, get the records
        this.getTheRecords();
      });
    // else, do nothing and proceed
  }

  handleLogInSubmit(credentials) {
    const username = credentials.username;
    const password = credentials.password;

    console.log(username + ":" + password);

    // get token and user id
    fetch('http://localhost:8000/user/login?username=' + username + '&password=' + password + '')
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error)
          return this.setState({ error: responseJson.error });
        // a reference
        const token = responseJson.token;
        // save into the local storage
        localStorage.setItem('token', token);
        // update the state
        this.setState({ token: token }, () => {
          // must be withing a callback
          this.getTheRecords();
        });
      })
      .catch((error) => {
        // critical error
        // ...
      });
  }

  startSyncTimer() {
    // once a minute
    this.timerId = setTimeout(() => {
        // sync time records with the server
        this.syncTime();
    }, this.syncTimeSpan);
  }

  clearSyncTimer() {
    clearTimeout(this.timerId);
  }

  syncTime() {
    // send updates to the server if there are any
    if(!this.toSync.length)
      return this.startSyncTimer();
    // form a url
    const token = this.state.token;
    const url = 'http://localhost:8000/record?token=' + token;
    // form an object
    const data = { data: this.toSync };
    // post data
    fetch(url, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((responseJson) => {
        if(responseJson.error)
          return this.setState({ error: responseJson.error });
        // after sync clear the array
        this.toSync = [];
        // run the timout again
        this.startSyncTimer();
      })
      .catch(() => {
        // critical error
        // ...
      });
  }

  handleTimeUpdate(id, seconds) {
    const tasks = this.state.tasks.slice();
    const found = tasks.find(task => {
      return task._id === id;
    });
    const index = tasks.indexOf(found);
    const task = tasks[index];
    // seconds is not defined for a timer event
    task.seconds = seconds ? seconds : task.seconds + 1;

    if(this.toSync.indexOf(task) < 0)
      this.toSync.push(task);

    this.setState({ tasks: tasks });

    // if the time has been edited
    if(seconds) {
      this.clearSyncTimer()
      this.syncTime();
    }
  }

  handleDeleteClick(id) {
    const data = { recordId: id };
    const token = this.state.token;
    const url = 'http://localhost:8000/record?token=' + token;

    fetch(url, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {
      if(responseJson.error)
        return this.setState({ error: responseJson.error });
      // create a copy of the array
      const tasks = this.state.tasks.slice();
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
    .catch(() => {
      // critical error
      // ...
    });

  }

  handleNewTask(task) {

    const data = {
      project: task.project,
      activity: task.activity,
      details: task.details,
      date: task.date
    };

    const token = this.state.token;
    const url = 'http://localhost:8000/record?token=' + token;

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {
      if(responseJson.error)
        return this.setState({ error: responseJson.error });
      // a reference
      const task = responseJson.doc;
      // create a copy of the task array
      const tasks = this.state.tasks.slice();
      // push a new record
      tasks.push(task);
      // update the state with a new array
      this.setState({ tasks: tasks });
    })
    .catch(() => {
      // critical error
      // ...
    });

  }

  handleModalClose() {
    this.setState({ error: "" });
  }

  render() {
    // collect all projects for autofill
    const collection = collectjs(this.state.tasks);
    const grouped = collection.groupBy("project").keys();
    const projects = grouped.items;
    const errorMessage = this.state.error;

    // debug
    console.log(this.state);

    const authorized = this.state.token ? true : false;

    let body;

    if (authorized) {
      body = <Slider
        tasks={this.state.tasks}
        projects={projects}
        onHandleNewTask={this.handleNewTask}
        onHandleTimeUpdate={this.handleTimeUpdate}
        onHandleDeleteClick={this.handleDeleteClick} />
    } else {
      body = <LogIn onHandleLogInSubmit={this.handleLogInSubmit} />
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">React Time Tracker</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {body}
          </div>
        </div>
        {errorMessage ? <Modal message={errorMessage} title={"Error"} onHandleClose={this.handleModalClose}/> : ""}
      </div>
    );
  }
}

export default App;
