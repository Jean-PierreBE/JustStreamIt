const ALL_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score';
const MAX_NUMBER_PAGES = 70
async function getData(url) {
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
async function renderMovies() {
  let morePagesAvailable = true;
  let beginPage1 = 1
  let pageMovie = []
  let allMovies = []
  //fetch api
  while(morePagesAvailable) { 
    if (beginPage1 == 1) {
        url = ALL_BEST_MOVIE_API_URL;        
        }
    let data_cat2 = await getData(url);
    for (let i = 0; i < data_cat2.results.length; i++) { 
        if (pageMovie.length == 7 ) {
            //allMovies.push(...pageMovie);
            allMovies.push(pageMovie);
            pageMovie = []
            pageMovie.push(data_cat2.results[i].id);
        }
        else {
            if (beginPage1 == 1 && i == 0) {
                beginPage1++;
            }
            else {
                pageMovie.push(data_cat2.results[i].id); 
            }            
        }
    }    
    if (data_cat2.next == null  || allMovies.length == MAX_NUMBER_PAGES)
        {morePagesAvailable = false;}
    else
        {url = data_cat2.next;}
  } 
} 

function setbestMovies(page){
    let bestMovies = document.getElementsByClassName("bestmovies");
    //console.log(bestMovies)
    let result = await getData(BEST_MOVIES_API_URL);
    //console.log(result);
    let moviesData = result.results;
    //console.log(moviesData);
    [...bestMovies].forEach(function(image , index) {    
        //console.log(moviesData[index]);
        image.src = moviesData[index].image_url;
    });
};

setbestMovies(0);

let page = 0;

let forwardButton = document.getElementById("forward-best-movies");
forwardButton.addEventListener("click", function(){
    alert("coucou");
    page++;
    setbestMovies(page);
})
  
renderMovies();
