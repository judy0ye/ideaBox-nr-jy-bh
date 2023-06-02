// Data Model
var ideas = [];
var currentIdea;

// querySelectors
var saveButton = document.querySelector(".save-button");
var titleInput = document.getElementById("input-title");
var bodyInput = document.getElementById("input-body");
var cardGrid = document.querySelector(".card-grid");

// eventListeners
saveButton.addEventListener("click", function (e) {
  makeNewIdea(e);
});
cardGrid.addEventListener("click", function (e) {
  deleteMiniCard(e);
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
    ideas.push(currentIdea)
    clearInputs();
    saveButton.disabled = true;
    showCards();  
    }
}

function showCards(){
    cardGrid.innerHTML = '';
    for(var i = 0; i < ideas.length; i++){
        cardGrid.innerHTML += `
        <article class="mini-card" id="${ideas[i].id}">
            <h2> ${ideas[i].title} </h2>
            <p> ${ideas[i].body}</p>
            </article> `
    }
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
                <button class="delete-button"></button>
            </header>
            <h2> ${ideas[i].title} </h2>
            <p> ${ideas[i].body}</p>
        </article>`;
  }
}

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
}

function deleteMiniCard(e) {
  for (var i = 0; i < ideas.length; i++) {
    console.log(e.target.parentElement.parentElement);
    if (e.target.classList.contains("delete-button")) {
      e.target.parentElement.parentElement.remove();
      ideas.splice(i, 1);
    }
  }
}
