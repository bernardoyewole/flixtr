'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

const popularMovies = selectAll('.popular-movie');
const friends = selectAll('.friend img');

let count = 0;

function setMovies(arr) {
    popularMovies.forEach(ele => {
        ele.setAttribute('src', arr[count].poster);
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
    setMovies(movies);
  } catch(error) {
    console.log(error);
  }
};

getMovies();

let index = 0;

function setFriend(arr) {
    arr.forEach(obj => {
        let img = friends[index];
        img.setAttribute('src', obj.picture.large);
        index++;
    });
}

async function getFriends() {
    const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

    try {
        const result = await fetch(URL, options);

        if (!result.ok) {
            throw new Error(`${result.statusText} (${result.status})`);
        }

        const users = await result.json();
        const list = users.results;
        print(list);
        setFriend(list);
    } catch (error) {
        console.log(error.message);
    }
}

getFriends();