import addEventMedia from './addEventMedia'

function searchFilms(event) {
	event.preventDefault();

	const movie = document.querySelector('#movies'),
				urlPoster = 'https://image.tmdb.org/t/p/w500',
				searchText = document.querySelector('.form-control').value,
				searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru&query=' + ${searchText}`;

	movie.innerHTML = `
			<div class="spinner">
			</div>`;

	fetch(searchUrl)
		.then((value) => {
		// Проверяем, если статус ответа не равен 200, то reject
			if (value.status !== 200) {
				return Promise.reject();
			}
			// Иначе, возвращаем данные и парсим их в JSON
			return value.json();
		})
		.then((output) => {
		// Теперь тут рендерим полученные данные на страницу
			let responseHtml = '';
			// Проверка, если результат запроса пустая строка, то фильм не найден
      if(output.results.length === 0) {
        responseHtml = '<h2 class="col-12 text-center text-info">Ничего не найдено</h2>';
			}
			// Перебираем массив ответов и получаем фильмы
			output.results.forEach((item) => {
				let nameFilm = item.name || item.title; // Присваем только название фильма
				
				const noPoster = item.poster_path ? urlPoster + item.poster_path : '../img/withouth-poster.png';
				
				let dataInfo = '';

				if (item.media_type !== 'person') {
					dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
				}
				
				responseHtml += `
					<div class="col-12 col-md-4 col-x1-3 item">
						<img src="${noPoster}" class="img_poster" alt="${nameFilm}" ${dataInfo}>
						<h5>${nameFilm}</h5>
					</div>`;
			});
		
			movie.innerHTML = responseHtml;
			addEventMedia();
		})
		.catch((reason) => {
			console.log(`Ошибка: ${reason}`)
		})
}

export default searchFilms;