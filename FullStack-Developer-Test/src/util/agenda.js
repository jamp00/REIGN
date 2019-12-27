var Agenda = require('agenda');
var mongoConnectionString = 'localhost:27017/jobs';
const mongoose = require('mongoose')
const db = mongoose.connection;

const loadArticlesRouter = require('./routes/loadArticles')

var agenda = new Agenda({db: {address: mongoConnectionString}});

exports.agenda = agenda.define('sendNewsletter', function(job) {
  console.log("Sending newsletter. Time: " +
  new Date().getMinutes() + ":" + new Date().getSeconds());

  loadArticlesRouter.listUsers
});

agenda.on('ready', function() {
  agenda.every('3 seconds', 'sendNewsletter');
  agenda.start(); 
});