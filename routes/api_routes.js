const axios = require('axios');
const cheerio = require('cheerio');

module.exports = (app) => {
    app.get('/', (req, res) => {
        axios.get('https://www.bbc.com/news')
            .then(res => {
                const $ = cheerio.load(res.data);
                
                // An empty array to save the data that we'll scrape
                let results = [];

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