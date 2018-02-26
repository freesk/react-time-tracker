// react
import React, { Component } from 'react';

import collectjs from '../node_modules/collect.js';

// style
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

// my components

import NewTaskForm from './NewTaskForm';
import FilterableTaskTable from './FilterableTaskTable';
import Slider from './Slider';

// temporal solution for unique id
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getMmDdYyyy(timestamp) {
  const t = new Date(timestamp);
  return (t.getMonth() + 1) + "-" + t.getDate() + "-" + t.getFullYear();
}

class App extends Component {
  constructor(props) {
    super(props);

    const timestamp = Date.now();
    const todaysDate = getMmDdYyyy(timestamp);

    // const found = slides.find(slide => slide.date === todaysDate);
    // const index = slides.indexOf(found);

    // keep all this data as a state
    this.state = {
      tasks: [
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Setting up the environment",
          details: "Downloadibg npm packages",
          seconds: 3600,
          timestamp: 1519586396874
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Creating front end",
          details: "Writing static React representation",
          seconds: 3600,
          timestamp: 1519586396874
        },
        {
          id: getRandomInt(1000000),
          project: "React Tutorials",
          activity: "Studying basics of the framework",
          details: "https://reactjs.org/docs",
          seconds: 3600,
          timestamp: 1519586396874
        },
        {
          id: getRandomInt(1000000),
          project: "React Application",
          activity: "Splitting the app content by date",
          details: "none",
          seconds: 3600,
          timestamp: 1519631957979
        }
      ],
      todaysDate: todaysDate
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(todaysDate) {
    this.setState({ todaysDate: todaysDate });
  }

  handleTimeUpdate(obj) {
    let tasks = this.state.tasks.slice();

    const found = tasks.find(task => task.id === obj.id);
    const index = tasks.indexOf(found);

    tasks[index].seconds = obj.seconds;

    this.setState({ tasks: tasks });
  }

  handleSubmit(task) {
    let tasks = this.state.tasks.slice();
    tasks.push(task);
    this.setState({ tasks: tasks });
  }

  render() {

    const tasks = this.state.tasks.slice();

    let formated = tasks.map(task => {
      task.date = getMmDdYyyy(task.timestamp);
      return task;
    });

    const collection = collectjs(formated);
    const grouped = collection.groupBy('date').all();

    let slides = [];

    for (let key in grouped) {
      if (grouped.hasOwnProperty(key)) {
        const date = key;
        const tasks = grouped[key].items;

        let table = <FilterableTaskTable
          key={table}
          tasks={tasks}
          onHandleTimeUpdate={this.handleTimeUpdate} />;

        const slide = {
          date: date,
          table: table
        }

        slides.push(slide);

      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Time Tracker</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Slider
              slides={slides}
              todaysDate={this.state.todaysDate}
              onHandleDateChnage={this.handleDateChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
          <NewTaskForm
            todaysDate={this.state.todaysDate}
            onHandleSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
