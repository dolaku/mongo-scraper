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

                        <div class="btn btn-outline-success user-notes" 
                            data-toggle="collapse" 
                            data-target="#data-${data[i]._id}" 
                            aria-expanded="false" 
                            aria-controls="collapseExample">
                            Notes
                        </div>

                        <div class="collapse mt-3" id="data-${data[i]._id}">
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control mb-2" id="note-title-${data[i]._id}" placeholder="Note Title">
                                    <textarea class="form-control" id="note-body-${data[i]._id}" rows="4" placeholder="Note description"></textarea>
                                </div>
                            </form>
                            <div class="save-note btn btn-outline-success" data-id="${data[i]._id}">Save Note</div>
                        </div>
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
                        
                        <div class="btn btn-outline-success user-notes" 
                            data-toggle="collapse" 
                            data-target="#data-${data[i]._id}" 
                            aria-expanded="false" 
                            aria-controls="collapseExample">
                            Notes
                        </div>

                        <div class="collapse mt-3" id="data-${data[i]._id}">
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control mb-2" id="note-title-${data[i]._id}" placeholder="Note Title">
                                    <textarea class="form-control" id="note-body-${data[i]._id}" rows="4" placeholder="Note description"></textarea>
                                </div>
                            </form>
                            <div class="save-note btn btn-outline-success" data-id="${data[i]._id}">Save Note</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Display the apropos information on the page
        $("#saved-articles").append(articleCards);
    }
});
