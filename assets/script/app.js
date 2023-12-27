'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

const popularMovies = selectAll('.popular-movie');
const friends = selectAll('.friend img');
const raters = selectAll('.rater');
const featuredMovies = selectAll('.featured-img img');
const movieTitles = selectAll('.movie-title');
const movieDescrips = selectAll('.movie-descrip');

let count = 0;

function setPopularMovies(arr) {
    popularMovies.forEach(img => {
        img.setAttribute('src', arr[count].poster);
        count++;
    });
}

function setFeaturedMovies(arr) {
    featuredMovies.forEach(img => {
        img.setAttribute('src', arr[count].poster);
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
// console.log(movies)
    setPopularMovies(movies);
    setFeaturedMovies(movies);
  } catch(error) {
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
        // print(list);
        setFriend(list);
        setRater(list);
    } catch (error) {
        console.log(error.message);
    }
}

getFriends();