var menu = document.querySelector('.menu');
var ideaFormSection = document.querySelector('.idea-form-section');
var titleInput = document.getElementById('title-input-field');
var bodyInput = document.getElementById('body-input-field');
var saveBtn = document.getElementById('save-btn-id');
var ideaCardsSection = document.querySelector('.idea-cards-section')
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
  hamburgerButton.classList.toggle('hidden')
  closeXIcon.classList.toggle('hidden')
  ideasSection.classList.toggle('faded')

}

function enableSaveBtn() {
  if (titleInput.value !== '' && bodyInput.value !== '') {
    saveBtn.disabled = false;
  }
}

function ideaFormButtonHandler(event) {
  if (event.target.className === "save-idea-btn") {
    createIdea();
    submitIdeaForm();
  }
}

function submitIdeaForm() {
  if (document.forms[0].submit) {
    document.forms[0].reset();
    saveBtn.disabled = true;
    event.preventDefault();
  }
}

function validateInputFields() {
  var formInputs = ideaFormSection.getElementsByTagName("input");
  if (formInputs[0].value === '' || formInputs[1].value === '') {
    alert('Please, share your Ideas :) save button enabler function may go here, not sure yet.' )
  } else {
    currentIdea = new Idea (`${formInputs[0].value}`, `${formInputs[1].value}`);
    userIdeas.push(currentIdea);
    renderUserIdeas(userIdeas);
  }
  event.preventDefault();
}

function renderIdea(currentIdea) {
  var ideaBox =
  `<section class="idea-box" id=${currentIdea.id}>
    <div class="star-delete-option">
      <button class="star-icon"></button>
      <button class="delete-icon"></button>
    <div class="idea-box-main-content">
      <h4 class="idea-box-title">${currentIdea.title}</h4>
      <p class="idea-box-body">${currentIdea.body}</p>
    </div>
    <div class="idea-box-add-comment">
      <p>Comment</p>
    </div>
  </section>`;
  ideaCardsSection.insertAdjacentHTML('afterbegin', ideaBox);
}

function createIdea() {
  var title = document.forms[0].elements[0].value
  var body = document.forms[0].elements[1].value
  idea = new Idea (`${title}`, `${body}`);
  userIdeas.push(idea);
  renderIdea(idea);
  event.preventDefault();
}

function ideaCardsButtonHandler(event) {
  console.log(event);
  var boxId = document.getElementById(event.path[2].id)
  console.log(boxId);
  if (event.target.className === 'star-icon') {
    favoriteIdea(event, boxId);;
  } else if (event.target.className === 'delete-icon') {
    deleteIdea(boxId);
  }
}

function deleteIdea(boxId) {
  var removeIdea = userIdeas.filter(function(idea) {
    return idea.id != boxId.id
  })
  userIdeas = removeIdea
  ideaCardsSection.removeChild(boxId)
}

function getFavoriteIdeaIndex(event, boxId) {
  var ideaIndex = userIdeas.findIndex(function(idea) {
    return idea.id == boxId.id;
  });
  var favoriteIdea = userIdeas[ideaIndex]
  starFavIdea (favoriteIdea);
}
function starFavIdea(favoriteIdea) {
  favoriteIdea.isStarred = true;
  event.target.nextSibling.disabled = true;
  changeIcon(favoriteIdea)
}

function changeIcon(favoriteIdea, boxId) {
  if (favoriteIdea.isStarred) {
  //  favoriteIcon icon is red
//  boxId some child that's the button.className.add = "is-favorite"
//  same acess key.style.bakcground-img = "img url"


  } else {
    // favorite Idea icon is white
  }
}




  // ### Iteration 3 - Favoriting & Deleting Ideas
  // As a user,
  // - When I click the "Delete" button on an idea card,
  // - The card should be permanently removed from my view
  // As a user,
  // - When I click the "Star" button on an idea card,
  // - When the button was an outline of a star (not favorited),
  // - The button should now be a filled in star (favorited)
  // As a user,
  // - When I click the "Star" button on an idea card,
  // - When the button was a filled in star (favorited),
  // - The button should now be an outline of a star (not favorited)
  //


  // function checkIfStarred(event) {
  //   if (event.target === #star-icon)
  //   if (this.box.isStarred === true) {
  //      when we click the star button it should be unfavorited
  //      and delete icon should become active
  //   } else if (this.box.isStarred === false) {
  //    when we click the star button it should be favorited
  //     and delete icon should become un-active
  //   }

  // (ideabox.isStarred) ? unfavoritefunction : favoriteFunction

  function starIdea(event) {
    console.log(event)
  }





  // As a user,
  // - When I delete or favorite any card,
  // - I should _not_ see the page reload
