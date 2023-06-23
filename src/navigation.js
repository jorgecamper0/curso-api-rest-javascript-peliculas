window.addEventListener("DOMContentLoaded",navigator, false);
window.addEventListener("hashchange",navigator, false);

function navigator() {
console.log(location);

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



    location.hash
};

function homePage() {
    console.log("HOME!");
    getTrendingMoviesPreview()
    getCategoriesPreview()
};

function trendsPage() {
    console.log("trends!");
};

function searchpage() {
    console.log("Search!!");
};

function moviePage() {
    console.log("Movie!!");
};

function categoryPage() {
    console.log("category!!");
};
