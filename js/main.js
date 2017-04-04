var links = [
    'js/json-files/r_earth-porn.json',
    'js/json-files/r_space-porn.json',
    'js/json-files/r_pic.json'
];

var counter = 0;

$.each(links, function(key, value) {
    $.getJSON(value, function(response) {
        $.when(displayImage(response)).then(function() {

            if(key == 2) {
                $('.image-container').click(function() {
                    let clickedImage = $(this).attr('class').split(' ')[1];
                    togglePhotoDetails(clickedImage);
                });

                $('.lazy').Lazy({
                    onError: function(element) {
                        $(element).remove();
                    }
                });
            }

        });
    });
});

function displayImage(queryObject) {
    $.each(queryObject.data.children, function(item) {

        counter += 1;

        let post = queryObject.data.children[item].data;
        let picture = post.url;
        let title = post.title;
        let author = post.author;
        let permalink = post.permalink;

        $('#photos').append("<div class='image-container image-container-" + counter +"'></div>");
        $('.image-container-' + counter).append("<img class='lazy image-thumbnail' data-src='" + picture + "'>");
        $('.image-container-' + counter).append("<div class='author-details'><p>" + title + "</p></div>");
        $('.image-container-' + counter + ' .author-details').append("<p>by " + author  + "</p>");
        $('.image-container-' + counter + ' .author-details').append("<div class='author-links'></div>");
        $('.image-container-' + counter + ' .author-links').append("<a class='reddit-link' target='_blank' href='https://www.reddit.com" + permalink + "'><span class='glyphicon glyphicon-comment'></span></a>");
        $('.image-container-' + counter + ' .author-links').append("<a class='full-screen-link' target='_blank' href='" + picture + "'><span class='glyphicon glyphicon-resize-full'></span></a>");


    });
}

function togglePhotoDetails(item) {
    $('.' + item + ' .image-thumbnail').toggleClass('image-thumbnail-fade');
    $('.' + item + ' .author-details').fadeToggle('fast');
}
