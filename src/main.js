const API_URL = "https://picsum.photos/";
const PICTURES_PER_PAGE = 90;
const PICTURE_LIST_URL = `${API_URL}v2/list`;

const pictureWidth = Math.round(window.innerWidth / 3);
const pictureHeight = Math.round(window.innerHeight / 3);

const container = document.querySelector("#container");
let picturesList = [];
let pageNumber = 1;
let fetching = false;

window.addEventListener("scroll", async () => {
  const containerHeight = container.offsetHeight;
  const bottomPosition = window.scrollY + innerHeight;

  if (bottomPosition >= containerHeight) {
    if (!fetching) {
      fetching = true;
      await main();
      fetching = false;
    }
  }
});

function fetchPictureList() {
  const url = `${PICTURE_LIST_URL}?page=${pageNumber}&limit=${PICTURES_PER_PAGE}`;

  return fetch(url).then(response => response.json().then(json => json));
}

async function main() {
  picturesList = await fetchPictureList();
  pageNumber++;
  renderPictures();
}

main();

function renderPictures() {
  return picturesList.map(picture => draw(picture));
}

async function draw(picture) {
  const { author: authorName, id, url } = picture;

  const link = createLink(url);
  const image = await createImage(id);
  const author = createAuthor(authorName);

  link.append(image, author);
  container.append(link);
}

function createLink(url) {
  const link = document.createElement("a");

  link.className = "picture";
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");

  return link;
}

function createImage(pictureId) {
  const imageUrl = `${API_URL}/id/${pictureId}/${pictureWidth}/${pictureHeight}`;

  return new Promise(resolve => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => resolve(image);
  });
}

function createAuthor(authorName) {
  const paragraph = document.createElement("p");

  paragraph.className = "author";
  paragraph.innerHTML = authorName;
  return paragraph;
}
