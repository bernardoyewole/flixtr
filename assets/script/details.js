'use strict';

import { onEvent, select, selectAll, create, print } from "./utils.js";

// const moviePoster = select('.movie-poster img');

// function setPoster(obj) {
//     moviePoster.setAttribute('src', `${obj.Poster.replace('300', '2080')}`);
// }

// const options = {
//     method: 'GET',
//     mode: 'cors'
// };

// async function getMovies() {
//     const URL = 'https://www.omdbapi.com/?t=black+panther&apikey=a2d6b9cc';

//   try {
//     const response = await fetch(URL, options);
//     if (!response.ok) {
//       throw new Error(`${response.statusText} (${response.status})`);
//     }

//     const data = await response.json();
//     print(data);
//     setPoster(data);
//   } catch(error) {
//     console.log(error);
//   }
// };

// getMovies();