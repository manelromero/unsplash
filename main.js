const PICTURE_LIST_URL = 'https://picsum.photos/list';
const API_URL = 'https://picsum.photos/';

const pictureWidth = window.innerWidth / 3;
const pictureHeight = window.innerHeight / 3;

const container = document.querySelector('#container');
let fetching = false;
let pictureList = [];

window.addEventListener('scroll', async () => {
  const containerHeight = container.offsetHeight;
  const bottomPosition = window.scrollY + innerHeight;

  if (bottomPosition >= containerHeight) {
    if (!fetching) {
      fetching = true;
      await renderPictures(3);
      fetching = false;
    }
  }
});

const fetchPictureList = () =>
  fetch(PICTURE_LIST_URL).then(response => response.json());

const main = async () => {
  pictureList = await fetchPictureList();
  renderPictures(9);
};

main();

const renderPictures = amount => {
  const pictures = getPictures(amount);
  drawPictures(pictures);
};

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

const removePicture = id => pictureList.splice(id, 1);

const drawPictures = pictures => pictures.map(picture => draw(picture));

const draw = async picture => {
  const { author: authorName, id, post_url: url } = picture;

  const link = createLink(url);
  const image = await createImage(id);
  const author = createAuthor(authorName);

  link.append(image, author);
  container.append(link);
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

  return new Promise(resolve => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => resolve(image);
  });
};

const createAuthor = authorName => {
  const paragraph = document.createElement('p');

  paragraph.className = 'author';
  paragraph.innerHTML = authorName;
  return paragraph;
};

const generateRandom = max => Math.floor(Math.random() * max);
