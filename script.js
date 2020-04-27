// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'), // поиск через id
      movie = document.querySelector('#movies'),
      urlPoster = 'https://image.tmdb.org/t/p/w500';

const API_KEY = '9c464a059d368b1b6fa45ea91caad68b';

function apiSearch(event) {
  event.preventDefault();    // Отмена обновления страницы при submit
  const searchText = document.querySelector('.form-control').value, // Сохраняет только текст из инпута
        server = `https://api.themoviedb.org/3/search/multi?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru&query=' + ${searchText}`;
  
  movie.innerHTML = `
                      <div class="spinner">
                      </div>`;
  fetch(server)
    .then((value) => {
      if (value.status !== 200) {
        return Promise.reject();
      }
      return value.json(); // этот метод включен только в объектах request, response
    })
    .then((output) => {
      let inner = '';
      if(output.results.length === 0) {
        inner = '<h2 class="col-12 text-center text-info">Ничего не найдено</h2>';
      }

      output.results.forEach(function (item) { // Перебираем массив и получаем названия фильмов/сериалов 
        let nameItem = item.name || item.title; // Выводится только название!
        const noPoster = item.poster_path ? urlPoster + item.poster_path : './img/withouth-poster.png';
        
        let dataInfo = '';
        if (item.media_type !== 'person') {
          dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
        
        }
        inner += `
          <div class="col-12 col-md-4 col-x1-3 item">
          <img src="${noPoster}" class="img_poster" alt="${nameItem}" ${dataInfo}>
          <h5>${nameItem}</h5>
          </div>`;
      });

      movie.innerHTML = inner;

      // Показ информации по клику на картинку
      const media = movie.querySelectorAll('.item');

      media.forEach(function(elem){
        elem.addEventListener('click', showFullInfo);
      });
    })
    .catch((reason) => {
      console.log(`Ошибка: ${reason}`);
    });
}

// Обработчик события отправки формы
searchForm.addEventListener('submit', apiSearch);


function showFullInfo() {
  console.log(this);
}