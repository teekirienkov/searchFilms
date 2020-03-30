// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'); // поиск через id

const API_KEY = '9c464a059d368b1b6fa45ea91caad68b';

function apiSearch(event) {
    event.preventDefault();    // Отмена обновления страницы при submit


  const searchText = document.querySelector('.form-control').value, // Сохраняет только текст из инпута
    server = `https://api.themoviedb.org/3/search/multi?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru&query=' + ${searchText}`;
      
      
    requestApi('GET', server);
}






// Обработчик события отправки формы
searchForm.addEventListener('submit', apiSearch);

// Функция получения данных из API
function requestApi(method, url) {

  const request = new XMLHttpRequest();
  request.open(method, url);

  request.send();

  request.addEventListener('readystatechange', function() {
    if (request.readyState === 4) return; // изменил jshitrc
  });


}