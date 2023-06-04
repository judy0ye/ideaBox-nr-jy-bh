// Data Model
var ideas = [];
var currentIdea;

// querySelectors
var saveButton = document.querySelector(".save-button");
var titleInput = document.getElementById("input-title");
var bodyInput = document.getElementById("input-body");
var cardGrid = document.querySelector(".card-grid");

// eventListeners
saveButton.addEventListener("click", function(e) {
  makeNewIdea(e);
});

cardGrid.addEventListener('click', function (e) {
  if (e.target.classList.contains('white-star')) {
    makeFavorite(e);
  } else if (e.target.classList.contains('orange-star')) {
      unfavorite(e);
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

function showCards() {
  cardGrid.innerHTML = "";
  for (var i = 0; i < ideas.length; i++) {
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

function deleteMiniCard(e) {
  for (var i = 0; i < ideas.length; i++) {
    if (parseInt(e.target.parentElement.parentElement.id) === ideas[i].id) {
      console.log(e.target)
      ideas.splice(i, 1);
      showCards()
    }
  }  
}

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
  showCards()
}

function unfavorite(e) {
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
  showCards()
}