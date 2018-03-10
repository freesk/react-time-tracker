# React Time Tracker  

This is a time tracking app powered by [React](https://reactjs.org), [Express](https://expressjs.com) and [mongoDB](https://www.mongodb.com) (with [Mongoose ODM](http://mongoosejs.com)).  

The app is still in development.

## Installation
```
$ npm install
```
```
$ npm run postinstall
```
## Usage
```
$ npm start
```
## Development
- The server is missing email verification on a new signup request
- The server is missing data validation
- The client is missing critical errors handling
- Get rid of time synchronization and rather count seconds in the client and in [mongoDB](https://www.mongodb.com) simultaneously
- Calculating of earning is needed
- Billable vs non billable records
