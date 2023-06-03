// Data Model
var ideas = [];
var currentIdea;
// var starred = makeFavorite()
// querySelectors
var saveButton = document.querySelector(".save-button");
var titleInput = document.getElementById("input-title");
var bodyInput = document.getElementById("input-body");
var cardGrid = document.querySelector(".card-grid");

// eventListeners
saveButton.addEventListener("click", function(e) {
  makeNewIdea(e);
});
// cardGrid.addEventListener("click", function(e) {
//   deleteMiniCard(e);
// });
// cardGrid.addEventListener('click', function(e) {
//   makeFavorite(e)
// });
cardGrid.addEventListener('click', function (e) {
  if (e.target.classList.contains('white-star')) {
    makeFavorite(e);
  } else if (e.target.classList.contains('orange-star')) {
      UnFavorite(e);
  } else if (e.target.classList.contains('delete-button')) {
    deleteMiniCard(e);
  }
});


saveButton.addEventListener('mouseover', function(){
    if(!saveButton.disabled){
        saveButton.classList.add('hover');
    }
})

saveButton.addEventListener('mouseout', function(){
    saveButton.classList.remove('hover');
})

// functions
function createIdea(title, body) {
  return {
    title: title,
    body: body,
    id: Date.now(),
    isFavorite: false,
    whiteStar: "",
    orangeStar: "hidden"
  };
}

function makeNewIdea(e) {
  e.preventDefault();
  var title = titleInput.value;
  var body = bodyInput.value;

  currentIdea = createIdea(title, body);

  for (var i = 0; i < ideas.length; i++) {
    if (
      currentIdea.title === ideas[i].title ||
      currentIdea.body === ideas[i].body
    ) {
      return;
    }
  }
    ideas.push(currentIdea)
    clearInputs();
    saveButton.disabled = true;
    showCards();  
}

function clearInputs(){
    titleInput.value = '';
    bodyInput.value= '';
}

function checkInput(){
    if(titleInput.value.trim() !== '' && bodyInput.value.trim() !== ''){
        saveButton.disabled = false;
    }
    else{
        saveButton.disabled = true;
    }
}
// var whiteStar 
var orangeStar 

function showCards() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
    // orangeStar = ideas[i].isFavorite
    // whiteStar = !ideas[i].isFavorite
    // console.log(orangeStar)
  //   if (ideas[i].isFavorite = true) {
  //     orangeStar = '';
  //   } else {
  //     orangeStar = 'hidden'
  //   }
    cardGrid.innerHTML += `
        <article class="mini-card" id="${ideas[i].id}">
            <header class="mini-card-header">
              <button class="orange-star ${ideas[i].orangeStar} "></button> 
              <button class="white-star ${ideas[i].whiteStar}"></button>
              <button class="delete-button"></button>
            </header>
            <h2> ${ideas[i].title} </h2>
            <p> ${ideas[i].body}</p>
        </article>`;
  }
}

{/* <button class="white-star ${ideas[i].whiteStar}"></button>  */}
// for (var i = 0; i < ideas.length; i++) {
//   for (var j = 0; j < cardGrid.children[0].children[0].children.length; j++) {
//     if (cardGrid.children[0].children[0].children[j].classList.contains('orange-star')) {
//       ideas[i].isFavorite = true
//     }
//     if (cardGrid.children[0].children[0].children[j].classList.contains('white-star')) {
//       ideas[i].isFavorite = false
//     }
//   }
// var whiteStar = !ideas[i].isFavorite;
// var orangeStar = ideas[i].isFavorite;
{/* <button class="orange-star hidden ${orangeStar}"></button> 
<button class="white-star ${orangeStar}""></button> */}

function deleteMiniCard(e) {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(e.target.parentElement.parentElement.id) === ideas[i].id) {
      console.log(e.target)
      ideas.splice(i, 1);
      showCards()
      //return
    }
  }
   
}

// parseInt(e.target.closest('article').id)
// e.target.classList.contains('delete-button')

function toggleClass(element, className) {
  element.classList.toggle(className)
}


function makeFavorite(e) {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(e.target.closest('.mini-card').id) === ideas[i].id) {
      ideas[i].isFavorite = true;
      ideas[i].whiteStar = "hidden"
      ideas[i].orangeStar = ""
      toggleClass(e.target, 'hidden');
      toggleClass(e.target.parentElement.firstElementChild, 'hidden');
    }
  }
  //showCards()
}

function UnFavorite(e) {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(e.target.closest('.mini-card').id) === ideas[i].id) {
      console.log(e.target)
      ideas[i].isFavorite = false;
      ideas[i].orangeStar = "hidden";
      ideas[i].whiteStar = ""
      toggleClass(e.target, 'hidden');
      toggleClass(e.target.parentElement.children[1], 'hidden');
    }
  }
  //showCards()
}