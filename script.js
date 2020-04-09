// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'), // поиск через id
      movie = document.querySelector('#movies');

const API_KEY = '9c464a059d368b1b6fa45ea91caad68b';

function apiSearch(event) {
  event.preventDefault();    // Отмена обновления страницы при submit
  const searchText = document.querySelector('.form-control').value, // Сохраняет только текст из инпута
        server = `https://api.themoviedb.org/3/search/multi?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru&query=' + ${searchText}`;
  
  fetch(server)
    .then(function(value){
      return value.json();
    })
    .then(function(output){
      let inner = '';
        output.results.forEach(function (item) { // Перебираем массив и получаем названия фильмов/сериалов 
          let nameItem = item.name || item.title; // Выводится только название! (49-50 строка)
          console.log(nameItem);
          inner = inner + '<div class="col-3">' + nameItem + '</div>';
        });
        movie.innerHTML = inner;
    })
    .catch(function(reason){
      console.log(`Ошибка: ${reason.status}`);
    });
  
  requestApi(server)
    .then(function(result){
        const output = JSON.parse(result); // Приводим JSON в нормальный вид 
    })
    .catch(function(reason){
      console.log(`Ошибка: ${reason.status}`);
    })
}

// Обработчик события отправки формы
searchForm.addEventListener('submit', apiSearch);

// Функция получения данных из API
// В request.responseText - содержится описание и т.д.
function requestApi(url) {

  return new Promise (function (resolve, reject){
    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.addEventListener('load', function() {
      if (request.status !== 200) {
        reject({
          status: request.status
        });
        return;
      } else {
        resolve(request.response); // выполнение, в скобках передается ответ
      }
    });

    request.addEventListener('error', function() {
      reject({status: request.status});
    })

    request.send();
  });
};