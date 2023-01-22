// Constant URL value for API
const TITLES_API_URL = 'http://localhost:8000/api/v1/titles/';
const GENRES_API_URL = 'http://localhost:8000/api/v1/genres/';

// Defining async function
async function getapi(url) {    
    // Storing response
    const response = await fetch(url);    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    }
function comboBox(){
    // Storing response
    const response = await fetch(url);    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    var comboList = document.createElement('datalist');
    
    console.log(data.length)
    comboList.id = "category_list";
    for (let i = 0; i < data.length; i++) {
            option.innerHTML = data[i].name;
            option.value = data[i].name;
            comboList.appendChild(option);  
        }


    //comboValues.forEach(comboValues =>{
       //                 var option = document.createElement('option');
       //                 option.innerHTML = comboValues;
        //                option.value = comboValues;
        //                comboList.appendChild(option);
    //})
    document.body.appendChild(comboList);
   }
// Calling that async function
//getapi(GENRES_API_URL);

// fill array with categories

// fill combobox 
comboBox();
