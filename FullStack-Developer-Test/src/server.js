const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require("morgan")

const path = require('path')

const articlesRouter = require('./routes/articles')
const loadArticlesRouter = require('./routes/loadArticles')
const dotenv = require('dotenv')

// Setting
//require('dotenv').config({ path: 'ENV_FILENAME' })
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
dotenv.config()

// DataBase Connect
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

/*
db.collection("articles").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
});
*/

// Middlewares
app.use(logger('dev'))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Routes
app.use('/articles', articlesRouter)
app.use('/carga', loadArticlesRouter.listUsers)

var cron = require('cron');
var cronJob = cron.job("*/60 * * * * *", function(){
   //perform operation e.g. GET request http.get() etc.
   loadArticlesRouter.listUsers()
   console.info('cron job completed');

}); 
cronJob.start();


app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ', app.get('port'));
});
