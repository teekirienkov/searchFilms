function getVideo(type, id) {
	const movie = document.querySelector('#movies');

	let youtube = movie.querySelector('.youtube');
	let urlVideo = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=9c464a059d368b1b6fa45ea91caad68b&language=ru`;

	fetch(urlVideo)
		.then((value) => {
			if (value.status !== 200) {
				return Promise.reject();
			}

			return value.json();
		})
		.then((output) => {
			let videoFrame = `<h5 class="text-info">Трейлеры</h5>`;

			if (output.results.length === 0) {
        videoFrame = `<h5 class="text-info">Трейлеров нет</h5>`;
      }

			output.results.forEach((item) => {
        videoFrame += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
			});
			
			youtube.innerHTML = videoFrame;
		})
		.catch((reason) => {
			youtube.innerHTML = 'Трейлер отсутствует';
			console.log(`Ошибка ${reason}`);
		})
}

export default getVideo;