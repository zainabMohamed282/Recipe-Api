getRecipe("Pizza")
var recipes = [];
var links = document.getElementsByClassName('dropdown-item');
for(var i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        var currentMeal = e.target.innerHTML;
        getRecipe(currentMeal)
    })
}

function getRecipe(meal){
var httpRequest =new XMLHttpRequest();
httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
httpRequest.send();
httpRequest.addEventListener("readystatechange",function(){
    if(httpRequest.readyState == 4 && httpRequest.status==200){
        recipes = JSON.parse(httpRequest.response).recipes;
        displayRecipes()

    }
 })
}

 function displayRecipes(){
    var recipe =``;
    for(var i=0;i<recipes.length;i++){
      
      recipe +=  `
      <div class="col-md-4 col-lg-4 col-sm-6 my-3 position-relative">
      <img src="${recipes[i].image_url}" class="w-100 my-3 recipeImg" >
      <a href="${recipes[i].source_url}" target='_blank' class='recipe-link text-decoration-none'>
        Source
      </a>
      <h5>${recipes[i].title}</h5>
      <button class="btn btn-info">
      <a href="details.html?rId=${recipes[i].recipe_id}" class="text-light text-decoration-none">Details</a>
      </button>
    </div> 

        `
    }
    document.getElementById("postsRow").innerHTML=recipe;
 }

//  if(validateName()){
//     swal("Good!", "You Message is sent!", "success");
//  }
//validation
var theName = document.getElementById('name');
var theEmail = document.getElementById('email');
var message =document.getElementById('message');
var nameValid =document.getElementById('name-valid');
var emailValid =document.getElementById('email-valid');
var msgValid =document.getElementById('msg-valid');
var sendBtn =document.getElementById('sendBtn');


function validateName(){
    var nameRejex = /^[A-Z][ a-z]{3,20}$/;
     if(!nameRejex.test(theName.value)){
        sendBtn.disabled='true';
        nameValid.innerHTML='First letter is Capital and a number of letters in range[3-20]'
        return false;
    }else{
        sendBtn.removeAttribute('disabled');
        nameValid.innerHTML="";
        return true;
      }
}
theName.onkeyup=function(){
    validateName()
}

function validateMail(){
    var mailRejex = /^\S+@\S+\.\S+$/;
     if(!mailRejex.test(theEmail.value)){
        sendBtn.disabled='true';
        emailValid.innerHTML='The Mail Must Include @ and . '
        return false;
    }else{
        sendBtn.removeAttribute('disabled');
        emailValid.innerHTML="";
        return true;
      }
}
theEmail.onkeyup=function(){
    validateMail()
}

function validateMsg(){
    var msgRejex = /^[A-za-z0-9 ]{3,100}$/;
     if(!msgRejex.test(message.value)){
        sendBtn.disabled='true';
        msgValid.innerHTML="The Text can't be Less than 3 letters"
        return false;
    }else{
        sendBtn.removeAttribute('disabled');
        msgValid.innerHTML="";
        return true;
      }
  
}
message.onkeyup=function(){
    validateMsg()
}

sendBtn.onclick=function(){
if(validateName()&&validateMail()&&validateMsg()){
         theName.value="";
         theEmail.value="";
         message.value="";
         document.getElementById('subject').value="";
         swal("Good!", "Your Message is sent!", "success");
     }
}
