var mongoose = require('mongoose');
var gracefulShutdown;
const host = process.env.DB_HOST || '127.0.0.1'
const readLine = require('readline');
var dbURI = `mongodb://${host}/travlr`;
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR Mongoose
require('./travlr');


// const mongoose = require('mongoose');
// const host = process.env.DB_HOST || '127.0.0.1'
// const dbURI = `mongodb://${host}/travlr`;
// const readLine = require('readline');

// //avoid 'current Server Discovery and Monitoring engine is deprecated'
// mongoose.set('useUnifiedTopology', true);

// const connect = () => {
//     setTimeout(() => mongoose.connect(dbURI, {
//         useNewUrlParser: true,
//         useCreateIndex: true
//     }), 1000);
// }

// mongoose.connection.on('connected', () => {});

// mongoose.connection.on('error', () => {});

// mongoose.connection.on('disconnnected', () => {});

// mongoose.connection.on('win32', () => {});

// const gracefulShutdown = (msg, callback) => {
//     // mongoose.connection.close(  () => {
//     //     console.log('Mongoose disconnectec through ${msg}');
//     //     callback();
//     // });
// };

// process.once('SIGUSR2', () => {
//     // gracefulShutdown('nodemon restart', () => {
//     //     process.kill(process.pid, 'SIGUSR2');
//     // });
// });

// process.on('SIGINT', () => {
//     // gracefulShutdown('app termination', () => {
//     //     process.exit(0);
//     // });
// });

// process.on('SIGTERM', () =>{
//     // gracefulShutdown('Heroku app shutdown', () =>{
//     //     process.exit(0);
//     // });
// });

// connect();

// //bring in hte Mongoose schema
// require('./travlr');