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
    // keep all this data as a state
    this.state = {
      tasks: [
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Splitting the app content by date",
          details: "none",
          seconds: 3600,
          date: "2-23-2018"
        },
        {
          id: getRandomInt(1000000),
          project: "React Tutorials",
          activity: "Studying basics of the framework",
          details: "https://reactjs.org/docs",
          seconds: 3600,
          date: "2-24-2018"
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Setting up the environment",
          details: "Downloadibg npm packages",
          seconds: 3600,
          date: "2-25-2018"
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Creating front end",
          details: "Writing static React representation",
          seconds: 3600,
          date: "2-25-2018"
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Splitting the app content by date",
          details: "none",
          seconds: 3600,
          date: "2-26-2018"
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Refactoring",
          details: "none",
          seconds: 3600,
          date: "2-26-2018"
        }
      ]
    };

    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleTimeUpdate(obj) {
    let tasks = this.state.tasks.slice();
    const found = tasks.find(task => {
      return task.id === obj.id;
    });
    const index = tasks.indexOf(found);
    tasks[index].seconds = obj.seconds;
    this.setState({ tasks: tasks });
  }

  handleDeleteClick(id) {
    let tasks = this.state.tasks.slice();
    const found = tasks.find(task => {
      return task.id === id;
    });
    const index = tasks.indexOf(found);
    tasks.splice(index, 1);
    this.setState({ tasks: tasks });
  }

  handleNewTask(task) {
    let tasks = this.state.tasks.slice();
    tasks.push(task);
    this.setState({ tasks: tasks });
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
