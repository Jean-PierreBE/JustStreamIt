const BEST_MOVIE_API_URL = 'http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score';

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
  const sectionDetail = document.querySelector(".bestMovieDetail");
  // creation and fill balises
  const titleMovie = document.createElement("h2");
  titleMovie.innerText = data_bestMovie.title
  const dateMovie = document.createElement("p");
  dateMovie.innerText = "Date de sortie : " + data_bestMovie.date_published
  //append elements
  sectionDetail.appendChild(titleMovie);
  sectionDetail.appendChild(dateMovie);

}

renderBestMovie();
