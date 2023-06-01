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
    showCards();  
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