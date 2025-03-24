import iziToast from "izitoast";
import {fetchImages} from "./js/pixabay-api.js";
import {showImages} from "./js/render-functions.js";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-btn');

let currentPage = 1;
let totalPages = 0;
let searchQuery = "";
const PER_PAGE = 15;

loader.style.visibility = 'hidden';
loadMore.classList.add("visually-hidden");

form.addEventListener("submit", onSearchSubmit)
loadMore.addEventListener("click", onLoadMoreClick);

function scrollDown() {
  const elem = document.querySelector('.gallery-item');
  if (elem) {
    const { height } = elem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

async function onSearchSubmit(event) {
    event.preventDefault();
currentPage = 1;
    totalPages = 0;
    
    searchQuery = event.target.elements["search-text"].value.trim();
    
    if (!searchQuery) {
        iziToast.error({
            title: "Error!",
            position: 'topRight',
            backgroundColor: ' #ef4040',
            messageColor: '#ffffff',
      message: 'Please, enter a search query!',
        })
        return;
    }

    loader.style.visibility = 'visible';

    try {
        const { images, totalHits } = await fetchImages(searchQuery, currentPage);
                showImages(images, gallery);
        loader.style.visibility = 'hidden';

        totalPages = Math.ceil(totalHits / PER_PAGE);
        

    if (totalPages > currentPage) {
      loadMore.classList.remove("visually-hidden");
        }
    else {
         loadMore.classList.add("visually-hidden");
        }
        scrollDown();
    } catch (error) {
        iziToast.error({
            title: "Error!",
            position: 'topRight',
            backgroundColor: ' #ef4040',
            messageColor: '#ffffff',
            message: 'Error fetching images',
        });
        loader.style.visibility = 'hidden';
    }
    finally {
        form.reset();
    }
};

async function onLoadMoreClick() {
    currentPage += 1;

    try {
       const {images} = await fetchImages(searchQuery, currentPage);
        showImages(images, gallery, true);
        loader.style.visibility = 'hidden';

        if (currentPage >= totalPages) {
            loadMore.classList.add("visually-hidden");
            iziToast.info({
                position: 'topRight',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
        scrollDown();
    } catch (error) {
        iziToast.error({
            title: "Error!",
            position: 'topRight',
            backgroundColor: ' #ef4040',
            messageColor: '#ffffff',
            message: 'Error fetching images',
        });
        loader.style.visibility = 'hidden';
    }
}