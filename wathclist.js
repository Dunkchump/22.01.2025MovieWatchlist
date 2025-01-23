
const mainEl = document.getElementById('main');
// Рендерим фильмы из watchlist
function renderWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    if (watchlist.length > 0) {
        const listOfFilms = watchlist.map(movie => `
            <div class="movie-item">
                <img src="${movie.poster}" alt="" class="poster">
                <div class="wrapper">
                    <div class="title-wrapper">
                        <p class="title">${movie.title}</p>
                        <p class="imdbID">${movie.rating}</p>
                    </div>
                    <div class="addictional">
                        <p class="runtime">${movie.runtime}</p>
                        <p class="genra">${movie.genre}</p>
                        <div class="round-btn">-</div>
                        <div class="div">Remove</div>
                    </div>
                    <p class="plot">${movie.plot}</p>
                </div>
            </div>
        `).join("");
    
        mainEl.innerHTML = listOfFilms;
    }
}
renderWatchlist();
mainEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("round-btn")) {
        const title = e.target.closest(".movie-item").querySelector(".title").textContent;
        
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(movie => movie.title !== title);
        
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    }
});

