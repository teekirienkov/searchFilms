import searchFilms from './searchFilms';
import weekRating from './weekRating';

const searchForm = document.querySelector('#search-form');


document.addEventListener('DOMContentLoaded', weekRating);
searchForm.addEventListener('submit', searchFilms);
