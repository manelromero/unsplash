var amp = window.innerWidth / 3,
	alt = window.innerHeight / 3,
	pictures = {},
	picturesLength = 0;

$.getJSON('https://unsplash.it/list', function(data) {
	$.each(data, function(key) {
		pictures[key] = {
			id: data[key].id,
			author: data[key].author,
			post_url: data[key].post_url
		}
	});
}).done(function() {
	picturesLength = Object.keys(pictures).length;
	drawPictures(24);
});

$(window).scroll(function() {
	drawPictures(3);
});

function drawPictures(x) {
	for (i=0; i<=x-1; i++) {
		var picture = generateRandom();
		var img = '<a href="' + pictures[picture].post_url + '" target="_blank"><img class="jander" id="image' + i + '" src="http://www.unsplash.it/' + amp + '/' + alt + '?image=' + pictures[picture].id + '"></a>'
		document.getElementById('container').innerHTML += img;
		delete pictures[picture];
	}
}

function generateRandom() {
	while (typeof pictures[pic] === 'undefined') {
		var pic = Math.floor((Math.random() * picturesLength) + 1);
	}
	return pic
}