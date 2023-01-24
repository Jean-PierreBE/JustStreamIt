const TITLES_API_URL = 'http://localhost:8000/api/v1/titles/?imdb_score=9';


async function getCategories(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCategories() {
  console.log("renderCategories");
  let morePagesAvailable = true;
  let beginPage = 1
  let categories = []
  //fetch api
  while(morePagesAvailable) { 
    if (beginPage == 1)
        {url = `${TITLES_API_URL}`;
        beginPage++;}
    let data_cat = await getCategories(url);    
    categories.push(...data_cat.results);
    console.log(categories)
    if (data_cat.next == null)
        {morePagesAvailable = false;}
    else
        {url = data_cat.next;}
  }  
  console.log(categories[5]);
  console.log("renderCategories end");
}

renderCategories();