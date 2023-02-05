const CAT2_BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&genre=Film-noir&sort_by=-imdb_score';
const DETAIL_CAT2_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/';
let allCat2Movies = [];
let Cat2Movies = [];
let CAT2_URL_NEXT = '';

function formatTab(tabdata){
    let linetab = "";

    for (let i = 0; i < tabdata.length; i++) { 
        linetab = linetab + tabdata[i] + " ; ";
    }
    return linetab;
}

function organizeTab2(){
    let singletab = [];

    for (let i = 0; i < 7; i++) { 
        singletab.push(Cat2Movies[i]);
    }
    allCat2Movies.push(singletab);

    for (let j = 0; j < singletab.length; j++) { 
        Cat2Movies = Cat2Movies.filter(value => value !== singletab[j]);
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

function setmodalCat2bestMovies(detailsection,data){
    const sectionDetail2 = document.querySelector(detailsection);
    // clean the window
    if ( sectionDetail2.childElementCount !== 0 ){
        sectionDetail2.innerText = ''; 
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
    sectionDetail2.appendChild(titleMovie);
    sectionDetail2.appendChild(imageMovie);
    sectionDetail2.appendChild(genreMovie);
    sectionDetail2.appendChild(dateMovie);
    sectionDetail2.appendChild(ratedMovie);
    sectionDetail2.appendChild(scoreMovie);
    sectionDetail2.appendChild(realisateur);
    sectionDetail2.appendChild(actors);
    sectionDetail2.appendChild(duree);
    sectionDetail2.appendChild(country);
    sectionDetail2.appendChild(resultat);
    sectionDetail2.appendChild(resume);  
}

// fill image and modal windows
 
async function setCat2bestMovies(tabmovies){
    for (let i = 0; i < tabmovies.length; i++) { 
        let detail = await getData(`http://localhost:8000/api/v1/titles/${tabmovies[i]}`);
        document.getElementById("detailCategory2"+i).src = detail.image_url;
        
        setmodalCat2bestMovies(".bestMoviesCat2Detail"+i,detail);
        document.getElementById("detailCategory2"+i).title = detail.title;
    };    
};

async function fetchCat2bestMovies (urlin){
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
            Cat2Movies.push(data_cat_movie.results[i].id); 
            }  
        
        if (data_cat_movie.next == null  || Cat2Movies.length >= 7) {
             morePagesAvailable = false;
             CAT2_URL_NEXT = data_cat_movie.next;
             }
        else
            {url = data_cat_movie.next;}
        };
    }
 
async function rendercat2Movies(urlin) {
    //fetch api  
    await  fetchCat2bestMovies(urlin);
    // format page
    organizeTab2();
    
    let page = 0;
    setCat2bestMovies(allCat2Movies[page]);

    // flèche droite
    let forwardButton = document.getElementById("forward-best-movies-cat2");
    forwardButton.addEventListener("click", async function(){
    if (CAT2_URL_NEXT == null) {
        alert("Plus de films disponibles");
    }
    else {console.log("CAT2Movies.length : "+Cat2Movies.length)
        page++;
        if (allCat2Movies.length < page + 1){
            if (Cat2Movies.length < 7) {
                //await ensureEnoughCAT2MoviesFetched();
                await fetchCat2bestMovies(CAT2_URL_NEXT);
             }
             organizeTab2();
             //console.log("page : "+page)
             //console.log(allCAT2Movies[page])
        }            
        setCat2bestMovies(allCat2Movies[page]);     }     
      
    })
    // flèche gauche
    let backwardButton = document.getElementById("backward-best-movies-cat2");
    backwardButton.addEventListener("click", function(){
      if (page == 0) {
        alert("on est revenu au début");
        return;
      }
      else {
        page--;    
      };      
      setCat2bestMovies(allCat2Movies[page]);
      })

      window.addEventListener("load", event => {
        var image = document.querySelector('img');
        var isLoaded = image.complete && image.naturalHeight !== 0;
        alert(isLoaded);
    });    
  
} 

rendercat2Movies(CAT2_BEST_MOVIE_API_URL);




 
