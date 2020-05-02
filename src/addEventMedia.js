import showFullInfo from './showFullInfo';

function addEventMedia() {
	const movie = document.querySelector('#movies'),
				media = movie.querySelectorAll('img[data-id]');

	// Делегирование событий
	// Перебираем каждый постер
	media.forEach((elem) => {
		elem.style.cursor = 'pointer';
		elem.addEventListener('click', showFullInfo);
	})
}

export default addEventMedia;