// react
import React, { Component } from 'react';

// dependencies
import FileSaver from 'file-saver';
import * as moment from 'moment';

// style
import './App.css';

// my components
import DateController from './DateController';
import Modal from './Modal';
import LogIn from './LogIn';
import SignUp from './SignUp';
import ExportModal from './ExportModal';
import EditModal from './EditModal';
import SettingsModal from './SettingsModal';

const origin = window.location.origin;
const devOrigin = "http://localhost:3000";
const devServer = "http://localhost:8000";

const serverUrl = origin === devOrigin ? devServer : origin;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      token: null,
      error: "",
      signup: false,
      export: false,
      editId: null,
      settings: false,
      rate: 0,
      email: "",
      info: ""
    };

    this.syncTimeSpan = 1000 * 10;

    // to store ids of updated records
    this.toSync = [];

    // this.syncTime = this.syncTime.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    // this.startSyncTimer = this.startSyncTimer.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleInfoModalClose = this.handleInfoModalClose.bind(this);

    this.handleExport = this.handleExport.bind(this);
    this.handleExportModalClose = this.handleExportModalClose.bind(this);
    this.handleCsvDownload = this.handleCsvDownload.bind(this);

    this.handleRecordEdit = this.handleRecordEdit.bind(this);
    this.handleRecordUpdate = this.handleRecordUpdate.bind(this);
    this.handleRecordUpdateClose = this.handleRecordUpdateClose.bind(this);

    this.connectionError = this.connectionError.bind(this);

    this.handleSettings = this.handleSettings.bind(this);
    this.handleCloseSettings = this.handleCloseSettings.bind(this);
    this.handleUpdateSettings = this.handleUpdateSettings.bind(this);
  }

  handleSettings(e) {
    e.preventDefault();
    // a reference
    const token = this.state.token;
    // form a url string
    const url = serverUrl + '/user/update?token=' + token;
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
        const doc = responseJson.doc;
        // update the state
        this.setState({
          settings: true,
          email: doc.email,
          rate: doc.rate
        });
      })
      .catch(() => {
        this.connectionError();
      });
  }

  handleCloseSettings() {
    this.setState({ settings: false });
  }

  handleUpdateSettings(data) {
    // form a url
    const token = this.state.token;
    const url = serverUrl + '/user/update?token=' + token;
    // post data
    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((responseJson) => {
        if(responseJson.error)
          return this.setState({ error: responseJson.error });

        this.setState({ settings: false, info: "User settings have been changed successfully" });
      })
      .catch(() => {
        this.connectionError();
      });

  }

  connectionError() {
    this.setState({ error: "Cannot connect to the server" });
  }

  handleRecordUpdateClose() {
    this.setState({ editId: null });
  }

  handleRecordEdit(id) {
    this.setState({ editId: id });
  }

  handleRecordUpdate(record) {
    const tasks = this.state.tasks.slice();
    const found = tasks.find(task => task._id === record._id);

    // update found here
    for (var key in record) {
      if (record.hasOwnProperty(key)) {
        found[key] = record[key];
      }
    }

    // form a url
    const token = this.state.token;
    const url = serverUrl + '/record/updateOne?token=' + token;
    // form an object
    const data = { data: found };
    // post data
    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((responseJson) => {
        if(responseJson.error)
          return this.setState({ error: responseJson.error });

        this.setState({
          editId: null,
          tasks: tasks
        });

      })
      .catch(() => {
        this.connectionError();
      });
  }

  handleExportModalClose() {
    this.setState({ export: false });
  }

  handleCsvDownload(obj) {

    this.handleExportModalClose();

    const data = {
      from: obj.from,
      to: obj.to,
      filterOf: obj.filterOf
    };

    const token = this.state.token;
    const url = serverUrl + '/record/export?token=' + token;

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {
      if(responseJson.error)
        return this.setState({ error: responseJson.error, export: false });

      const blob = new Blob([responseJson.doc], {type: "text/plain;charset=utf-8"});
      const timestamp = moment().format();
      const fileName = timestamp + ".csv";
      this.setState({ export: false });
      FileSaver.saveAs(blob, fileName);
    })
    .catch(() => {
      this.connectionError();
    });
  }

  handleExport(e) {
    e.preventDefault();
    this.setState({ export: true });
  }

  handleSignUpSubmit(obj) {
    const data = {
      email: obj.email,
      username: obj.username,
      password: obj.password
    };

    const url = serverUrl + '/user/register';

    fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((responseJson) => {
      if(responseJson.error)
        return this.setState({ error: responseJson.error });
      // update the state
      this.setState({ signup: false, info: "Welcome! Please, log in to preoceed" });
    })
    .catch(() => {
      this.connectionError();
    });
  }

  handleLogOut(e) {
    e.preventDefault();
    localStorage.clear();
    this.setState({ token: null });
  }

  handleSignUp(e) {
    e.preventDefault();
    this.setState({ signup: true });
  }

  getTheRecords() {
    const token = this.state.token;
    // form a url string
    const url = serverUrl + '/record/get?token=' + token;
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
        this.connectionError();
      });
  }

  componentDidMount() {
    // get a token from the local storage
    const token = localStorage.getItem("token");
    // try to use an available token
    if(token)
      // update the state with the token form the local storage
      this.setState({ token: token }, () => {
        // once it is set, get the records
        this.getTheRecords();
      });
  }

  // most of it can be moved to the LogIn component
  handleLogInSubmit(credentials) {
    const username = credentials.username;
    const password = credentials.password;

    const url = serverUrl + '/user/login?username=' + username + '&password=' + password + '';

    // get token and user id
    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
      })
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
          // must be within a callback
          this.getTheRecords();
        });
      })
      .catch((error) => {
        this.connectionError();
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
    const url = serverUrl + '/record/update?token=' + token;
    // form an object
    const data = { data: this.toSync };
    // post data
    fetch(url, {
        method: 'POST',
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
        this.startSyncTimer();
        this.connectionError();
      });
  }

  handleTimeUpdate(id, seconds) {
    const tasks = this.state.tasks.slice();
    const found = tasks.find(task => task._id === id);
    const index = tasks.indexOf(found);
    const task = tasks[index];

    // seconds is not defined for a timer event
    if ((typeof seconds === "undefined") || (seconds === null)) {
      task.seconds = task.seconds + 1;
    } else {
      task.seconds = seconds;
    }

    if(this.toSync.indexOf(task) < 0)
      this.toSync.push(task);

    this.setState({ tasks: tasks });

    // if the time has been edited
    if(seconds) {
      this.clearSyncTimer()
      this.syncTime();
    }
  }

  // try to move it to the TaskTable component
  handleDeleteClick(id) {
    const data = { recordId: id };
    const token = this.state.token;
    const url = serverUrl + '/record/delete?token=' + token;

    fetch(url, {
      method: 'POST',
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
      this.connectionError();
    });

  }

  // try to move it to the TaskTable component
  handleNewTask(task) {

    const data = {
      project: task.project,
      activity: task.activity,
      details: task.details,
      timestamp: task.timestamp,
      client: task.client
    };

    const token = this.state.token;
    const url = serverUrl + '/record/post?token=' + token;

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
      this.connectionError();
    });

  }

  handleModalClose() {
    this.setState({ error: "" });
  }

  handleInfoModalClose() {
    this.setState({ info: "" });
  }

  render() {

    const authorized = this.state.token ? true : false;

    let body;

    if (authorized) {
      body = <DateController
        tasks={this.state.tasks}
        onHandleRecordEdit={this.handleRecordEdit}
        onHandleNewTask={this.handleNewTask}
        onHandleTimeUpdate={this.handleTimeUpdate}
        onHandleDeleteClick={this.handleDeleteClick}>
        <hr />
        <div className="text-center mb-2">
          <a href="" className="mr-3" onClick={this.handleSettings}>Settings</a>
          <a href="" className="mr-3" onClick={this.handleExport}>Export</a>
          <a href="" onClick={this.handleLogOut}>Log Out</a>
        </div>
      </DateController>
    } else {
      if(this.state.signup) {
        body = <SignUp onHandleSignUpSubmit={this.handleSignUpSubmit} />
      } else {
        body = <LogIn onHandleLogInSubmit={this.handleLogInSubmit}>
          <div className="text-center">
            <a href="" onClick={this.handleSignUp}>Sign Up</a>
          </div>
        </LogIn>
      }
    }

    const errorModal = <Modal
      message={this.state.error}
      title={"Error"}
      onHandleClose={this.handleModalClose} />;

    const infoModal = <Modal
      message={this.state.info}
      title={"Info"}
      onHandleClose={this.handleInfoModalClose} />;

    const exportModal = <ExportModal
      tasks={this.state.tasks}
      onHandleExportModalClose={this.handleExportModalClose}
      onHandleDownloadCsv={this.handleCsvDownload} />;

    const editModal = <EditModal
      editId={this.state.editId}
      tasks={this.state.tasks}
      onHandleClose={this.handleRecordUpdateClose}
      onHandleRecordUpdate={this.handleRecordUpdate} />;

    const settingsModal = <SettingsModal
      email={this.state.email}
      rate={this.state.rate}
      onHandleSettingsClose={this.handleCloseSettings}
      onHandleSettingsUpdate={this.handleUpdateSettings} />;

    let modal = null;

    if(this.state.error)
      modal = errorModal;
    else if (this.state.info)
      modal = infoModal;
    else if (this.state.export)
      modal = exportModal;
    else if (this.state.editId)
      modal = editModal;
    else if (this.state.settings)
      modal = settingsModal;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">React <img alt="react icon" className="react-icon ml-1" src="https://i.imgur.com/9drncR1.png"></img> Time Tracker</h1>
          </div>
        </div>
        <div className="row">
          <div className="col pl-1 pr-1 pr-sm-2 pl-sm-2">
            {body}
          </div>
        </div>
        {modal}
      </div>
    );
  }
}

export default App;
