var Agenda = require('agenda');
var mongoConnectionString = 'localhost:27017/jobs';

const loadArticlesRouter = require('../routes/loadArticles')

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

var agenda = new Agenda({db: {address: mongoConnectionString}});

exports.agenda = agenda.define('sendNewsletter', function(job) {
  console.log("Sending newsletter. Time: " +
  new Date().getMinutes() + ":" + new Date().getSeconds());

  loadArticlesRouter.listArticles();
});

agenda.on('ready', function() {
    agenda.every('3600 seconds', 'sendNewsletter');
    agenda.start();
});


exports.conectaBD = function(){
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('connected to database'));

}

exports.borraBD = function(){
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  const db = mongoose.connection;
  db.collection("articles").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
//    db.close();
});
}

/*
exports.conecta = function newFunction() {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('connected to database'));
}
*/
