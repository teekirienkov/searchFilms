// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'), // поиск через id
      movie = document.querySelector('#movies'),
      urlPoster = 'https://image.tmdb.org/t/p/w342';

const API_KEY = '9c464a059d368b1b6fa45ea91caad68b';

function apiSearch(event) {
  event.preventDefault();    // Отмена обновления страницы при submit
  const searchText = document.querySelector('.form-control').value, // Сохраняет только текст из инпута
        server = `https://api.themoviedb.org/3/search/multi?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru&query=' + ${searchText}`;
  
  fetch(server)
    .then((value) => {
      if (value.status !== 200) {
        return Promise.reject();
      }
      return value.json(); // этот метод включен только в объектах request, response
    })
    .then((output) => {
      let inner = '';

      output.results.forEach(function (item) { // Перебираем массив и получаем названия фильмов/сериалов 
        let nameItem = item.name || item.title; // Выводится только название!
        
        inner += `
          <div class="col-12 col-md-4 col-x1-3 item">
          <img src="${urlPoster + item.poster_path}" alt="${nameItem}">
          <h5>${nameItem}</h5>
          </div>`;
      });

      movie.innerHTML = inner;
    })
    .catch((reason) => {
      console.log(`Ошибка: ${reason}`);
    });
}

// Обработчик события отправки формы
searchForm.addEventListener('submit', apiSearch);