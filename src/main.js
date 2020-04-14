var mqMedium = window.matchMedia('(max-width: 860px)');
// var mqSmall = window.matchMedia('(max-width: 600px)');

var menu = document.querySelector('.menu');
var ideaFormSection = document.querySelector('.idea-form-section');
var titleInput = document.getElementById('title-input-field');
var bodyInput = document.getElementById('body-input-field');
var saveBtn = document.getElementById('save-btn-id');
var ideaCardsSection = document.querySelector('.idea-cards-section')
var ideasSection = document.querySelector(".ideas");

// var ideaForm = ideaFormSection.querySelector(".idea-form")

var userIdeas = [];
var idea;

window.addEventListener('resize', adaptLayout);

menu.addEventListener('click', function() {
  showMenu(event),
  hideMenu(event)
});

ideaFormSection.addEventListener('click', ideaFormButtonHandler)
ideaFormSection.addEventListener('keyup', enableSaveBtn);
ideaCardsSection.addEventListener('click', ideaCardsButtonHandler)

window.onload = adaptLayout();

function adaptLayout() {
  if (!mqMedium.matches) {
    orginalLayout();
  } else if (mqMedium.matches && !(menu.childNodes[3].classList.contains('hidden'))) {
    event.preventDefault();
  } else if (mqMedium.matches) {
    adaptMobileLayout();
  }
};

function orginalLayout() {
  menu.childNodes[7].classList.remove('hidden');
  menu.childNodes[1].classList.add('hidden');
  if (!(menu.childNodes[3].classList.contains('hidden'))) {
    menu.childNodes[3].classList.add('hidden');
    menu.style.cssText = "grid-template-rows: auto"
  }
};

function adaptMobileLayout() {
    menu.childNodes[7].classList.add('hidden');
    menu.childNodes[1].classList.remove('hidden');
};


function showMenu(event) {
  if (event.target === menu.childNodes[1]) {
    menu.childNodes[1].classList.add('hidden');
    menu.childNodes[3].classList.remove('hidden');
    menu.childNodes[7].classList.remove('hidden');
    ideasSection.classList.add('faded');
  }
  showMenuContent();
}

function showMenuContent() {
  menu.style.cssText = "grid-template-rows: 8vh 20vh";
};

function hideMenu (event) {
  if (event.target === menu.childNodes[3]) {
    menu.childNodes[3].classList.add('hidden');
    menu.childNodes[1].classList.remove('hidden');
    menu.childNodes[7].classList.add('hidden');
    ideasSection.classList.remove('faded');
  }
  hideMenuContent();
}

function hideMenuContent () {
  menu.style.cssText = "grid-template-rows: auto"
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

function createIdea() {
  var title = document.forms[0].elements[0].value
  var body = document.forms[0].elements[1].value
  idea = new Idea (`${title}`, `${body}`);
  userIdeas.push(idea);
  renderIdea(idea);
  event.preventDefault();
  }

function renderIdea (idea) {
  var ideaBox = document.createElement('section');
  ideaBox.className ='idea-box';
  ideaBox.setAttribute('id', `${idea.id}`);
  createStarDeleteOption(ideaBox);
  createBodyContent(ideaBox);
  createCommentButton(ideaBox);
  ideaCardsSection.appendChild(ideaBox);
}

function createStarDeleteOption(ideaBoxParent) {
  var starDeleteOption = document.createElement('div');
  starDeleteOption.className = 'star-delete-option';
  createStarIcon(starDeleteOption);
  createDeleteIcon(starDeleteOption);
  ideaBoxParent.appendChild(starDeleteOption);
}

function createStarIcon(topBarParentDiv) {
  var starIcon = document.createElement('button');
  starIcon.className = 'star-icon';
  starIcon.disabled = false;
  topBarParentDiv.appendChild(starIcon);
}

function createDeleteIcon(topBar) {
  var deleteIcon = document.createElement('button');
  deleteIcon.className = 'delete-icon';
  deleteIcon.disabled = false;
  topBar.appendChild(deleteIcon)
}

function createBodyContent(card) {
  var cardBody = document.createElement('div')
  cardBody.className = "idea-box-main-content";
  createHeading(cardBody);
  createBodyText(cardBody);
  card.appendChild(cardBody);
}

function createHeading(ideaSummary) {
  var cardTitle = document.createElement('h4');
  cardTitle.innerText = idea.title;
  ideaSummary.appendChild(cardTitle)
}

function createBodyText(ideaSummary) {
  var miniCardBody = document.createElement('p');
  miniCardBody.innerText = idea.body;
  ideaSummary.appendChild(miniCardBody)
}

function createCommentButton(card) {
  var commentButton = document.createElement('button')
  commentButton.className = 'idea-box-add-comment';
  commentButton.innerHTML = '<p>Comment</p>';
  card.appendChild(commentButton);
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

function favoriteIdea(event, boxId) {
  var ideaIndex = userIdeas.findIndex(function(idea) { 
    return idea.id == boxId.id;
  });
  console.log(ideaIndex);
  var favoriteIdea = userIdeas[ideaIndex]
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



