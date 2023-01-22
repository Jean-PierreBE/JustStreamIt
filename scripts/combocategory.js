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

async function renderCategories() {
    let data_cat = await getCategories();
    console.log(data_cat);
    var comboList = document.createElement('datalist');
    for (let i = 0; i < data_cat.length; i++) {
        console.log(data_cat[i]);
      }

    comboList.id = "category_list";
    //console.log(data_cat.length);
    for (let i = 0; i < data_cat.length; i++) {       
            option.innerHTML = data_cat[i].name;
            option.value = data_cat[i].name;
            comboList.appendChild(option);  
        }
    document.body.appendChild(comboList);
}

//renderCategories();
fetch(GENRES_API_URL, { method: 'GET' })
  .then(response => {return response.json();})
  .then((data) => { console.log(data);});

  console.log(data_cat);
  var comboList = document.createElement('datalist');  
  comboList.id = "category_list";
  
  for (let i = 0; i < data_cat.length; i++) {       
          option.innerHTML = data_cat[i].name;
          option.value = data_cat[i].name;
          comboList.appendChild(option);  
      }
  document.body.appendChild(comboList);

