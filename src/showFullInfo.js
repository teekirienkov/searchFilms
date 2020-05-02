import getVideo from './getVideo';

function showFullInfo() {
	const movie = document.querySelector('#movies'),
				urlPoster = 'https://image.tmdb.org/t/p/w500';

	let url = ``;
	if (this.dataset.type === 'movie') {
    url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru`;
  } else if (this.dataset.type === 'tv') {
    url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru`;
  } else {
    movie.innerHTML = `<h2 class="col-12 text-center text-info">Произошла ошибка</h2>`;
	}
	
	fetch(url)
		.then((value) => {
			if (value.status !== 200) {
        return Promise.reject();
      }
      return value.json();
		})
		.then((output) => {
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
			console.log(`Ошибка ${reason}`)
		})
}

export default showFullInfo;