const Article = require('../models/article');

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
