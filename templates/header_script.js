const form = document.getElementById('form')
const search = document.getElementById('search')
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        // getMovies(SEARCH_API + searchTerm)

        search.value = ''
        location.replace("./movie_page.html")
    } else {
        window.location.reload()
    }
})