import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const keyApi = '24433477-a7717dfa51cf01b03daed8616';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImg() {
    const getImg = await axios.get(
      `/?key=${keyApi}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    );

    this.incrementPage();
    return getImg;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
