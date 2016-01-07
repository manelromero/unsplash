var amp = window.innerWidth / 3,
		alt = window.innerHeight / 3,
		pictures = {},
		picturesLength = 0;

$.getJSON('https://unsplash.it/list', function(data) {
	$.each(data, function(key) {
		pictures[key] = {
			id: data[key].id,
			author: data[key].author.substring(0, data[key].author.length / 2),
			post_url: data[key].post_url
		};
	});
}).done(function() {
	picturesLength = Object.keys(pictures).length;
	drawPictures(12);
});

// $(window).scroll(function() {
// 	drawPictures(3);
// });

function drawPictures(numberOfPictures) {
	if (numberOfPictures > 0) {
		var picture = generateRandom();
		var img = new Image();
		img.onload = function() {
			numberOfPictures--;
			// Create author div
			var author = document.createElement('div');
			author.className = 'author';
			author.innerHTML = (pictures[picture].author);
			// Create link
			var link = document.createElement('a');
			link.href = pictures[picture].post_url;
			link.target = '_blank';
			link.appendChild(img);
			link.appendChild(author);
			// Create picture div
			var divLink = document.createElement('div');
			divLink.className = 'picture';
			divLink.appendChild(link);
			// Add to the document
			document.getElementById('container').appendChild(divLink);
			delete pictures[picture];
			requestAnimationFrame(function() {
				drawPictures(numberOfPictures);
			});
		};
		img.src = 'http://www.unsplash.it/' + amp + '/' + alt + '?image=' + pictures[picture].id;
	}

}

function generateRandom() {
	while (typeof pictures[pic] === 'undefined') {
		var pic = Math.floor((Math.random() * picturesLength) + 1);
	}
	return pic;
}
