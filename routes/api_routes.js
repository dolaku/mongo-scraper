const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
var db = require('../models');

module.exports = (app) => {
    app.get('/scrape', (req, res) => {

        // get the html from a news site
        axios.get('https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aenbbc.com/news/topics/cx2pk70323et/uplifting-stories')
            .then(res => {

                // turn that HTML into a jquery like DOM
                // res.data === HTML
                const $ = cheerio.load(res.data);

                // an empty object to save the data that we'll scrape
                let result = {};

                // search the DOM using jquery to find all news articles
                $('.xrnccd').each((i, element) => {
                    let title = $(element).find('h3.ipQwMb a').text();
                    let link = 'https://news.google.com' + $(element).find('h3.ipQwMb a').attr('href');
                    let summary = $(element).find('.SbNwzf h4.ipQwMb a').text();
                    let image = $(element).find('img.tvs3Id').attr('src');

                    result = {
                        title,
                        link,
                        image,
                        summary,
                        saved: false
                    }

                    // create a new Article using the result
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            console.log(err);
                        });
                });
            });
    });


    // Route for getting all Articles from the db
    app.get('/api/articles', (req, res) => {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then((dbArticle) => {
                // If we were able to successfully find Articles, send them back to the client
                let sortedArticles = dbArticle.reverse();
                console.log(sortedArticles);
                res.json(sortedArticles);
            })
            .catch((err) => {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });


    // Route for getting all Saved Articles from the db
    app.get('/api/saved', (req, res) => {
        db.Article.find({ saved: true })
            .then((dbArticle) => {
                // If we were able to successfully find Articles, send them back to the client
                let sortedArticles = dbArticle.reverse();
                console.log(sortedArticles);
                res.json(sortedArticles);
            })
            .catch((err) => {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

}