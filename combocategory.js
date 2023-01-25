//import { getData } from "./moduleJs/modules.js";
import {dishello} from "./modules.js";
const GENRES_API_URL = 'http://localhost:8000/api/v1/genres/';
dishello()
async function renderCategories() {
  let morePagesAvailable = true;
  let beginPage = 1
  let categories = []
  //fetch api
  while(morePagesAvailable) { 
    if (beginPage == 1) {
        url = `${GENRES_API_URL}?page=${beginPage}`;
        beginPage++;
        }
    let data_cat = await getData(url);
    categories.push(...data_cat.results);
    if (data_cat.next == null)
        {morePagesAvailable = false;}
    else
        {url = data_cat.next;}
  }  
  //Fill combobox
  var comboList = document.createElement('datalist');
  comboList.id = "category_list";  
  for (let i = 0; i < categories.length; i++) { 
          var option = document.createElement('option');
          option.innerHTML = categories[i].name;
          option.addEventListener("click", function(){
            alert("option not available for instance");
        });
          //option.value = categories[i].name;
          comboList.appendChild(option);  
      }
  document.body.appendChild(comboList);
    
}

renderCategories();