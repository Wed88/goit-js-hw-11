import './sass/main.scss';

import PixabayApiService from './js/pixabay-service';
import photoCardMarkupTpl from './templates/photoCardMarkup';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  galleryEl: document.querySelector('.gallery'),
};

const pixabayApiService = new PixabayApiService();

refs.searchFormEl.addEventListener('submit', onSearch);
refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

refs.loadMoreBtnEl.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();

  clearPhotoCardGallery();
  pixabayApiService.searchQuery = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  pixabayApiService.fetchImg().then(appendPhotoCardMarkup);
  refs.loadMoreBtnEl.classList.remove('is-hidden');
}

function onLoadMore() {
  pixabayApiService.fetchImg().then(appendPhotoCardMarkup);
}

function appendPhotoCardMarkup(getImg) {
  refs.galleryEl.insertAdjacentHTML('beforeend', photoCardMarkupTpl(getImg.data.hits));
}

function clearPhotoCardGallery() {
  refs.galleryEl.innerHTML = '';
}
