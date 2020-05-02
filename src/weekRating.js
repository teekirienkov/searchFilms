import addEventMedia from './addEventMedia';

function weekRating() {
	const urlTrends = 'https://api.themoviedb.org/3/trending/all/week?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru',
				movie = document.querySelector('#movies'),
				urlPoster = 'https://image.tmdb.org/t/p/w500';
				
	fetch(urlTrends)
		.then((value) => {
			if (value.status !== 200) {
				return Promise.reject();
			}

			return value.json();
		})
		.then((output) => {
			let innerH = `<h3 class="col-12 text-center text-info">Популярное за неделю</h3>`;
			// Если ответ равен 0, то заголовок меняется
			if (output.results.length === 0) {
				innerH = '<h2 class="col-12 text-center text-info">Ничего не найдено</h2>';
			}

			output.results.forEach((item) => {
				let nameFilms = item.name || item.title;

				let mediaType = item.title ? 'movie' : 'tv';

				const noPoster = item.poster_path ? urlPoster + item.poster_path : './img/withouth-poster.png';

				let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;

				innerH += `
					<div class="col-12 col-md-4 col-x1-3 item">
						<img src="${noPoster}" class="img_poster" alt="${nameFilms}" ${dataInfo}>
						<h5>${nameFilms}</h5>
          </div>`
			})
			movie.innerHTML = innerH;
			addEventMedia()
		})
		.catch((reason) => {
			console.log(`Ошибка: ${reason}`)
		})
}

export default weekRating;