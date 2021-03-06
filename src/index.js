import PixabayApiService from './js/pixabay-service';
import photoCardMarkupTpl from './templates/photoCardMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
};

const pixabayApiService = new PixabayApiService();

refs.searchFormEl.addEventListener('submit', onSearch);
refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

refs.loadMoreBtnEl.classList.add('is-hidden');

async function onSearch(e) {
  e.preventDefault();
  pixabayApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

  await refs.loadMoreBtnEl.classList.add('is-hidden');

  const hits = await pixabayApiService.fetchImg();
  const totalHits = hits.data.totalHits;

  if (totalHits < 1) {
    refs.loadMoreBtnEl.classList.add('is-hidden');
    clearPhotoCardGallery();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  await clearPhotoCardGallery();

  await pixabayApiService.resetPage();
  await pixabayApiService.fetchImg().then(appendPhotoCardMarkup);
  await refs.loadMoreBtnEl.classList.remove('is-hidden');
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

async function onLoadMore() {
  await pixabayApiService.fetchImg().then(appendPhotoCardMarkup);
  const hits = await pixabayApiService.fetchImg();
  const hitsLength = hits.data.hits.length;

  if (hitsLength < 40) {
    refs.loadMoreBtnEl.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
}

function appendPhotoCardMarkup(getImg) {
  refs.galleryEl.insertAdjacentHTML('beforeend', photoCardMarkupTpl(getImg.data.hits));
}

function clearPhotoCardGallery() {
  refs.galleryEl.innerHTML = '';
}
