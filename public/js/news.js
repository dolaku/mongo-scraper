$(document).ready(function () {
/*======================
    Click Listeners 
======================*/

    // Click 'Scrape Now!' button
    $('#scrape-now').on('click', () => {
        $('#notification').append('Scrapping!');
        setTimeout(() => {
            location.reload();
        }, 1000);

        $.ajax({
            method: 'GET',
            url: '/scrape'
        });
    });
    
    // Click 'Save Article' button
    $(document).on('click', '.save-article', function() {
        let articleID = $(this).attr('data-id');

        $.ajax({
            method: 'PUT',
            url: '/api/saving/' + articleID,
            data: {
                saved: true
            }
        }).then(function() {
            $('#notification').append('Article saved!');
            setTimeout(() => {
                $('#notification').empty();
            }, 1500);
        });

    });

    // Click 'Remove Article' button
    $(document).on('click', '.remove-article', function() {
        let articleID = $(this).attr('data-id');

        $.ajax({
            method: 'PUT',
            url: '/api/remove/' + articleID,
            data: {
                saved: false
            }
        }).then(function() {
            location.reload();
        });

    });


    // Click 'Save Note' button
    $(document).on('click', '.save-note', function () {
        let articleID = $(this).attr('data-id');
        let targetTitle = '#note-title-' + articleID;
        let targetBody = '#note-body-' + articleID;
        let noteTitle = $(targetTitle).val().trim();
        let noteBody = $(targetBody).val().trim();

        $.ajax({
            method: 'POST',
            url: '/api/save-note/' + articleID,
            data: {
                title: noteTitle,
                body: noteBody
            }
        })
            // With that done
            .then(function (response) {
                // Log the response
                console.log(response);
                // Empty the notes section
                $('#notes').empty();
            });

        $('.collapse.show').removeClass('show');
    });


    // Click 'Notes' button & see saved notes
    $(document).on('click', '.user-notes', function () {
        let articleID = $(this).attr('data-id');
        let noteTitle = 'note-title-' + articleID;
        let noteBody = 'note-body-' + articleID;

        $.ajax({
            method: "GET",
            url: '/api/notes/' + articleID
        }).then(function (data) {
            // Display notes in the form
            $('#' + noteTitle).val(data[0].note.title);
            $('#' + noteBody).val(data[0].note.body);
        });
    });

/*======================
    Display Articles 
======================*/

    // Grab the articles as a json
    $.getJSON('/api/articles', (data) => {
        // For each one
        for (let i = 0; i < data.length; i++) {

            let articleCards = `
            <div class='card m-3'>
                <div class='card-body'>
                    <div>
                        <img class='article-img float-left' src='${data[i].image}'>
                        <h5 class='card-title'>
                            <a href='${data[i].link}' target='_blank'>${data[i].title}</a>  
                        </h5>
                        <p class='card-text'>${data[i].summary}</p>
                    </div>
                    <div class='text-right mt-4'>
                        <div class='save-article btn btn-outline-info mr-2' data-id='${data[i]._id}'>Save Article</div>

                        <div class='btn btn-outline-success user-notes' 
                            data-toggle='collapse' 
                            data-target='#data-${data[i]._id}'
                            data-id='${data[i]._id}'
                            aria-expanded='false' 
                            aria-controls='collapseExample'>
                            Notes
                        </div>

                        <div class='collapse mt-3' id='data-${data[i]._id}'>
                            <form>
                                <div class='form-group'>
                                    <input type='text' class='form-control mb-2' id='note-title-${data[i]._id}' title='Title' placeholder='Note Title'>
                                    <textarea class='form-control' id='note-body-${data[i]._id}' rows='3' title='Note' placeholder='Note description'></textarea>
                                </div>
                                <div class='save-note btn btn-outline-success' data-id='${data[i]._id}'>Save Note</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

            // Display the apropos information on the page
            $('#articles').append(articleCards);
        }
    });


    // Grab the saved articles as a json
    $.getJSON('/api/saved', (data) => {
        // For each one
        for (let i = 0; i < data.length; i++) {

            let articleCards = `
            <div class='card m-3'>
                <div class='card-body'>
                    <div>
                        <img class='article-img float-left' src='${data[i].image}'>
                        <h5 class='card-title'>
                            <a href='${data[i].link}' target='_blank'>${data[i].title}</a>  
                        </h5>
                        <p class='card-text'>${data[i].summary}</p>
                    </div>
                    <div class='text-right mt-4'>
                        <div class='remove-article btn btn-outline-info mr-2' data-id='${data[i]._id}'>Remove Article</div>
                        
                        <div class='btn btn-outline-success user-notes' 
                            data-toggle='collapse' 
                            data-target='#data-${data[i]._id}'
                            data-id='${data[i]._id}'
                            aria-expanded='false' 
                            aria-controls='collapseExample'>
                            Notes
                        </div>

                        <div class='collapse mt-3' id='data-${data[i]._id}'>
                            <form>
                                <div class='form-group'>
                                    <input type='text' class='form-control mb-2' id='note-title-${data[i]._id}' placeholder='Note Title'>
                                    <textarea class='form-control' id='note-body-${data[i]._id}' rows='3' placeholder='Note description'></textarea>
                                </div>
                                <div class='save-note btn btn-outline-success' data-id='${data[i]._id}'>Save Note</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

            // Display the apropos information on the page
            $('#saved-articles').append(articleCards);
        }
    });

});