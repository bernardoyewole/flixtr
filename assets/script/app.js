'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

const popularMovies = selectAll('.popular-movie');
const friends = selectAll('.friend img');
const raters = selectAll('.rater');
const featuredMovies = selectAll('.featured-img img');
const movieTitles = selectAll('.movie-title');
const movieDescrips = selectAll('.movie-descrip');
const contentOne = select('.content-one');
const contentTwo = select('.content-two');
const moviePoster = select('.movie-poster img');
const main = select('main');
const home = select('.home');
const movieTitleDetail = select('.movie-title-detail');
const duration = select('.duration');
const genre = select('.genre');
const released = select('.released');
const moviePlot = select('.movie-plot');
const starring = select('.starring p');
const appendList = selectAll('.append-list');;
const dialog = select('dialog');
const gridContainer = select('.grid-container');
const myList = select('.my-list');

onEvent('click', dialog, function(e) {
    const rect = this.getBoundingClientRect();

    if (e.clientY < rect.top || e.clientY > rect.bottom || 
        e.clientX < rect.left || e.clientX > rect.right) {
        dialog.close();
    }
});

onEvent('load', window, () => {
    contentTwo.classList.add('none');
});

let count = 0;

function setPopularMovies(arr) {
    popularMovies.forEach(img => {
        img.setAttribute('src', arr[count].poster);
        img.setAttribute('id', arr[count].title);
        count++;
    });
}

function setFeaturedMovies(arr) {
    featuredMovies.forEach(img => {
        img.setAttribute('src', arr[count].poster);
        img.setAttribute('id', arr[count].title);
        count++;
    });

    count = 12;

    movieTitles.forEach(title => {
        title.innerText = `${arr[count].title} (${arr[count].year})`;
        count++;
    });

    count = 12;

    movieDescrips.forEach(descrip => {
        descrip.innerText = `${arr[count].description}`;
        count++;
    });
}

const options = {
    method: 'GET',
    mode: 'cors'
};

async function getMovies() {
    const URL = 'https://api.andrespecht.dev/movies';

    try {
        const response = await fetch(URL, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        const movies = data.response;

        setPopularMovies(movies);
        setFeaturedMovies(movies);
    } catch (error) {
        console.log(error);
    }
};

getMovies();

let index1 = 0;

function setFriend(arr) {
    arr.forEach(obj => {
        if (index1 === 12) return;
        friends[index1].setAttribute('src', obj.picture.large);
        index1++;
    });
}

function getRandomIndex() {
    return Math.floor((Math.random() * 11) + 1)
}

function setRater(arr) {
    raters.forEach(rater => {
        rater.setAttribute('src', arr[getRandomIndex()].picture.large);
    })
}

async function getFriends() {
    const URL = 'https://randomuser.me/api/?nat=CA&results=14&seed=same';

    try {
        const result = await fetch(URL, options);

        if (!result.ok) {
            throw new Error(`${result.statusText} (${result.status})`);
        }

        const users = await result.json();
        const list = users.results;
        setFriend(list);
        setRater(list);
    } catch (error) {
        console.log(error.message);
    }
}

getFriends();

let title;

function setMovieTitle(obj) {
    title = obj.id;
    getMovieDetails();
}

onEvent('click', home, () => {
    contentOne.classList.remove('none');
    contentTwo.classList.add('none');
    main.style.height = '';
});

onEvent('click', window, (event) => {
    popularMovies.forEach(movie => {
        if (movie.contains(event.target)) {
            setMovieTitle(movie);
            contentOne.classList.add('none');
            contentTwo.classList.remove('none');
            main.style.height = 'calc(100% - 70px)'
        }
    });

    featuredMovies.forEach(movie => {
        if (movie.contains(event.target)) {
            setMovieTitle(movie);
            contentOne.classList.add('none');
            contentTwo.classList.remove('none');
            main.style.height = 'calc(100% - 70px)'
        }
    });
});

function setPoster(obj) {
    moviePoster.setAttribute('src', `${obj.Poster.replace('300', '2080')}`);
}

function setMovieDetails(obj) {
    movieTitleDetail.innerText = `${obj.Title} (${obj.Year})`;
    duration.innerText = `${obj.Runtime}`;
    genre.innerText = `${obj.Genre}`;
    released.innerText = `${obj.Released}`; 
    moviePlot.innerText = `${obj.Plot}`;
    starring.innerText = `${obj.Actors}`;
}

function addMovieToList(obj) {
    let movieBox = create('div');
    let img = create('img');
    img.setAttribute('src', `${obj.Poster.replace('300', '2080')}`);

    let moviesInList = selectAll('.grid-container img');
    let alreadyInList = moviesInList.some(movie => img.getAttribute('src') 
    === movie.getAttribute('src'));

    if (!alreadyInList) {
        movieBox.appendChild(img);
        gridContainer.appendChild(movieBox);
        isAddClicked = false;
    }
}

async function getMovieDetails() {
    const URL = `https://www.omdbapi.com/?t=${title}&apikey=a2d6b9cc`;

    try {
        const response = await fetch(URL, options);
        if (!response.ok) {
            throw new Error(`${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        // print(data);
        setPoster(data);
        setMovieDetails(data);
        isAddClicked ?  addMovieToList(data) : '';
    } catch (error) {
        console.log(error);
    }
};

function getTitle(obj) {
    let arr = obj.parentElement.parentElement.childNodes;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasChildNodes()) {
            if(arr[i].classList.contains('movie-title') 
            || arr[i].classList.contains('movie-title-detail')) {
        return arr[i].innerText;
            }
        }
    }
}

let isAddClicked = false;

appendList.forEach(button => {
    onEvent('click', button, () => {
        isAddClicked = true;
        let clickedTitle = getTitle(button);
        title = clickedTitle.split('(')[0];
        getMovieDetails();
    });
});

onEvent('click', myList, () => {
    dialog.showModal();
});