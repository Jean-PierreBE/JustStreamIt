const CAT1_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&genre=Animation&sort_by=-imdb_score';
const DETAIL_CAT_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/';
let allCatMovies = [];
let CatMovies = [];
let URL_NEXT = '';

function formatTab(tabdata){
    let linetab = "";

    for (let i = 0; i < tabdata.length; i++) { 
        linetab = linetab + tabdata[i] + " ; ";
    }
    return linetab;
}

function organizeTab(){
    let singletab = [];

    for (let i = 0; i < 7; i++) { 
        singletab.push(CatMovies[i]);
    }
    allCatMovies.push(singletab);

    for (let j = 0; j < singletab.length; j++) { 
        CatMovies = CatMovies.filter(value => value !== singletab[j]);
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
async function setCatbestMovies(tabmovies){
    for (let i = 0; i < tabmovies.length; i++) { 
        let detail = await getData(`http://localhost:8000/api/v1/titles/${tabmovies[i]}`);
        try {
            document.getElementById("detailCategory1"+i).src = detail.image_url;
          }
          catch(err) {
            document.getElementById("detailCategory1"+i).src = 'image-not-found.png';
          }; 
        setmodalCatbestMovies(".bestMoviesCat1Detail"+i,detail);
    };    
};

async function fetchCatbestMovies (urlin){
    let morePagesAvailable = true;
    let beginPage = 1;
    //let url = '';
    while(morePagesAvailable) { 
        if (beginPage == 1) {
            url = urlin;
            beginPage++;       
            };
        let data_cat_movie = await getData(url);
        for (let i = 0; i < data_cat_movie.results.length; i++) { 
            CatMovies.push(data_cat_movie.results[i].id); 
            }  
        
        if (data_cat_movie.next == null  || CatMovies.length >= 7) {
             morePagesAvailable = false;
             URL_NEXT = data_cat_movie.next;
             }
        else
            {url = data_cat_movie.next;}
        };
    }
 
async function renderCatMovies(urlin) {
    //fetch api  
    await  fetchCatbestMovies(urlin);
    // format page
    organizeTab();
    
    let page = 0;
    setCatbestMovies(allCatMovies[page]);

    // flèche droite
    let forwardButton = document.getElementById("forward-best-movies-cat1");
    forwardButton.addEventListener("click", async function(){
    if (URL_NEXT == null) {
        alert("Plus de films disponibles");
    }
    else {console.log("CatMovies.length : "+CatMovies.length)
        if (CatMovies.length < 7) {
           //await ensureEnoughCatmoviesFetched();
           await fetchCatbestMovies(URL_NEXT);
        }
        page++;
        organizeTab();
        console.log("page : "+page)
        console.log(allCatMovies[page])
        setCatbestMovies(allCatMovies[page]);
    }     
      
    })
    // flèche gauche
    let backwardButton = document.getElementById("backward-best-movies-cat1");
    backwardButton.addEventListener("click", function(){
      if (page == 0) {
        alert("on est revenu au début");
        return;
      }
      else {
        page--;    
      };      
      setCatbestMovies(allCatMovies[page]);
      })

  
} 

renderCatMovies(CAT1_BEST_MOVIE_API_URL);




 
