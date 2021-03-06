const API_URL = "http://127.0.0.1:5000/"
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'


const movie_detail = document.getElementsByClassName("movie_detail")[0]
const movie_rmd = document.getElementsByClassName("movie_rmd")[0]
const movie_title = document.getElementsByClassName("movie_title")[0]



window.addEventListener('load', () => {

    const parms = (new URL(document.location)).searchParams
    const id = parms.get('id')
    get_movie(API_URL+"page?id="+id);
})


async function get_gener(url)
{
    const res = await fetch(url);
    const data = await res.json();
    Show_genere(data)
}

async function get_movie(url)
{
    const res = await fetch(url);
    const data = await res.json();
    show_movie(data)
}

async function get_rem(url)
{
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data)
}

function show_movie(data)
{
    movie_detail.innerHTML = ''
    movie = data[0]
    const {n} = movie
    movie_title.innerText = `${n.title}`
    const movie_show = document.createElement('div')
    movie_show.classList.add('movie_show')
    movie_show.innerHTML = `
    <div class="pic"> 
    <img src="${IMG_PATH + n.poster_path}" alt="${n.title}">
    </div>
    <div class="info">
    <div class="title_rate">
    <h2 class="title">${n.title}</h2>
    <span class="${getClassByRate(n.vote_average)}">${n.vote_average}</span>
    </div>
    <h2>Ovierview</h2>
    <p>${n.overview}</p>
    <h2>Release Date</h2>
    <div class="r_date">${change_formate(n.release_date)}</div>
    <div class="genre"></div>
    </div>
    `
    movie_detail.appendChild(movie_show)
    const genres = n.genre_ids
    get_gener(API_URL+"geners?id="+n.id)
    get_rem(API_URL+"rem?id="+genres)
}



function Show_genere(genres)
{
    const genreEl = document.getElementsByClassName("genre")[0]
    genreEl.innerHTML = ''

    genres.forEach(genre => {
    
            const {g:{id,name}} = genre
            const genreE = document.createElement('div')
            genreE.classList.add('genre_e') 

            genreE.innerHTML = `
                ${name}
            `
            genreE.addEventListener("click",()=>{
                location.replace("../category_page/category_page.html?category="+id)
            })
            genreEl.appendChild(genreE)
    })
}

function showMovies(movies) {
    
    movie_rmd.innerHTML = ''
    movies.forEach((movie) => {
        
        const {c:{id,title, poster_path, vote_average}} = movie

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
            location.replace("../movie_page/movie_page.html?id="+id)
        })
        movie_rmd.appendChild(movieEl)
    })
}


//utility function

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

function change_formate(date)
{
    var r_date = new Date(date)
    let formatted_date = r_date.getDate() + "-" + (r_date.getMonth() + 1) + "-" + r_date.getFullYear()
    return formatted_date
}

