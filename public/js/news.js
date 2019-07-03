// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append(`
            <div class="card m-3">
                <div class="card-body">
                    <div class="d-flex">
                        <img class="article-img" src="${data[i].image}">
                        <div>
                            <h5 class="card-title">
                                <a href="${data[i].link}" target="_blank">${data[i].title}</a>  
                            </h5>
                            <p class="card-text">${data[i].summary}</p>
                        </div>
                    </div>
                    <div class="text-right mt-4">
                        <div class="btn btn-outline-info mr-2">Save Article</div>
                        <div class="btn btn-outline-success" data-id="${data[i]._id}">Add Note</div>
                    </div>
                </div>
            </div>
        `);
    }
});
