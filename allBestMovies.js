const ALL_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score';
const MAX_NUMBER_PAGES = 1
const DETAIL_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/';
let allMovies = []
let biggestPage = 0

function formatTab(tabdata){
    let linetab = "";

    for (let i = 0; i < tabdata.length; i++) { 
        linetab = linetab + tabdata[i] + " ; ";
    }
    return linetab;
}

// fetch api
async function getData(url) {
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

function setmodalbestMovies(detailsection,data){
    
    const sectionDetail1 = document.querySelector(detailsection);
    // clean the window
    if ( sectionDetail1.childElementCount !== 0 ){
        sectionDetail1.innerText = ''; 
    }   
    // creation balises
    const titleMovie = document.createElement("h2");
    const imageMovie = document.createElement("img"); 
    const genreMovie = document.createElement("p");  
    const dateMovie = document.createElement("p");
    const ratedMovie = document.createElement("p"); 
    const scoreMovie = document.createElement("p");
    const realisateur = document.createElement("p"); 
    const actors = document.createElement("p");
    const duree = document.createElement("p");
    const country = document.createElement("p"); 
    const resultat = document.createElement("p");
    const resume = document.createElement("p");   
    // fill balises    
    titleMovie.innerText = data.title;
    imageMovie.src = data.image_url;
    genreMovie.innerText = "genre : " + formatTab(data.genres); 
    dateMovie.innerText = "Date de sortie : " + data.date_published;
    ratedMovie.innerText = "Rate : " + data.avg_vote; 
    scoreMovie.innerText = "Score imdb : " + data.imdb_score;
    realisateur.innerText = "réalisateurs : " + formatTab(data.directors);
    actors.innerText = "acteurs : " + formatTab(data.actors);
    duree.innerText = "Durée : " + data.duration + " minutes";
    country.innerText = "pays : " + formatTab(data.countries); 
    resultat.innerText = "note des critiques : " + data.reviews_from_critics;
    resume.innerText = data.long_description;

    //append elements
    sectionDetail1.appendChild(titleMovie);
    sectionDetail1.appendChild(imageMovie);
    sectionDetail1.appendChild(genreMovie);
    sectionDetail1.appendChild(dateMovie);
    sectionDetail1.appendChild(ratedMovie);
    sectionDetail1.appendChild(scoreMovie);
    sectionDetail1.appendChild(realisateur);
    sectionDetail1.appendChild(actors);
    sectionDetail1.appendChild(duree);
    sectionDetail1.appendChild(country);
    sectionDetail1.appendChild(resultat);
    sectionDetail1.appendChild(resume);  
}

// fill image and modal windows
async function setbestMovies(page,tabmovies){
    let bestMovies = document.getElementsByClassName("bestmovies");
    [...bestMovies].forEach(async function(image , index) {    
        //console.log("index : " + index)
        //console.log("tabmovies[index] : " + tabmovies[index])
        let detail = await getData(`http://localhost:8000/api/v1/titles/${tabmovies[index]}`);
        //console.log(detail.image_url);
        image.src = detail.image_url;
        setmodalbestMovies(".bestMoviesDetail"+index,detail)
    });
};

async function fetchbestMovies (maxpage){
    let morePagesAvailable = true;
    let beginPage1 = 1
    let pageMovie = []
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
        if (data_cat2.next == null  || allMovies.length == maxpage)
            {morePagesAvailable = false;}
        else
            {url = data_cat2.next;}
      } 
}

async function ensureEnoughMoviesFetched (maxpage){
    let morePagesAvailable = true;
    let beginPage1 = 1;
    let pageMovie = [];
    let totalApiPages = Math.ceil(maxpage * 7 / 5);
    allMovies = [];
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
        if (data_cat2.next == null  || allMovies.length == totalApiPages)
            {morePagesAvailable = false;}
        else
            {url = data_cat2.next;}
      } 
}

async function renderMovies() {  
    await  fetchbestMovies(MAX_NUMBER_PAGES);
  //fetch api
  //await ensureEnoughMoviesFetched(MAX_NUMBER_PAGES);

  //console.log(allMovies[0]);
  let page = 0;

  setbestMovies(page,allMovies[page]);
  // flèche droite
  let forwardButton = document.getElementById("forward-best-movies");
  forwardButton.addEventListener("click", async function(){
    if (page == biggestPage) {
        //page = 0;
        biggestPage++;
        await ensureEnoughMoviesFetched(biggestPage);
      }
      else {
        page++;    
      };    
    setbestMovies(page,allMovies[page]);
    })
  // flèche gauche
  let backwardButton = document.getElementById("backward-best-movies");
  backwardButton.addEventListener("click", function(){
      if (page == 0) {
        alert("on est revenu au début");
        return;
      }
      else {
        page--;    
      };      
      setbestMovies(page,allMovies[page]);
      })
} 

renderMovies();




 
