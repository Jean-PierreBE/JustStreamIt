const GENRES_API_URL = 'http://localhost:8000/api/v1/genres/';


async function getCategories(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCategories() {
  const total_pages = 5;
  var comboList = document.createElement('datalist');
  comboList.id = "category_list";
  for (let currentPage = 1; currentPage <= total_pages; currentPage++) { 
    url = `${GENRES_API_URL}?page=${currentPage}`;
    let data_cat = await getCategories(url);
    
    for (let i = 0; i < data_cat.results.length; i++) { 
            var option = document.createElement('option');
            option.innerHTML = data_cat.results[i].name;
            option.value = data_cat.results[i].name;
            comboList.appendChild(option);  
        }
    document.body.appendChild(comboList);
  }
}

async function renderCategories1() {
  let morePagesAvailable = true;
  let beginPage = 1
  var comboList = document.createElement('datalist');
  comboList.id = "category_list";
  while(morePagesAvailable) { 
    if (beginPage == 1)
        {url = `${GENRES_API_URL}?page=${beginPage}`;
        beginPage++;}
    let data_cat = await getCategories(url);
    
    for (let i = 0; i < data_cat.results.length; i++) { 
            var option = document.createElement('option');
            option.innerHTML = data_cat.results[i].name;
            option.value = data_cat.results[i].name;
            comboList.appendChild(option);  
        }
    document.body.appendChild(comboList);
    if (data_cat.next == null)
        {morePagesAvailable = false;}
    else
        {url = data_cat.next;}
  }

}

renderCategories1();