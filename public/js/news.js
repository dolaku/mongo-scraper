// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append(`
            <!--
            <h4 data-id="${data[i]._id}">${data[i].title}</h4>
            <p>${data[i].summary}</p>
            <p>${data[i].link}</p>
            -->
            <div class="card m-3">
                <div class="card-body">
                    <h5 class="card-title">${data[i].title}</h5>
                    <p class="card-text">${data[i].summary}</p>
                    <a href="${data[i].link}" target="_blank" class="card-link btn btn-outline-info">Read Article</a>
                    <a href="#" class="card-link btn btn-outline-success data-id="${data[i]._id}">Add Note</a>
                </div>
            </div>
        `);
    }
});
