const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
var db = require("../models");

module.exports = (app) => {
    app.get('/scrape', (req, res) => {

        // get the html from a news site
        axios.get('https://www.bbc.com/news/topics/cx2pk70323et/uplifting-stories')
            .then(res => {

                // turn that HTML into a jquery like DOM
                // res.data === HTML
                const $ = cheerio.load(res.data);

                // an empty object to save the data that we'll scrape
                let result = {};

                // search the DOM using jquery to find all news articles
                $('.lx-stream-post__header-text').each((i, element) => {
                    let title = $(element).text();
                    let link = 'https://www.bbc.com' + $(element).parent().attr('href');
                    let summary = $(element).parent().parent().parent().parent().siblings('.lx-stream-post__body').find('.qa-sty-summary').text();

                    result = {
                        title,
                        link,
                        summary
                    }

                    // create a new Article using the result
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            // console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            // console.log(err);
                        });
                });
            });
    });


    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                console.log('api routes - articles')
                // If we were able to successfully find Articles, send them back to the client
                let sortedArticles = dbArticle.reverse();
                console.log(sortedArticles);
                res.json(sortedArticles);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

}