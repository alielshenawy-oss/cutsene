const defaultMovies = [
    {
        id: 1,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        dateAdded: 4,
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        id: 2,
        title: "Spider-Man: Brand New Day",
        year: 2026,
        rating: 8.8,
        dateAdded: 3,
        image: "https://image.tmdb.org/t/p/w500/9JCQtDCSpPR2ld55yNlEg1VwcQo.jpg"
    },
    {
        id: 3,
        title: "Need for Speed",
        year: 2014,
        rating: 6.4,
        dateAdded: 2,
        image: "https://image.tmdb.org/t/p/w500/kOaszlaotCGOu9BhFeeATnGkVMV.jpg"
    },
    {
        id: 4,
        title: "Fast & Furious",
        year: 2009,
        rating: 6.7,
        dateAdded: 1,
        image: "https://image.tmdb.org/t/p/w500/zvjQPVttJWaCSbzMijyc2x2MLr4.jpg"
    }
];

let watchlist =
    JSON.parse(localStorage.getItem("cineTrackWatchlist")) || defaultMovies;

const grid = document.getElementById("watchlistGrid");
const movieCount = document.getElementById("movieCount");
const sortSelect = document.getElementById("sortSelect");

function saveWatchlist() {
    localStorage.setItem("cineTrackWatchlist", JSON.stringify(watchlist));
}

function updateCount() {
    const count = watchlist.length;
    movieCount.textContent =
        `(${count} ${count === 1 ? "title" : "titles"})`;
}

function displayMovies(movies) {
    grid.innerHTML = "";

    if (movies.length === 0) {
        grid.innerHTML = `
            <div class="empty-watchlist">
                <h2>Your watchlist is empty</h2>
                <p>Add some movies to start building your watchlist.</p>
            </div>
        `;
        updateCount();
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement("article");
        card.classList.add("movie-card");

        card.innerHTML = `
            <div class="poster-container">
                <img src="${movie.image}" alt="${movie.title}" loading="lazy">

                <div class="rating">⭐ ${movie.rating}</div>

                <button
                    class="delete-btn"
                    title="Remove from watchlist"
                    data-id="${movie.id}">
                    ×
                </button>
            </div>

            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${movie.year}</p>
        `;

        grid.appendChild(card);
    });

    updateCount();
    addDeleteEvents();
}

function addDeleteEvents() {
    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const id = Number(button.dataset.id);

            watchlist = watchlist.filter(movie => movie.id !== id);

            saveWatchlist();
            sortMovies();
        });
    });
}

function sortMovies() {
    const sortType = sortSelect.value;
    let sortedMovies = [...watchlist];

    if (sortType === "date") {
        sortedMovies.sort((a, b) => b.dateAdded - a.dateAdded);
    } else if (sortType === "rating") {
        sortedMovies.sort((a, b) => b.rating - a.rating);
    } else if (sortType === "title") {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "year") {
        sortedMovies.sort((a, b) => b.year - a.year);
    }

    displayMovies(sortedMovies);
}

sortSelect.addEventListener("change", sortMovies);

displayMovies(watchlist);
