const CAT_BEST_MOVIE_API_URL = ['http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score',
                                'http://localhost:8000/api/v1/titles/?&genre=Animation&sort_by=-imdb_score',
                                'http://localhost:8000/api/v1/titles/?&genre=Film-noir&sort_by=-imdb_score',
                                'http://localhost:8000/api/v1/titles/?&genre=Western&sort_by=-imdb_score'];
const DETAIL_CAT_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/';
let page = [0,0,0,0];
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
    //for (let i = 0; i < CatMovies[ind].length; i++) { 
    for (let i = 0; i < 7; i++) { 
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


function setmodalCatbestMovies(detailsection,data,ind){
    let sectionDetail1 = document.querySelector(detailsection);
    // clean the window
    if ( sectionDetail1.childElementCount !== 0 ){
        sectionDetail1.innerText = ''; 
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
 
async function setCatbestMovies(tabmovies,ind){
    for (let i = 0; i < tabmovies.length; i++) { 
        let detail = await getData(`http://localhost:8000/api/v1/titles/${tabmovies[i]}`);
        document.getElementById("detailCategory"+ind+i).src = detail.image_url;
        document.getElementById("detailCategory"+ind+i).title = detail.title;
        setmodalCatbestMovies(".bestMoviesCat"+ind+"Detail"+i,detail);
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
        //console.log(data_cat3_movie);
        for (let i = 0; i < data_cat_movie.results.length; i++) {
            if (beginPage == 1 && i == 0 && ind == 0 && first == 'Y')  {
                BEST_MOVIE_ID = data_cat_movie.results[i].url;
                renderBestMovie();
                beginPage++;
            } 
            else {
                CatMovies[ind].push(data_cat_movie.results[i].id);       
            }
            
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
    console.log(CatMovies[2]);
    organizeTab(icat);
    page[icat] = 0;
    
    setCatbestMovies(allCatMovies[icat][page[icat]],icat);
    console.log(allCatMovies[2][page[icat]]);
    first = 'N';

    // flèche droite
    let forwardButton = document.getElementById("forward-best-movies-cat"+icat);
    forwardButton.addEventListener("click", async function(){
    if (CAT_URL_NEXT[icat] == null) {
        alert("Plus de films disponibles");
    }
    else {
        page[icat]++;
        if (allCatMovies[icat].length < page[icat] + 1){
            if (CatMovies[icat].length < 7) {
                //await ensureEnoughCat3MoviesFetched();
                await fetchCatbestMovies(CAT_URL_NEXT[icat],icat,first);
             }
             organizeTab(icat);
        } 
        setCatbestMovies(allCatMovies[icat][page[icat]],icat); 
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
      console.log(allCatMovies[icat][page[icat]]);
      setCatbestMovies(allCatMovies[icat][page[icat]],icat);
      })  
} 

//for (let icat = 0; icat < CAT_BEST_MOVIE_API_URL.length; icat++) { 
for (let icat = 0; icat < 4; icat++) { 
    renderCatMovies(CAT_BEST_MOVIE_API_URL[icat],icat); 
    }
