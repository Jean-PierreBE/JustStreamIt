const GENRES_API_URL = 'http://localhost:8000/api/v1/genres/';


async function getCategories() {
    let url = GENRES_API_URL;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function fetchMetaData() {
    let allData = [];
    let morePagesAvailable = true;
    let currentPage = 0;
    const total_pages = 5;
  
    while(morePagesAvailable) {
      currentPage++;
      console.log(currentPage);
      if (currentPage == 1) {
            console.log("currentPage == 1");
            let res = await fetch(`http://localhost:8000/api/v1/genres/`);
        }        
      else 
        {let res = await fetch(`http://localhost:8000/api/v1/genres/?page=${currentPage}`)};        
      let data = await response.json();
      data.forEach(e => allData.unshift(e));
      morePagesAvailable = currentPage < total_pages;
    }
  
    return allData;
  }

  async function fetchMetaData1() {
    let allData = [];
    let morePagesAvailable = true;
    let currentPage = 1;
    const total_pages = 5;
  
    while(morePagesAvailable) {
      currentPage++;
      console.log(currentPage);
      let response = await fetch(`http://localhost:8000/api/v1/genres/?page=${currentPage}`);        
      let data = await response.json();
      data.forEach(e => allData.unshift(e));
      morePagesAvailable = currentPage < total_pages;
    }
  
    return allData;
  }

async function renderCategories() {
    //let data_cat = await getCategories();
    let data_cat = fetchMetaData()
    console.log(data_cat);
    var comboList = document.createElement('datalist');

    comboList.id = "category_list";
    for (let i = 0; i < data_cat.results.length; i++) { 
            var option = document.createElement('option');
            option.innerHTML = data_cat.results[i].name;
            option.value = data_cat.results[i].name;
            comboList.appendChild(option);  
        }
    document.body.appendChild(comboList);
}

renderCategories();


