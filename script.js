const inputEl = document.getElementById("input"),
      btnEl = document.getElementById("btn"),
      mainEl = document.getElementById("main");
      

let imdbArr = []
let movieByImdb = []
btnEl.addEventListener("click",getFetch)

mainEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("round-btn")) {
        const movieItem = e.target.closest(".movie-item");
        
        const movieObj = {
            title: movieItem.querySelector(".title").textContent,
            rating: movieItem.querySelector(".imdbID").textContent,
            runtime: movieItem.querySelector(".runtime").textContent,
            poster: movieItem.querySelector(".poster").src,
            genre: movieItem.querySelector(".genra").textContent,
            plot: movieItem.querySelector(".plot").textContent
            
        };
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []
        watchlist.unshift(movieObj);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
       
    }
});


function getFetch(){
    fetch(`http://www.omdbapi.com/?apikey=92022b4c&s=${inputEl.value}`)
    .then(res => res.json())
    .then(data => {
        getimdb(data.Search)
    })
}

function render(arr){
    
    const listOfFilms = arr.map(movie => {
        return `
            <div class="movie-item">
                <img src="${movie.Poster}" alt="" class="poster">
                <div class="wrapper">
                    <div class="title-wrapper">
                        <p class="title">${movie.Title}</p>
                        <p class="imdbID">⭐${movie.imdbRating}</p>
                    </div>
                    <div class="addictional">
                        <p class="runtime">${movie.Runtime}</p>
                        <p class="genra">${movie.Genre}</p>
                        <div class="round-btn">+</div>
                        <div class="div">Watchlist</div>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            </div> 
        `
    }).join("")
    mainEl.innerHTML = listOfFilms

    
}

function getimdb(movie){
    for (imdb of movie){
        imdbArr.push(imdb.imdbID)
    }
    getListOfMovies(imdbArr)
}

function getListOfMovies(imdbArr){

    for (imdb of imdbArr){
        
        fetch(`http://www.omdbapi.com/?apikey=92022b4c&i=${imdb}&plot=full`)
        .then(res => res.json())
        .then(data => {
            if (movieByImdb.length > 10){
                movieByImdb = []
            }
            movieByImdb.push(data)
            render(movieByImdb)
        })
    }
    
}
