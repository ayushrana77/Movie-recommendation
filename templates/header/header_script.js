const my_header = document.getElementsByClassName('my_header')[0]
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'


my_header.innerHTML = ''

const headEl = document.createElement('div')
headEl.classList.add('header')

headEl.innerHTML = `
    <form id="form">
    <input type="text" id="search" class="search" placeholder="Search">
    </form>
`
my_header.appendChild(headEl)


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        search.value = ''
        location.replace("../movie_page/movie_page.html?name="+searchTerm)
    } else {
        window.location.reload()
    }
})