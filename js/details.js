
var param = new URLSearchParams(location.search);
var recipeId = param.get('rId');
var recipeDetails={};
var recipeImg = document.getElementById('recipeImg');
var srcBtn = document.getElementById('srcBtn');
var ingredientsArray =[];

function getDetails(){
    var httpRequest =new XMLHttpRequest();
    httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
    httpRequest.send();
    httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState == 4 && httpRequest.status==200){
        recipeDetails = JSON.parse(httpRequest.response).recipe;
        recipeImg.src = recipeDetails.image_url;
        ingredientsArray = recipeDetails.ingredients;
        srcBtn.href=recipeDetails.source_url;
         displayIngredients();
        
    }
})
}
getDetails();
function displayIngredients(){
     var ingredients=``;
    for(var i =0;i<ingredientsArray.length;i++){
        ingredients+=`
        <li> ${ingredientsArray[i]}</li>
        `
    }
    document.getElementById('recipeList').innerHTML=ingredients;
}