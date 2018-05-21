const PICTURE_LIST_URL = 'https://unsplash.it/list';
const API_URL = 'http://www.unsplash.it/';
const container = document.querySelector('#container');
const pictureWidth = window.innerWidth / 3;
const innerHeight = window.innerHeight;
const pictureHeight = innerHeight / 3;
let pictureList = [];

const fetchPictureList = () => {
  return fetch(PICTURE_LIST_URL).then(response => response.json());
};

const mainControl = async () => {
  pictureList = await fetchPictureList();

  const pictures = getPictures(12);

  drawPictures(pictures);
};

mainControl();

const getPictures = amount => {
  let pictures = [];

  for (let times = 0; times < amount; times++) {
    const picture = chosePicture();
    pictures.push(picture);
  }

  return pictures;
};

const chosePicture = () => {
  const listLength = pictureList.length;

  const pictureId = generateRandom(listLength);
  const picture = pictureList[pictureId];

  removePicture(pictureId);

  return picture;
};

const removePicture = id => {
  pictureList.splice(id, 1);
};

const draw = picture => {
  const { author: authorName, id, post_url: url } = picture;

  const link = createLink(url);
  const image = createImage(id);
  const author = createAuthor(authorName);

  link.append(image, author);
  container.append(link);
};

const drawPictures = pictures => {
  pictures.map(picture => draw(picture));
};

const generateRandom = max => Math.floor(Math.random() * max);

const createAuthor = authorName => {
  const p = document.createElement('p');

  p.className = 'author';
  p.innerHTML = authorName;
  return p;
};

const createLink = url => {
  const link = document.createElement('a');

  link.className = 'picture';
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');

  return link;
};

const createImage = pictureId => {
  const imageUrl =
    API_URL + pictureWidth + '/' + pictureHeight + '?image=' + pictureId;
  const image = new Image();

  image.src = imageUrl;

  return image;
};

window.addEventListener('scroll', () => {
  const position = document.body.scrollTop + innerHeight;
  console.log(position);
});

// $(window).scroll(function() {
//   if (scrollControl) return;

//   var position = $('body').scrollTop() + innerHeight,
//     height = $(document).height();

//   if (position > height - windowHeight) {
//     scrollControl = true;
//     drawPictures(2);
//   }
// });
