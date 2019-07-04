// Click 'Scrape Now!' button
$('#scrape-now').on('click', () => {
    $.ajax({
        method: 'GET',
        url: '/scrape'
    });

});


// Grab the articles as a json
$.getJSON("/api/articles", (data) => {
    // For each one
    for (let i = 0; i < data.length; i++) {
       
        let articleCards = `
            <div class="card m-3">
                <div class="card-body">
                    <div>
                        <img class="article-img float-left" src="${data[i].image}">
                        <h5 class="card-title">
                            <a href="${data[i].link}" target="_blank">${data[i].title}</a>  
                        </h5>
                        <p class="card-text">${data[i].summary}</p>
                    </div>
                    <div class="text-right mt-4">
                        <div class="save-article btn btn-outline-info mr-2" data-id="${data[i]._id}">Save Article</div>
                        <div class="add-note btn btn-outline-success" data-id="${data[i]._id}">Add Note</div>
                    </div>
                </div>
            </div>
        `;

        // Display the apropos information on the page
        $("#articles").append(articleCards);
    }
});

$.getJSON("/api/saved", (data) => {
    // For each one
    for (let i = 0; i < data.length; i++) {
       
        let articleCards = `
            <div class="card m-3">
                <div class="card-body">
                    <div>
                        <img class="article-img float-left" src="${data[i].image}">
                        <h5 class="card-title">
                            <a href="${data[i].link}" target="_blank">${data[i].title}</a>  
                        </h5>
                        <p class="card-text">${data[i].summary}</p>
                    </div>
                    <div class="text-right mt-4">
                        <div class="remove-article btn btn-outline-info mr-2" data-id="${data[i]._id}">Remove Article</div>
                        <div class="add-note btn btn-outline-success" data-id="${data[i]._id}">Add Note</div>
                    </div>
                </div>
            </div>
        `;

        // Display the apropos information on the page
        $("#saved-articles").append(articleCards);
    }
});
