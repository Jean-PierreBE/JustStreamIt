const CAT3_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&genre=Western&sort_by=-imdb_score';
//const CAT3_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&genre=Adult&sort_by=-imdb_score';
const DETAIL_CAT3_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/';
let allCat3Movies = [];
let Cat3Movies = [];
let CAT3_URL_NEXT = '';

function formatTab(tabdata){
    let linetab = "";

    for (let i = 0; i < tabdata.length; i++) { 
        linetab = linetab + tabdata[i] + " ; ";
    }
    return linetab;
}

function organizeTab3(){
    let singletab = [];
    for (let i = 0; i < 7; i++) { 
        singletab.push(Cat3Movies[i]);
    }
    allCat3Movies.push(singletab);

    for (let j = 0; j < singletab.length; j++) { 
        Cat3Movies = Cat3Movies.filter(value => value !== singletab[j]);
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

function setmodalCat3bestMovies(detailsection,data){
    
    const sectionDetail3 = document.querySelector(detailsection);
    // clean the window
    if ( sectionDetail3.childElementCount !== 0 ){
        sectionDetail3.innerText = ''; 
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
    sectionDetail3.appendChild(titleMovie);
    sectionDetail3.appendChild(imageMovie);
    sectionDetail3.appendChild(genreMovie);
    sectionDetail3.appendChild(dateMovie);
    sectionDetail3.appendChild(ratedMovie);
    sectionDetail3.appendChild(scoreMovie);
    sectionDetail3.appendChild(realisateur);
    sectionDetail3.appendChild(actors);
    sectionDetail3.appendChild(duree);
    sectionDetail3.appendChild(country);
    sectionDetail3.appendChild(resultat);
    sectionDetail3.appendChild(resume);  
}

// fill image and modal windows
 
async function setCat3bestMovies(tabmovies){
    for (let i = 0; i < tabmovies.length; i++) { 
        let detail = await getData(`http://localhost:8000/api/v1/titles/${tabmovies[i]}`);
        document.getElementById("detailCategory3"+i).src = detail.image_url;
        
        setmodalCat3bestMovies(".bestMoviesCat3Detail"+i,detail);
    };    
};

async function fetchCat3bestMovies (urlin){
    let morePagesAvailable = true;
    let beginPage = 1;
    //let url = '';
    while(morePagesAvailable) { 
        if (beginPage == 1) {
            url = urlin;
            beginPage++;       
            };
        let data_cat3_movie = await getData(url);
        //console.log(data_cat3_movie);
        for (let i = 0; i < data_cat3_movie.results.length; i++) { 
            Cat3Movies.push(data_cat3_movie.results[i].id); 
            }  
        
        if (data_cat3_movie.next == null  || Cat3Movies.length >= 7) {
             morePagesAvailable = false;
             CAT3_URL_NEXT = data_cat3_movie.next;
             }
        else
            {url = data_cat3_movie.next;}
        };    
    }
 
async function renderCat3Movies(urlin) {
    //fetch api  
    await  fetchCat3bestMovies(urlin);
    // format page
    organizeTab3();
    let page = 0;
    setCat3bestMovies(allCat3Movies[page]);

    // flèche droite
    let forwardButton3 = document.getElementById("forward-best-movies-cat3");
    forwardButton3.addEventListener("click", async function(){
        console.log("avant");
        console.log(CAT3_URL_NEXT)
    if (CAT3_URL_NEXT == null) {
        alert("Plus de films disponibles");
    }
    else {console.log("Cat3Movies.length : "+Cat3Movies.length)
        page++;
        console.log(page)
        console.log(allCat3Movies.length)
        if (allCat3Movies.length < page + 1){
            if (Cat3Movies.length < 7) {
                //await ensureEnoughCat3MoviesFetched();
                await fetchCat3bestMovies(CAT3_URL_NEXT);
             }
             console.log(Cat3Movies)
             organizeTab3();
        }      
        console.log(allCat3Movies[page])  ;    
        setCat3bestMovies(allCat3Movies[page]); 
        }     
      
    })
    // flèche gauche
    let backwardButton3 = document.getElementById("backward-best-movies-cat3");
    backwardButton3.addEventListener("click", function(){
        console.log("arriere")
      if (page == 0) {
        alert("on est revenu au début");
        return;
      }
      else {
        page--;    
      };      
      setCat3bestMovies(allCat3Movies[page]);
      })

      window.addEventListener("load", event => {
        var image = document.querySelector('img');
        var isLoaded = image.complete && image.naturalHeight !== 0;
        alert(isLoaded);
    });    
  
} 

renderCat3Movies(CAT3_BEST_MOVIE_API_URL);




 
