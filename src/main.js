var menu = document.querySelector('.menu');
var ideaFormSection = document.querySelector('.idea-form-section');
var titleInput = document.getElementById('title-input-field');
var bodyInput = document.getElementById('body-input-field');
var saveBtn = document.getElementById('save-btn-id');
var ideaCardsSection = document.querySelector('.idea-cards-section');
var ideasSection = document.querySelector(".ideas");

var userIdeas = [];
var currentIdea;

menu.addEventListener('click', showHideMenu);
ideaFormSection.addEventListener('click', ideaFormButtonHandler);
ideaFormSection.addEventListener('keyup', enableSaveBtn);
ideaCardsSection.addEventListener('click', ideaCardsButtonHandler);

function showHideMenu() {
  var hamburgerButton = menu.children[0]
  var closeXIcon = menu.children[1]
  if(event.target === hamburgerButton || event.target === closeXIcon) {
  hamburgerButton.classList.toggle('hidden')
  closeXIcon.classList.toggle('hidden')
  ideasSection.classList.toggle('faded')
  }
}

function enableSaveBtn() {
  if (titleInput.value !== '' && bodyInput.value !== '') {
    saveBtn.disabled = false;
  }
}

function ideaFormButtonHandler(event) {
  if (event.target.className === "save-idea-btn") {
    createIdea();
    resetIdeaForm();
  }
}

function createIdea() {
  idea = new Idea (`${titleInput.value}`, `${bodyInput.value}`);
  userIdeas.push(idea);
  renderIdea(idea);
  event.preventDefault();
}

function resetIdeaForm() {
  if (document.forms[0].submit) {
    document.forms[0].reset();
    saveBtn.disabled = true;
    event.preventDefault();
  }
}

function renderIdea(currentIdea) {
  var ideaBox =
  `<section class="idea-box" id=${currentIdea.id}>
    <div class="star-delete-option">
      <button class="star-icon"></button>
      <button class="delete-icon"></button>
    </div>
    <div class="idea-box-main-content">
      <h4>${currentIdea.title}</h4>
      <p>${currentIdea.body}</p>
    </div>
    <button class="idea-box-add-comment">
      <p>Comment</p>
    </button>
  </section>`;
  ideaCardsSection.insertAdjacentHTML('afterbegin', ideaBox);
}

function ideaCardsButtonHandler(event) {
  var chosenIdeaCard = document.getElementById(event.path[2].id)
  if (event.target.className === 'star-icon') {
    getFavoriteIdeaIndex(chosenIdeaCard);
    updateIdea(currentIdea, chosenIdeaCard);
  } else if (event.target.className === 'delete-icon') {
    deleteIdea(chosenIdeaCard);
  }
}

function deleteIdea(chosenIdeaCard) {
  var removeIdea = userIdeas.filter(function(idea) {
    return idea.id != chosenIdeaCard.id
  })
  userIdeas = removeIdea
  ideaCardsSection.removeChild(chosenIdeaCard)
}

function getFavoriteIdeaIndex(chosenIdeaCard) {
  var ideaIndex = userIdeas.findIndex(function(idea) {
    return idea.id == chosenIdeaCard.id;
  });
  var favoriteIdea = userIdeas[ideaIndex]
    currentIdea = favoriteIdea;
}

function updateIdea(currentIdea, chosenIdeaCard) {
  var starIcon = chosenIdeaCard.children[0].children[0]
  var deleteXIcon = chosenIdeaCard.children[0].children[1]
  if(currentIdea.isStarred) {
      makeNotFavIdea(currentIdea, starIcon, deleteXIcon) 
    } else {
      makeFavIdea(currentIdea, starIcon, deleteXIcon);
  }
}

function makeNotFavIdea(currentIdea, starIcon, deleteXIcon) {
  currentIdea.isStarred = false;
  starIcon.style.cssText = "background-image: url(assets/star.svg);"
  deleteXIcon.disabled = false;
}

function makeFavIdea(currentIdea, starIcon, deleteXIcon) {
  currentIdea.isStarred = true;
  starIcon.style.cssText = "background-image: url(assets/star-active.svg);"
  deleteXIcon.disabled = true;
}
