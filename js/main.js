'use strict';

var windowWidth = window.innerWidth / 3,
		innerHeight = window.innerHeight,
		windowHeight = innerHeight / 3,
		pictures = {},
		picturesLength = 0,
		id,
		img,
		scrollControl = true;

$.ajax({
	url: 'https://unsplash.it/list',
	dataType: 'json'
}).done(function(response) {
	pictures = response;
	picturesLength = pictures.length;
	drawPictures(12);
});

function drawPictures(numberOfPictures) {

	// Check if the array is empty to stop
	if (pictures[0] == null) return;
	if (numberOfPictures < 0) return;

	// Generate random number from remaining pictures
	id = generateRandom();
	// Variables for adding DOM elements
	var $div = $('<div></div>');
	var $a = $('<a></a>');
	var $p = $('<p></p>');

	img = new Image();
	img.src = 'http://www.unsplash.it/' + windowWidth + '/' + windowHeight + '?image=' + pictures[id].id;

	img.onload = function() {
		numberOfPictures--;
		if (numberOfPictures === 0) scrollControl = false;
		// Create author p
		$p.text(pictures[id].author).addClass('author');
		// Create link
		$a.attr({'href': pictures[id].post_url, 'target': '_blank'});
		$a.append(img, $p);
		// Create picture div
		$div.append($a).addClass('picture');
		// Add to the document
		$('#container').append($div);
		// Delete the picture from the Array
		pictures.splice(id, 1);
		picturesLength = pictures.length;
		requestAnimationFrame(function() {
			drawPictures(numberOfPictures);
		});
	};

}

function generateRandom() {
	return Math.floor(Math.random() * picturesLength);
}

$(window).scroll(function() {

	if (scrollControl) return;

 	var position = $('body').scrollTop() + innerHeight,
 			height = $(document).height();

 	if (position > height - windowHeight) {
 		scrollControl = true;
 		drawPictures(9);
 	}
});
