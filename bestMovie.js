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
  let resume = document.getElementsByClassName("resume")
  let movies = []
  //fetch api
  let data_cat1 = await getData(BEST_MOVIE_API_URL);
  console.log(data_cat1);
  movies.push(...data_cat1.results);
  //Fill libelle + resumé + image
  console.log(movies[0].title)
  document.getElementById("titlebestmovie").innerText = movies[0].title;
  document.getElementById("bestmovie").src = movies[0].image_url;
}

renderBestMovie();
