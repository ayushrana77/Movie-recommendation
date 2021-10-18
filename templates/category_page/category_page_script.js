const API_URL = "http://127.0.0.1:5000/"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'


const Category_main = document.getElementById('Category_main')
const cat = document.getElementsByClassName('cat')[0]

// Get initial movies
window.addEventListener("load", ()=>{
    const prams = (new URL(document.location)).searchParams
    const category_id = prams.get('category')
    const year = prams.get('year')
    const search = prams.get('search')
    if(category_id != null)
        {   
            getTitle(API_URL+"category?id="+category_id)
            getMovies(API_URL+"category_page?id="+category_id)
        }
    if (year != null)
        {   
            cat.innerText= `Year : ${year}`
            getMovies(API_URL+"year?year="+year)
        }
    if (search != null)
        {   
            cat.innerText= `Result for : ${search}`
            getMovies(API_URL+"search?search="+search)
        }
})



async function getTitle(url) {
    const res = await fetch(url)
    const data = await res.json()
    showTitle(data)
}

function showTitle(title)
{
    const {n:{name}} = title[0]
    cat.innerText= `Category : ${name}`
}

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data)
}

function showMovies(movies) {
    Category_main.innerHTML = ''
    movies.forEach((movie) => {
        
        const { m:{id,title, poster_path, vote_average}} = movie

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
            location.replace("../movie_page/movie_page.html?id="+id)
        })
        Category_main.appendChild(movieEl)
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

