# React Time Tracker  

This is a time tracking app powered by [React](https://reactjs.org), [Bootstrap](https://getbootstrap.com), [Express](https://expressjs.com) and [mongoDB](https://www.mongodb.com) (with [Mongoose ODM](http://mongoosejs.com)).  

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
or   
```
$ npm run client
```
```
$ npm run server
```
## Development
- The server is missing email verification on a new signup request
- The server is missing data validation
- The client is missing critical errors handling
- Get rid of time synchronization and rather count seconds in the client and in [mongoDB](https://www.mongodb.com) simultaneously
- Calculating of earning is needed
- Billable vs non billable records
- Bootstrap cannot handle the export modal tabs without bugs on its own, therefore a component that handles them must be created
- Update the repo so the the client and server are treated as submodules
- Update the edit modal so it show formatted (hh:mm:ss) time instead of seconds only 
