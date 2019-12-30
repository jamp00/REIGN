
const articleService = require('../models/loadArticles');

const mongoose = require('mongoose')
const db = mongoose.connection;


/**
 * Gets all the articles.
 */
exports.listArticles = function(req, res) {
    var i = 1;
    // Use the method loadUsers form userService to get all the users
    articleService.loadArticle(function(users, err) {
        if (err) {
            console.error('Error al recuperar los usuarios');

            res.send('error', {
                message: 'Se ha producido un error. Contacte con el administrador.',
                error: null
            });

        } 
        else {

            users.hits.forEach(function(table) {
                var id = (table.title + table.story_title).replace(/\s/g, "");;
                var created_at = table.created_at;
                var title = table.title;
                var url = table.url;
                var author = table.author;
                var story_title = table.story_title;
                var story_url = table.story_url;


                try {

                    if (story_title != null || title != null){
//                    if (story_title != null ){

                        insertArticle(id, title, story_title, created_at, url, author, story_url)
                        i++
                    }

                } catch (err) {
//                    res.status(400).json({ message: err.message })
                    return "Error al cargar artículos - " 
                }

            });

//            res.status(201).json({ message: i+ ' Articulos recuperados' })
            console.log(i+ " articulos leidos");
            if (res != null)
                res.send(i+ " articulos leidos");
        }
    });
};

function insertArticle(id, title, story_title, created_at, url, author, story_url) {

    db.collection("articles").update(
        {
            id: id
        }, {
            id: id,
            created_at: created_at,
            title: title,
            url: url,
            author: author,
            story_title: story_title,
            story_url: story_url
        }, { upsert: true }, function (err) {
            if (err)
                throw err;
//            console.log("1 document updated");
        }
    );

}

