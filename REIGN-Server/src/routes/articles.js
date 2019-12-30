const express = require("express");
const router = express.Router();


const Article = require('../models/article')



// Get all articles
router.get('/', async  (req, res) => {

    try {
        const articles = await Article.find()
        res.json(articles)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

// Get all articles wityh state true
router.get('/estado/', async  (req, res) => {

    try {
        const articles = await Article.find(
            {
                estado: {$ne: false}
            }, null,
            {
                sort: { created_at: -1 }, limit: 100
            }
        );
        res.json(articles)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})



// Get one article
router.get('/:id', getArticle, (req, res) => {

    res.json(res.article)

})


// Create one article
router.post('/', async (req, res) => {

    const article = new Article({
        title: req.body.title,
        url: req.body.url
    })

    try {
        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// Update one article
router.patch('/:id', getArticle, async (req, res) => {

    if (req.body.title != null) {
        res.article.title = req.body.title
    }

    if (req.body.url != null) {
        res.article.url = req.body.url
    }

    if ( req.body.created_at != null ){
        res.article.created_at = req.body.created_at
    }
    

    try {

        const updatedArticle = await res.article.save()
        res.json(updatedArticle)

    } catch {
        res.status(400).json({ message: err.message })
    }
  
})

// Update the state of one article
router.get('/estado/:id', getArticle, async (req, res) => {

    res.article.estado = false

    try {

        const updatedArticle = await res.article.save()
        res.json(updatedArticle)

    } catch {
        res.status(400).json({ message: err.message })
    }
  
})


// Delete one article
router.delete('/:id', getArticle, async (req, res) => {

    try {
        await res.article.remove()
        res.json({ message: 'Deleted This article' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }

})

module.exports = router;


async function getArticle(req, res, next) {
    try {
        article = await Article.findById(req.params.id);
        if (article == null) {
            return res.status(404).json({ message: 'Cant find article' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.article = article;
    next();
}

exports.getArticle = getArticle;