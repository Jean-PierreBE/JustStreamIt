const MOVIES_API_URL = 'http://localhost:8000/api/v1/titles/?imdb_score=9';
const BEST_MOVIES_API_URL = 'http://localhost:8000/api/v1/titles/?&sort_by=-imdb_score';

async function getData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function setbestMovies(page){
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


document.getElementById("category")
.onchange = function() {
   var url = this.selectedOptions[0].dataset.href;
   if (url && confirm("did you choose " + url + "?")) {
     location.href = url;
     location.target="_blank";
   }
}