var links = [
    'js/json-files/r_earth-porn.json',
    'js/json-files/r_space-porn.json',
    'js/json-files/r_pic.json'
];

// For Testing

// var links = [
//     'https://www.reddit.com/r/earthporn.json?limit=50',
//     'https://www.reddit.com/r/pic.json?limit=50',
//     'https://www.reddit.com/r/spaceporn.json?limit=50'
// ];


var counter = 0;
let currentProgress = 0;

$.each(links, function(key, value) {
    $.getJSON(value, function(response) {
        $.when(displayImage(response)).then(function() {

            if(key == 2) {

                counter = 0;

                var $container = $('.grid');

                $container.imagesLoaded( function() {
                     $container.masonry({
                         itemSelector: '.grid-item',
                         percentPosition: true
                     });

                     $('.image-container').click(function() {
                         let clickedImage = $(this).attr('class').split(' ')[1];
                         togglePhotoDetails(clickedImage);
                     });

                     $('.progress').fadeOut('fast', function() {
                         $('#photos').css({'opacity': '1'});
                     });

                })
                    .progress( function( instance, image ) {
                        counter += 1;
                        loadingProgress = Math.round((counter/150)*100);
                        $('.progress-bar')
                            .text(loadingProgress + '%')
                            .attr('aria-valuenow', loadingProgress)
                            .css({'width': loadingProgress + '%'});
                     });
            }

        });
    });
});



function displayImage(queryObject) {
    $.each(queryObject.data.children, function(item) {

        let post = queryObject.data.children[item].data;
        let picture = post.url;
        let title = post.title;
        let author = post.author;
        let permalink = post.permalink;


        if(picture.substr(picture.length - 3) == 'jpg') {
            counter += 1;

            $('#photos')
                .append("<div class='image-container image-container-" + counter + " col-md-4 grid-item'></div>");
            $('.image-container-' + counter)
                .append("<img class='image-thumbnail' src='" + picture + "'>");
            $('.image-container-' + counter)
                .append("<div class='author-details'><p>" + title + "</p></div>");
            $('.image-container-' + counter + ' .author-details')
                .append("<p>by " + author  + "</p>");
            $('.image-container-' + counter + ' .author-details')
                .append("<div class='author-links'></div>");
            $('.image-container-' + counter + ' .author-links')
                .append("<a class='reddit-link' target='_blank' href='https://www.reddit.com" + permalink + "'><span class='glyphicon glyphicon-comment'></span></a>");
            $('.image-container-' + counter + ' .author-links')
                .append("<a class='full-screen-link' target='_blank' href='" + picture + "'><span class='glyphicon glyphicon-resize-full'></span></a>");
        }


    });
}

function togglePhotoDetails(item) {
    $('.' + item + ' .image-thumbnail').toggleClass('image-thumbnail-fade');
    $('.' + item + ' .author-details').fadeToggle('fast');
}
