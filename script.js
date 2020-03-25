// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'); // поиск через id


function apiSearch(event) {
    event.preventDefault();

    console.log(event);


}

searchForm.addEventListener('submit', apiSearch);