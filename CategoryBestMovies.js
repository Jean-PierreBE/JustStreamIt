const CAT_BEST_MOVIE_API_URL = [['Films les mieux notés','http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score'],
                                ['Animation','http://localhost:8000/api/v1/titles/?&genre=Animation&sort_by=-imdb_score'],
                                ['Série noire','http://localhost:8000/api/v1/titles/?&genre=Film-noir&sort_by=-imdb_score'],
                                ['Western','http://localhost:8000/api/v1/titles/?&genre=Western&sort_by=-imdb_score']];
const CAT_BEST_MOVIE_API_URL1 = [['Films les mieux notés','http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score'],
                                ['Animation','http://localhost:8000/api/v1/titles/?&genre=Animation&sort_by=-imdb_score&country=France&country_contains=USA&imdb_score_min=7'],
                                ['Série noire','http://localhost:8000/api/v1/titles/?&genre=Film-noir&sort_by=-imdb_score'],
                                ['Adulte','http://localhost:8000/api/v1/titles/?&genre=Adult&sort_by=-imdb_score']];                                
const DETAIL_CAT_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/';
const INFO_NOT_AVAILABLE = 'Information non disponible';
const MAX_MOVIES = 7;
let page = [0,0,0,0];
let page_max = [0,0,0,0];
let allCatMovies = [[],[],[],[]];
let CatMovies = [[],[],[],[]];
let CAT_URL_NEXT = ["","","",""];


let BEST_MOVIE_ID;

function formatTab(tabdata){
    let linetab = "";

    for (let i = 0; i < tabdata.length; i++) { 
        linetab = linetab + tabdata[i] + " ; ";
    }
    return linetab;
}

