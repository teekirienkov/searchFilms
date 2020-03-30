// Получение элементов со страницы
const searchForm = document.querySelector('#search-form'); // поиск через id


function apiSearch(event) {
    event.preventDefault();

    console.log(event);


}

searchForm.addEventListener('submit', apiSearch);

let user = {
    name: "Джон",
    age: 30,
  
    sayHi() {
      // this - это "текущий объект"
      alert(this.name);
    }
  
  };
  
user.sayHi(); // Джон