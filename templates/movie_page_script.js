const API_URL = "http://127.0.0.1:5000/page?id="
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'


window.addEventListener('load', () => {

    const parms = (new URL(document.location)).searchParams

    const id = parms.get('id')
    get_movie(API_URL+id);
})


async function get_movie(url)
{
    const res = await fetch(url);
    const data = await res.json();
    show_movie(data)
}

function show_movie(data)
{
    console.log(data);

    
}
