let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='+ searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
});

arrowBtn.addEventListener('click', () => {
    location.hash = window.history.back();
})


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);



function navigator() {
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {passive: false});
        infiniteScroll = undefined;
    }


    location.hash

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')) {
        searchPage();
    }else if(location.hash.startsWith('#movie=')) {
        movieDetailPage();
    }else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
    
    window.scroll(0,0);

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {passive: false})
    }
}


function homePage() {
    console.log('Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
}

function categoriesPage() {
    console.log('category');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=') // => ['category', 'id-name'];
    const [categoryID, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesbyCategory(categoryID);

    infiniteScroll = getPaginatedgMoviesByCategory(categoryID);
}
function movieDetailPage() {
    console.log('Movie');

    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');


    const [_, movieId] = location.hash.split('=') // => ['search', 'platzi'];
    getMovieById(movieId);
}
function searchPage() {
    console.log('Search!!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=') // => ['search', 'platzi'];
    getMoviesBySerach(query);

    infiniteScroll = getPaginatedgMoviesBySearch(query);
}
function trendsPage() {
    console.log('Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}