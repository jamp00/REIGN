
const userService = require('../models/loadArticles');

const mongoose = require('mongoose')
const db = mongoose.connection;

var i = 0;
/**
 * Gets all the users and list them all in screen.
 */
exports.listUsers = function(req, res) {
    console.log("J 01asssssss");
    // Use the method loadUsers form userService to get all the users
    userService.loadUsers(function(users, err) {
        if (err) {
            console.error('Error al recuperar los usuarios');
/*
            res.render('error', {
                message: 'Se ha producido un error. Contacte con el administrador.',
                error: null
            });
*/
        } 
        else {
//            console.log('Users recuperados:', users);

            users.hits.forEach(function(table) {
                var created_at = table.created_at;
                var title = table.title;
                var url = table.url;
                var author = table.author;
                var story_title = table.story_title;
                var story_url = table.story_url;


                try {

                    if (story_title != null || title != null){
//                    if (story_title != null ){

                        insertArticle(title, story_title, created_at, url, author, story_url)
console.log("hola")
                    }

                } catch (err) {
//                    res.status(400).json({ message: err.message })
                    return "Error al cargar artículos - " 
                }


            });

//            res.status(201).json({ message: i+ ' Articulos recuperados' })
                return i+ " artículos leidos"
//            res.render('users', {users: users});
        }
    });
};

function insertArticle(title, story_title, created_at, url, author, story_url) {
console.log("Hola 2")
    db.collection("articles").update(
        {
            title: title,
            story_title: story_title,
        }, {
            created_at: created_at,
            title: title,
            url: url,
            author: author,
            story_title: story_title,
            story_url: story_url
        }, { upsert: true }, function (err) {
            if (err)
                throw err;
            console.log("1 document updated");
        }
    );
    console.log("Hola 3")
}

