const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    params: {
        "api_key": APIKEY,
    },
});
//Utilis

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const url = entry.target.getAttribute('data-img')
        entry.target.setAttribute('src', url);
      }
    });
  });

  function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
  
    if (item) {
      movies = item;
    } else {
      movies = {};
    }
    
    return movies;
  }

  function likeMovie(movie) {
    // movie.id
    
    const likedMovies = likedMoviesList();
    
    if (likedMovies[movie.id]) {
      likedMovies[movie.id] = undefined;
    }  else {
      likedMovies[movie.id] = movie;
    }
  
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
    getTrendingMoviesPreview()
    getLikedMovies()
  }

function createMovies(
    movies,
    container,
     {
    lazyLoad = false,
    clean = true
    } = {},
     ) {
    if (clean) {
        container.innerHTML = "";
    }


    movies.forEach(movie => {
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie-container");
        
        const movieImg = document.createElement("img")
        movieImg.classList.add("movie-img")
        movieImg.setAttribute("alt", movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
             "https://image.tmdb.org/t/p/w300/" + movie.poster_path
        );
        movieImg.addEventListener("click", () => {
          location.hash = "#movie=" + movie.id
      });

        movieImg.addEventListener("error", () => {
            movieImg.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png");
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList() [movie.id] &&  movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
          movieBtn.classList.toggle('movie-btn--liked');
          likeMovie(movie);
        });

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
          }
          movieContainer.appendChild(movieImg);
          movieContainer.appendChild(movieBtn);
          container.appendChild(movieContainer);
   })
   
};



function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement("div")
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h3")
        categoryTitle.classList.add("category-title")
        categoryTitle.setAttribute("id", "id" + category.id);
        categoryTitle.addEventListener("click", () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name)

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
   });
};

//Llamados a la API

async function getCategoriesPreview() {
    const {data} = await api("genre/movie/list?&language=es");
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList,);
};

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies)
  
    createMovies(movies, trendingMoviesPreviewList, true);
  }

async function getMoviesByCategory(id) {
    const {data} = await api("/discover/movie", {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    
    createMovies(movies, genericSection, { lazyLoad: true });
};

function getPaginatedMoviesByCategory(id) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
          } = document.documentElement;
          
          const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
      
          const pageIsNotMax = page < maxPage;
        
          if (scrollIsBottom && pageIsNotMax) {
            page++;
            const {data} = await api("/discover/movie", {
                params: {
                    with_genres: id,
                    page,
                },
            });
          const movies = data.results;
      
            createMovies(
              movies,
              genericSection,
              { lazyLoad: true, clean: false },
            );
          }
    }
      
        // const btnLoadMore = document.createElement('button');
        // btnLoadMore.innerText = 'Cargar más';
        // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
        // genericSection.appendChild(btnLoadMore);
      }
    

async function getMoviesBySearch(query) {
    const {data} = await api("/search/movie", {
        params: {
            query
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    
    createMovies(movies, genericSection);
};

function getPaginatedMoviesBySearch(query) {
return async function () {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;
      
      const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  
      const pageIsNotMax = page < maxPage;
    
      if (scrollIsBottom && pageIsNotMax) {
        page++;
        const {data} = await api("/search/movie", {
          params: {
              query,
              page,
          },
      });
      const movies = data.results;
  
        createMovies(
          movies,
          genericSection,
          { lazyLoad: true, clean: false },
        );
      }
}
  
    // const btnLoadMore = document.createElement('button');
    // btnLoadMore.innerText = 'Cargar más';
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    // genericSection.appendChild(btnLoadMore);
  }

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;
  
    createMovies(movies, genericSection, { lazyLoad: true, clean: true });

    // const btnLoadMore = document.createElement("button")
    // btnLoadMore.innerText = "cargar mas";
    // btnLoadMore.addEventListener("click", getPaginatedTrendingMovies);
    // genericSection.appendChild(btnLoadMore);
};

async function getPaginatedTrendingMovies() {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
    
    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;
  
    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api('trending/movie/day', {
        params: {
          page,
        },
      });
      const movies = data.results;
  
      createMovies(
        movies,
        genericSection,
        { lazyLoad: true, clean: false },
      );
    }
  
    // const btnLoadMore = document.createElement('button');
    // btnLoadMore.innerText = 'Cargar más';
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    // genericSection.appendChild(btnLoadMore);
  }


async function getMovieByID (id) {
    const {data: movie} = await api("movie/" + id);

    const movieImgUrl = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;

    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_avergage;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRealtedMoviesId(id);
};

async function getRealtedMoviesId(id) {
    const {data} = await api(`movie/${id}/recommendations`);

    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer)

}

function getLikedMovies() {
  const likedMovies = likedMoviesList();
  const moviesArray = Object.values(likedMovies);

  createMovies(moviesArray, likedMoviesListArticle, { lazyLoad: true, clean: true });
  console.log(likedMovies)
}