function organizeTab(ind){
    let singletab = [];
    let borne_tab = 0; 
    if (CatMovies[ind].length < MAX_MOVIES){
        borne_tab = CatMovies[ind].length;
    }
    else{
        borne_tab = MAX_MOVIES;
    }
    for (let i = 0; i < borne_tab; i++) { 
        singletab.push(CatMovies[ind][i]);
    }
    allCatMovies[ind].push(singletab);

    for (let j = 0; j < singletab.length; j++) { 
        CatMovies[ind] = CatMovies[ind].filter(value => value !== singletab[j]);
    }
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


function setmodalCatbestMovies(detailsection,data){
    let sectionDetail = document.querySelector(detailsection);
    // clean the window
    if ( sectionDetail.childElementCount !== 0 ){
        sectionDetail.innerText = ''; 
    }   
    // creation balises
    let titleMovie = document.createElement("h2");
    let imageMovie = document.createElement("img"); 
    let genreMovie = document.createElement("p");  
    let dateMovie = document.createElement("p");
    let ratedMovie = document.createElement("p"); 
    let scoreMovie = document.createElement("p");
    let realisateur = document.createElement("p"); 
    let actors = document.createElement("p");
    let duree = document.createElement("p");
    let country = document.createElement("p"); 
    let resultat = document.createElement("p");
    let resume = document.createElement("p");   
    // fill balises
    let info = "";    
    titleMovie.innerText = data.title;
    imageMovie.src = data.image_url;
    genreMovie.innerText = "genre : " + formatTab(data.genres); 
    dateMovie.innerText = "Date de sortie : " + data.date_published;
    ratedMovie.innerText = "Rate : " + data.avg_vote; 
    scoreMovie.innerText = "Score imdb : " + data.imdb_score;
    realisateur.innerText = "réalisateurs : " + formatTab(data.directors);
    actors.innerText = "acteurs : " + formatTab(data.actors);
    duree.innerText = "Durée : " + data.duration + " minutes";
    //pays
    country.innerText = "pays : " + formatTab(data.countries);
    //box office
    if (data.worldwide_gross_income == null){
        info = INFO_NOT_AVAILABLE;
    }
    else {
        info = data.worldwide_gross_income;
    }
    resultat.innerText = "Résultats box office : " + info;
    // résumé
    if (data.long_description == null){
        info = INFO_NOT_AVAILABLE;
    }
    else {
        info = data.long_description;
    }
    resume.innerText = "Résumé : " + info;

    //append elements
    sectionDetail.appendChild(titleMovie);
    sectionDetail.appendChild(imageMovie);
    sectionDetail.appendChild(genreMovie);
    sectionDetail.appendChild(dateMovie);
    sectionDetail.appendChild(ratedMovie);
    sectionDetail.appendChild(scoreMovie);
    sectionDetail.appendChild(realisateur);
    sectionDetail.appendChild(actors);
    sectionDetail.appendChild(duree);
    sectionDetail.appendChild(country);
    sectionDetail.appendChild(resultat);
    sectionDetail.appendChild(resume);
}

// fill image and modal windows
 
async function setCatbestMovies(tabmovies,ind){
    // fill title
    document.getElementById("titlecategory"+ind).innerText = CAT_BEST_MOVIE_API_URL[ind][0];
    //fill modal windows
    for (let i = 0; i < tabmovies.length; i++) { 
        let detail = await getData(DETAIL_CAT_MOVIE_API_URL+tabmovies[i]);
        document.getElementById("detailCategory"+ind+i).src = detail.image_url;
        document.getElementById("detailCategory"+ind+i).title = detail.title;
        setmodalCatbestMovies(".bestMoviesCat"+ind+"Detail"+i,detail);
    };        
};

async function ReinitCatbestMovies(posdeb,ind){
    for (let i = posdeb; i < MAX_MOVIES; i++) { 
        document.getElementById("detailCategory"+ind+i).src = "image-blank.png";
        document.getElementById("detailCategory"+ind+i).title = "";
        let sectionDetail = document.querySelector(".bestMoviesCat"+ind+"Detail"+i);
        // clean the window
        if ( sectionDetail.childElementCount !== 0 ){
            sectionDetail.innerText = ''; 
        }
        };    
};

async function renderBestMovie() {
    // feth again to have the detail of movie
    let data_bestMovie = await getData(BEST_MOVIE_ID);
    //Fill libelle + resumé + image
    document.getElementById("titlebestmovie").innerText = data_bestMovie.title;
    document.getElementById("bestmovie").src = data_bestMovie.image_url;
    document.getElementById("bestmovie").title = data_bestMovie.title;
    document.getElementById("resume").innerText = data_bestMovie.description;
    // fill modal screen
    setmodalCatbestMovies(".bestMovieDetail",data_bestMovie)
  }

async function fetchCatbestMovies (urlin,ind,first){
    let morePagesAvailable = true;
    let beginPage = 1;
    //let url = '';
    while(morePagesAvailable) { 
        if (beginPage == 1) {
            url = urlin;      
            };        
        let data_cat_movie = await getData(url);
        for (let i = 0; i < data_cat_movie.results.length; i++) {
            if (beginPage == 1 && i == 0 && ind == 0 && first == 'Y')  {
                BEST_MOVIE_ID = data_cat_movie.results[i].url;
                // fill best movie
                renderBestMovie();                
            } 
            else {
                CatMovies[ind].push(data_cat_movie.results[i].id);       
            }
            beginPage++;
            }
        if (data_cat_movie.next == null  || CatMovies[ind].length >= 7) {
             morePagesAvailable = false;
             CAT_URL_NEXT[ind] = data_cat_movie.next;
             }
        else
            {url = data_cat_movie.next;}
        };
    }
 
async function renderCatMovies(urlin, icat) {
    //fetch api 
    let first = 'Y'; 
    await  fetchCatbestMovies(urlin,icat,first);
    // format page
    organizeTab(icat);
    page[icat] = 0;
    
    setCatbestMovies(allCatMovies[icat][page[icat]],icat);
    first = 'N';
    // flèche droite
    let forwardButton = document.getElementById("forward-best-movies-cat"+icat);
    forwardButton.addEventListener("click", async function(){
    if (CAT_URL_NEXT[icat] == null && page[icat] == page_max[icat]) {
        alert("Plus de films disponibles");
    }
    else {
        page[icat]++;
        if (allCatMovies[icat].length < page[icat] + 1){
            if (CatMovies[icat].length < 7) {
                await fetchCatbestMovies(CAT_URL_NEXT[icat],icat,first);
                if (CAT_URL_NEXT[icat] == null){
                    page_max[icat] = page[icat];
                }
                }
                organizeTab(icat);
        }         
        setCatbestMovies(allCatMovies[icat][page[icat]],icat);
        //purge old movies
        if (allCatMovies[icat][page[icat]].length < MAX_MOVIES){
            let pos = allCatMovies[icat][page[icat]].length;
            ReinitCatbestMovies(pos,icat);
        }
        } 
    })
    // flèche gauche
    let backwardButton = document.getElementById("backward-best-movies-cat"+icat);
    backwardButton.addEventListener("click", function(){
      if (page[icat] == 0) {
        alert("on est revenu au début");
        return;
      }
      else {
        page[icat]--;
      };   
      setCatbestMovies(allCatMovies[icat][page[icat]],icat);
      })  
} 

for (let icat = 0; icat < CAT_BEST_MOVIE_API_URL.length; icat++) { 
    renderCatMovies(CAT_BEST_MOVIE_API_URL[icat][1],icat); 
    }
