const APILINK = 'http://localhost:8000/api/v1/reviews/';
const TRAILER_API = 'https://api.themoviedb.org/3/movie/';
const API_KEY = '37379c0e615732b9edaceb26bd777fe4';
const main1 = document.getElementById("trailer-section");
const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const titulos = document.getElementById("title");
titulos.innerHTML = movieTitle;

returnReviews(APILINK);
fetchTrailer(movieId);
description(movieId);

function returnReviews(url){
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data) { 
        console.log(data);

        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                        <div class="card" id="${review._id}">
                            <p><strong>Review :<br></strong>${review.review}</p>
                            <p><strong>User :</strong>${review.user}</p>
                            <p><a href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">edit</a> 
                            <a href="#" onclick="deleteReview('${review._id}')">delete</a></p>
                        </div>
                    </div>
                </div>
            `;

            main.appendChild(div_card);
        });
    });
}

function fetchTrailer(movieId) {
    fetch(`${TRAILER_API}${movieId}/videos?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const trailers = data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailers.length > 0) {
                const trailer = trailers[0];
                const trailerDiv = document.createElement('div');
                trailerDiv.setAttribute('class', 'trailer');
                trailerDiv.innerHTML = `
                    <h3>Trailer</h3>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
                `;
                main1.appendChild(trailerDiv);
            }
        })
        .catch(error => console.error('Error fetching trailer:', error));
}

function description(movieId) {
    fetch(`${TRAILER_API}${movieId}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.setAttribute('class', 'description');
            descriptionDiv.innerHTML = `
                <h3>Description</h3>
                <p>${data.overview}</p>
                <p>${data.release_date}</p>
                <p>average vote : <span id="average">${data.vote_average}</span>  (vote count ${data.vote_count})</p>

            `;
            const averageVoteElement = descriptionDiv.querySelector('#average');
            if (data.vote_average >= 8) {
                averageVoteElement.style.color = 'green';
            } else if (data.vote_average >= 5) {
                averageVoteElement.style.color = 'blue';
            } else {
                averageVoteElement.style.color = 'red';
            }
            main1.appendChild(descriptionDiv);
        })
        .catch(error => console.error('Error fetching description:', error));      
}

function editReview(id, review, user){
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML =` 
    <p><strong>Review: </strong>
        <input type="text" id="${reviewInputId}" value="${review}">
    </p>

    <p><strong>User: </strong>
        <input type="text" id="${userInputId}" value="${user}">
    </p>

    <p>
        <a href="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">SAVE</a>
    </p> `;

}

function saveReview(reviewInputId, userInputId, id=""){
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
    if(id){
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            });
    } else {
        fetch(APILINK + 'new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"movieId": parseInt(movieId), "user": user, "review": review})
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            });
    }
}

function deleteReview(id){
    fetch(APILINK + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id": id})
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
        });
}

function createReview(){
    const new_div = document.createElement('div');
    new_div.setAttribute('class', 'card');
    new_div.innerHTML = `
        <div class="row">
            <div class="column">
                <div class="card">
                    
                
                    <p><strong>User: </strong>
                        <input type="text" id="new_user">
                    </p>
                    <p><strong>Review: </strong>
                        <input type="text" id="new_review">
                    </p>
                
                    <p>
                        <a href="#" onclick="saveReview('new_review','new_user')">SAVE</a>
                    </p> 
                </div>
            </div>
        </div>
    `;

    main.appendChild(new_div);
}
