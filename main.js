// Data Model
var ideas = [];
var currentIdea;

// querySelectors
var saveButton = document.querySelector('.save-button');
var titleInput = document.getElementById('input-title')
var bodyInput = document.getElementById('input-body')
var cardGrid = document.querySelector('.card-grid');


// eventListeners
saveButton.addEventListener('click', function(e) {
    makeNewIdea(e)
});
cardGrid.addEventListener('click', function(e) {
    deleteMiniCard(e)
})

// functions
function createIdea(title, body) {
    return {
        title: title,
        body: body,
        id: Date.now()
    }
}

function makeNewIdea(e) {
    e.preventDefault()
    var title = titleInput.value
    var body = bodyInput.value

    currentIdea = createIdea(title, body)

    for (var i = 0; i < ideas.length; i++) {
        if (currentIdea.title === ideas[i].title || currentIdea.body === ideas[i].body) {
            return
        }
    }
    ideas.push(currentIdea)
    clearInputs();
    showCards();  
}


function showCards(){
    cardGrid.innerHTML = '';
    for(var i = 0; i < ideas.length; i++){
        cardGrid.innerHTML += `
        <article class="mini-card" id="${ideas[i].id}">
            <header id="mini-card-header"><button id="delete-button"></button></header>
            
            <h2> ${ideas[i].title} </h2>
            <p> ${ideas[i].body}</p>
            </article> `
    }
}

function clearInputs(){
    titleInput.value = '';
    bodyInput.value= '';
}

function deleteMiniCard(e) {
    for (var i = 0; i < ideas.length; i++) {
        console.log('potato')
        if (parseInt(e.target.closest('article').id) === ideas[i].id) {
            ideas.splice(i, 1)
        }
    }
    showCards()
}

{/* <div><button id="delete-button"></button></div> */}
{/* <header id="mini-card-header"><div class="svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.18 17.72"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Artboard 31</title><g id="background"><polygon class="cls-1" points="13.13 5.87 12.43 5.16 8.97 8.61 5.53 5.16 4.82 5.87 8.27 9.32 4.82 12.77 5.53 13.48 8.97 10.03 12.43 13.48 13.13 12.77 9.68 9.32 13.13 5.87"/></g></svg></div></header> */}