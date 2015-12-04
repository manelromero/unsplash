var amp = window.innerWidth / 3,
	alt = window.innerHeight / 3;

var Picture = function(id, author, post_url) {
	this.id = id;
	this.author = author;
	this.post_url = post_url;
	this.draw = function() {
		var img = '<a href="' + this.post_url + '" target="_blank"><img class="jander" src="http://www.unsplash.it/' + amp + '/' + alt + '?image=' + this.id + '"></a>'
		document.getElementById('container').innerHTML += img;
	}
}

allPictures = [];

$.getJSON('https://unsplash.it/list', function(data) {
	$.each(data, function(key) {
		var picture = new Picture(data[key].id, data[key].author, data[key].post_url);
		allPictures.push(picture);
	});
});//.done(function() {
	//picturesLength = Object.keys(pictures).length;
	//drawPictures(24);
//});

