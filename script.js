// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'), // поиск через id
      movie = document.querySelector('#movies');

const API_KEY = '9c464a059d368b1b6fa45ea91caad68b';

function apiSearch(event) {
  event.preventDefault();    // Отмена обновления страницы при submit


  const searchText = document.querySelector('.form-control').value, // Сохраняет только текст из инпута
        server = `https://api.themoviedb.org/3/search/multi?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru&query=' + ${searchText}`;
      
      
    requestApi(server);
}






// Обработчик события отправки формы
searchForm.addEventListener('submit', apiSearch);

// Функция получения данных из API
// В request.responseText - содержится описание и т.д.
function requestApi(url) {

  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('readystatechange', function() {
    if (request.readyState !== 4) return; // изменил jshitrc

    if (request.status !== 200) {
      console.log('Произошла ошибка:' + request.status);
      return;
    }


    // Парсим JSON файл
    const output = JSON.parse(request.responseText); // Приводим JSON в нормальный вид

    let inner = '';

    // Перебираем массив и получаем названия фильмов/сериалов
    // Выводится только название! (49-50 строка)
    output.results.forEach(function (item) {
      let nameItem = item.name || item.title;
      console.log(nameItem);
      inner = inner + '<div class="col-3">' + nameItem + '</div>';
    });



    movie.innerHTML = inner;

  });
}