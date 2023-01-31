const BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score';


function setmodalbestMovie(detailsection,data){
    
  const sectionDetail = document.querySelector(detailsection);
  // clean the window
  if ( sectionDetail.childElementCount !== 0 ){
      sectionDetail.innerText = ''; 
  }   
  // creation balises
  const titleMovie = document.createElement("h2");
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
  sectionDetail.appendChild(titleMovie);
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

async function getData(url) {
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}
async function renderBestMovie() {
  //fetch api
  let list_bestMovie = await getData(BEST_MOVIE_API_URL);
  // feth again to have the detail of movie
  let data_bestMovie = await getData(list_bestMovie.results[0].url);
  //Fill libelle + resumé + image
  document.getElementById("titlebestmovie").innerText = data_bestMovie.title;
  document.getElementById("bestmovie").src = data_bestMovie.image_url;
  document.getElementById("resume").innerText = data_bestMovie.description;
  // fill dialog box
  setmodalbestMovie(".bestMovieDetail",data_bestMovie)

  //const sectionDetail = document.querySelector(".bestMovieDetail");
  // creation and fill balises
  //const titleMovie = document.createElement("h2");
  //titleMovie.innerText = data_bestMovie.title
  //const dateMovie = document.createElement("p");
  //dateMovie.innerText = "Date de sortie : " + data_bestMovie.date_published
  //append elements
  //sectionDetail.appendChild(titleMovie);
  //sectionDetail.appendChild(dateMovie);

}

renderBestMovie();
