const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = 'mongodb://${host}/travlr';
const readLine = require('readline');

//avoid 'current Server Discovery and Monitoring engine is deprecated'
mongoose.set('useUnifiedTopology', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useCreateIndex: true
    }), 1000);
}

mongoose.connection.on('connected', () => {});

mongoose.connection.on('error', () => {});

mongoose.connection.on('disconnnected', () => {});

mongoose.connection.on('win32', () => {});

const gracefulShutdown = (msg, callback) => {
    // mongoose.connection.close(  () => {
    //     console.log('Mongoose disconnectec through ${msg}');
    //     callback();
    // });
};

process.once('SIGUSR2', () => {
    // gracefulShutdown('nodemon restart', () => {
    //     process.kill(process.pid, 'SIGUSR2');
    // });
});

process.on('SIGINT', () => {
    // gracefulShutdown('app termination', () => {
    //     process.exit(0);
    // });
});

process.on('SIGTERM', () =>{
    // gracefulShutdown('Heroku app shutdown', () =>{
    //     process.exit(0);
    // });
});

connect();

//bring in hte Mongoose schema
require('./travlr');