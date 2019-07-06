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
                // If we were able to successfully scrape and save an Article, redirect to index
                res.redirect('/')
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

    // Route to Saving Articles
    app.put('/api/saving/:id', (req, res) => {
        db.Article.findOneAndUpdate(
            { _id: req.params.id }, { saved: true }
        )
        .then(function (data) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(data);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });
    
    // Route to Removing Saved Articles
    app.put('/api/remove/:id', (req, res) => {
        db.Article.findOneAndUpdate(
            { _id: req.params.id }, { saved: false }
        )
        .then(function (data) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(data);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });



    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        db.Article.findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
    

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // Create a new note and pass the req.body to the entry
        db.Note.create(req.body)
            .then(function (dbNote) {
                // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
                // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
                // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

}