# React Time Tracker

A time tracking app built with [React](https://reactjs.org), [Bootstrap](https://getbootstrap.com), [Express](https://expressjs.com), and [MongoDB](https://www.mongodb.com) (with [Mongoose](http://mongoosejs.com)).

The app is still in development.

## Features

- **Accounts:** sign up and log in with a username and password. Passwords are hashed with bcrypt, and sessions use JSON Web Tokens.
- **Time records:** each record has a client, project, activity, and details. Fields autocomplete from values you've used before.
- **Timers:** start and stop a timer on any record with one click. Only one timer runs at a time, and tracked time syncs to the server every 10 seconds.
- **Editing:** edit a record's fields or tracked time, or delete it.
- **Weekly view:** browse records by day and switch between weeks.
- **Search:** filter the day's records by text.
- **CSV export:** export records for a date range, excluding specific clients, projects, activities, or details. The CSV includes hours worked and the amount billed.
- **Settings:** update your email and hourly rate. The rate is used to calculate billed amounts in the export.

## Project structure

- `client/`: the React front end (Create React App)
- `server/`: the Express API, included as a Git submodule ([react-time-tracker-server](https://github.com/freesk/react-time-tracker-server))

## Installation

```
git submodule init
git submodule update
npm install
```

`npm install` also installs the dependencies for the client and the server.

## Usage

Make sure MongoDB is running on `localhost:27017`, then start both the client and the server:

```
npm start
```

Or run them separately:

```
npm run client
npm run server
```

The client runs on http://localhost:3000, and the API runs on port 8000.

To build the client into the server's `public` folder:

```
npm run build
```

## Roadmap

- Email verification for new sign-ups
- Server-side data validation
- Replace periodic time syncing with counting seconds in both the client and MongoDB
- Billable vs. non-billable records
