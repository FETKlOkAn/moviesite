const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37379c0e615732b9edaceb26bd777fe4&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=37379c0e615732b9edaceb26bd777fe4&query=';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data) { 
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail'); // fixed typo in class name
            image.setAttribute('id', 'image');
            image.src = IMG_PATH + element.poster_path; // corrected the image variable

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            title.innerHTML = `${element.original_title}<br><br><a href="movie.html?id=${element.id}&title=${element.original_title}">reviews</a>`;

            div_card.appendChild(image);
            div_card.appendChild(title);

            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value; // corrected ariaValueMax to value
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});
