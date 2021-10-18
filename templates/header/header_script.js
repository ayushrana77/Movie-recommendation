const my_header = document.getElementsByClassName('my_header')[0]
const API_UR = "http://127.0.0.1:5000/"


my_header.innerHTML = ''

const headEl = document.createElement('nav')
headEl.classList.add('header')

headEl.innerHTML = `
    <div class="logo">MOVIE</div>
    <div class="menu">
    <ul class="menu_btn">
        <li class="dropdown">GENRE<ul class="genre_d drop_it"></ul>
        </li>
        <li class="dropdown">YEAR<ul class="year_d drop_it"></ul>
        </li>
    </ul>
    <form id="form" class="from_ser">
    <input type="text" id="search" class="search" placeholder="Search">
    </form>
    </div>
`
my_header.appendChild(headEl)


const year_d = document.getElementsByClassName('year_d')[0]
const genre_d = document.getElementsByClassName('genre_d')[0]
const dropdown1 = document.getElementsByClassName('dropdown')[0]
const dropdown2 = document.getElementsByClassName('dropdown')[1]
const logo = document.getElementsByClassName('logo')[0]


year_dr()
get_genre(API_UR+"genre")
async function get_genre(url)
{
    const res = await fetch(url)
    const data = await res.json()
    genre_dr(data)
}

function genre_dr(genres)
{
    
    genres.forEach(genre => {
        const {n:{id,name}} = genre
        const dropdowm = document.createElement('li')
        dropdowm.innerText=`${name}`

        dropdowm.addEventListener("click", ()=>{
            location.replace("../category_page/category_page.html?category="+id)
        })
        genre_d.appendChild(dropdowm)
    })
       
}


function year_dr()
{
    var year = new Date().getFullYear()

    const year_list = [];
    for(let i=0;i<15;i++)
    {
        year_list.push(year);
        year--;
    }
    for(let i=0;i<15;i++)
    {
        const dropdowm = document.createElement('li')
        if(i==14)
        {
            dropdowm.innerText=`Before ${year_list[i]}`
        }else{
            dropdowm.innerText=`${year_list[i]}`
        }
        dropdowm.addEventListener("click", ()=>{
            location.replace("../category_page/category_page.html?year="+year_list[i])
        })
        year_d.appendChild(dropdowm)
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        search.value = ''
        location.replace("../category_page/category_page.html?search="+searchTerm)
    } else {
        window.location.reload()
    }
})

dropdown1.addEventListener("mouseenter",()=>{
    genre_d.classList.add('active') 
})
dropdown2.addEventListener("mouseenter",()=>{
    year_d.classList.add('active') 
})
dropdown1.addEventListener("mouseleave",()=>{
    genre_d.classList.remove('active') 
})
dropdown2.addEventListener("mouseleave",()=>{
    year_d.classList.remove('active') 
})
logo.addEventListener("click",()=>{
    location.replace("../home/index.html")
})