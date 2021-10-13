const API_URL = "http://127.0.0.1:5000/"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'


const front_main = document.getElementById('front_main')


// Get initial movies


getMovies(API_URL+"front")

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data)
}

function showMovies(movies) {
    
    front_main.innerHTML = ''

    movies.forEach((movie) => {
        
        const { n:{id,title, poster_path, vote_average}} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        `
        movieEl.addEventListener("click",()=> {
            console.log(id)
            location.replace("./movie_page.html?id="+id)
        })
        front_main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

