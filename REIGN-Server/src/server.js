const express = require('express')
const app = express()
const util = require('./util/util')
const logger = require("morgan")

const path = require('path')

const articlesRouter = require('./routes/articles')
const loadArticlesRouter = require('./routes/loadArticles')

const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


// Setting
//require('dotenv').config({ path: 'ENV_FILENAME' })
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
dotenv.config()

// DataBase Connect
util.conectaBD();
//util.borraBD();


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
app.use('/carga', loadArticlesRouter.listArticles)


app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ', app.get('port'));
});
