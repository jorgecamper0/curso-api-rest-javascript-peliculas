let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
    searchFormInput.value;
    location.hash = "#search=" + searchFormInput.value;
});

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends="
});
arrowBtn.addEventListener("click", () => {
    history.back();
    location.hash = "#home"
});

window.addEventListener("DOMContentLoaded",navigator, false);
window.addEventListener("hashchange",navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
console.log(location);

if(infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, {passive: false});
    infiniteScroll = undefined;
}

    if(location.hash.startsWith("#trends")) {
        trendsPage();
    } else if (location.hash.startsWith("#search=")) {
        searchPage();
    }  else if (location.hash.startsWith("#movie=")) {
          moviePage();
    } else if (location.hash.startsWith("#category=")) {
        categoryPage();
    } else {
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if(infiniteScroll) {
        window.addEventListener("scroll", infiniteScroll, {passive: false});
    }



    location.hash
};

function homePage() {
    console.log("HOME!");

    headerSection.classList.remove("header-container--long");
    headerSection.computedStyleMap.background = "";
    arrowBtn.classList.add("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMoviesPreview()
    getCategoriesPreview()
};

function trendsPage() {
    console.log("trends!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.remove("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
};

function searchPage() {
    console.log("Search!!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

             //["#search", "platzi"]
     const [_,query] = location.hash.split("=");
     getMoviesBySearch(query);

     infiniteScroll = getPaginatedMoviesBySearch(query);
};

function moviePage() {
    console.log("Movie!!");


    headerSection.classList.add("header-container--long");
    // headerSection.computedStyleMap.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerCategoryTitle.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");

      //["#Movie", "Id"]
    const [_,movieId] = location.hash.split("=");   
    getMovieByID(movieId);

};

function categoryPage() {
    console.log("category!!");

    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerCategoryTitle.classList.remove("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");

    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");

         //["#category", "id-name"]
         const [_,categoryData] = location.hash.split("=");
         const [categoryId, categoryName] = categoryData.split("-");

         headerCategoryTitle.innerHTML = categoryName;


    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
};
