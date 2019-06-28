const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

module.exports = (app) => {
    app.get('/scrape', (req, res) => {

        // get the html from bbc page
        axios.get('https://www.bbc.com/news')
            .then(res => {

                // turn that HTML into a jquery like DOM
                // res.data === HTML
                const $ = cheerio.load(res.data);
                
                // an empty array to save the data that we'll scrape
                let results = [];

                // search the DOM using jquery to find all news articles
                $('.gs-c-promo-heading__title').each((i, element) => {
                    let title = $(element).text();
                    let link = $(element).parent().attr('href');

                    results.push({
                        title,
                        link
                    });
                });
                console.log(results);
            });
        });
}