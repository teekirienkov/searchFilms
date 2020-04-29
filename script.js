// Получение элементов со страницы
console.log('Need refactoring code to module structure');
const searchForm = document.querySelector('#search-form'), // поиск через id
      movie = document.querySelector('#movies'),
      urlPoster = 'https://image.tmdb.org/t/p/w500';

const API_KEY = '9c464a059d368b1b6fa45ea91caad68b';

function searchFilms(event) {
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
      addEventMedia();
    })
    .catch((reason) => {
      console.log(`Ошибка: ${reason}`);
    });
}

// Обработчик события отправки формы
searchForm.addEventListener('submit', searchFilms);

function addEventMedia() {
  // Показ информации по клику на картинку
  const media = movie.querySelectorAll('img[data-id]');

  media.forEach(function(elem){
    elem.style.cursor = 'pointer';
    elem.addEventListener('click', showFullInfo);
  });
}

// Функция показа полной информации
function showFullInfo() {
  let urlFullInfo = ``;
  if (this.dataset.type === 'movie') {
    url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru`;
  } else if (this.dataset.type === 'tv') {
    url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru`;
  } else {
    movie.innerHTML = `<h2 class="col-12 text-center text-info">Произошла ошибка</h2>`;
  }
  fetch(urlFullInfo)
    .then((value) => {
      if (value.status !== 200) {
        return Promise.reject();
      }
      return value.json(); // этот метод включен только в объектах request, response
    })
    .then((output) => {;
      console.log(output);
      movie.innerHTML = `
        <h4 class="col-10 text-center text-info">${output.name || output.title}</h4>
          <div class="col-4">
            <img src="${urlPoster + output.poster_path}" alt="${output.name || output.title}">
            ${(output.homepage) ? `<p class='text-center'> <a href="${output.homepage}" target="_blank">Официальная страница</a> </p>` : ''}
            ${(output.imdb_id) ? `<p class='text-center'> <a href="https://imdb.com/title/${output.imdb_id}" target="_blank">IMDB</a> </p>` : ''}
            </div>

          <div class="col-8">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Статус: ${output.status}</p>
            <p>Премьера: ${output.release_date || output.first_air_date}</p>
            ${(output.last_episode_to_air) 
              ? `<p>Сезонов ${output.number_of_seasons},  серий ${output.last_episode_to_air.episode_number}</p>` 
              : ''}
            <p>Описание: ${output.overview}</p>

            <br>

            <div class="youtube">
              
            </div>

          </div>`;

      getVideo(this.dataset.type, this.dataset.id);
    })
    .catch((reason) => {
      console.error(`Ошибка: ${reason}`);
    });
}

function ratingFilms() {
  const urlTrends = 'https://api.themoviedb.org/3/trending/all/week?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru'
  fetch(urlTrends)
    .then((value) => {
      if (value.status !== 200) {
        return Promise.reject();
      }
      return value.json(); // этот метод включен только в объектах request, response
    })
    .then((output) => {
      let inner = '<h3 class="col-12 text-center text-info">Популярное за неделю</h3>';
      if(output.results.length === 0) {
        inner = '<h2 class="col-12 text-center text-info">Ничего не найдено</h2>';
      }
      output.results.forEach(function (item) { // Перебираем массив и получаем названия фильмов/сериалов 
        let nameItem = item.name || item.title; // Выводится только название!
        
        let mediaType = item.title ? 'movie' : 'tv';

        const noPoster = item.poster_path ? urlPoster + item.poster_path : './img/withouth-poster.png';
        let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
        inner += `
          <div class="col-12 col-md-4 col-x1-3 item">
          <img src="${noPoster}" class="img_poster" alt="${nameItem}" ${dataInfo}>
          <h5>${nameItem}</h5>
          </div>`;
      });
      movie.innerHTML = inner;
      addEventMedia();
    })
    .catch((reason) => {
      console.log(reason);
    });
}

document.addEventListener('DOMContentLoaded', ratingFilms);


function getVideo(type, id) {
  let youtube = movie.querySelector('.youtube');
  let urlVideo = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru`
  
  fetch (urlVideo)
    .then((value) => {
      if (value.status !== 200) {
        return Promise.reject();
      }
      return value.json(); // этот метод включен только в объектах request, response
    })
    .then((output) => {
      youtube.innerHTML = 'Work';
    })
    .catch((reason) => {
      movie.innerHTML = 'Видео отсутствует';
      console.error(reason);
    })
}