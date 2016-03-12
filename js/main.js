'use strict';

var windowWidth = window.innerWidth / 3,
		innerHeight = window.innerHeight,
		windowHeight = innerHeight / 3,
		pictures = {},
		picturesLength = 0,
		pic,
		id,
		img;

$.ajax({
	url: 'https://unsplash.it/list',
	dataType: 'json'
}).done(function(response) {
	pictures = response;
	picturesLength = pictures.length;
	drawPictures(12);
});

function drawPictures(numberOfPictures) {

	if (numberOfPictures <= 0) return;

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
		console.log(id);
		delete pictures[id];
		requestAnimationFrame(function() {
			drawPictures(numberOfPictures);
		});
	};

}

function generateRandom() {
	while (typeof pictures[pic] === 'undefined') {
		pic = Math.floor((Math.random() * picturesLength) + 1);
	}
	return pic;
}

window.onscroll = function() {
 	var position = $('body').scrollTop() + innerHeight,
 			height = $(document).height();

 	if (position > height - windowHeight) drawPictures(9);
};
