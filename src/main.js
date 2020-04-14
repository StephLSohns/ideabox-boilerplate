var menu = document.querySelector('.menu');
var ideaFormSection = document.querySelector('.idea-form-section');
var titleInput = document.getElementById('title-input-field');
var bodyInput = document.getElementById('body-input-field');
var saveBtn = document.getElementById('save-btn-id');
var ideaCardsSection = document.querySelector('.idea-cards-section')

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
}

function enableSaveBtn() {
  if (titleInput.value !== '' && bodyInput.value !== '') {
    saveBtn.disabled = false;
  }
}


// function hideMenuContent () {
//   menu.style.cssText = "grid-template-rows: auto"
// }

// Iteration 2 - Adding Ideas


// As a user,
// - When I click “Save”,

// Save is a button inside the idea-form form element inside the idea-form-section section element
//    it has a class name of save-idea-btn
//    what is the most efficient way to access this button ??????

function ideaFormButtonHandler(event) {
  if (event.target.className === "save-idea-btn") {
      validateInputFields()
      submitIdeaForm();
  }
  // event.preventDefault();
}
function submitIdeaForm() {
  var ideaForm = ideaFormSection.querySelector(".idea-form")
  if (ideaForm.submit) {
    ideaForm.reset();
  saveBtn.disabled = true;
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
        <img src="assets/star-active.svg" alt="red star" id="red-star-btn" onclick="this.src='assets/star.svg'" onclick="this.src='assets/star-active.svg'"/>
        <img src="assets/star.svg" alt="star idea" id="star-btn"/>
        <img src="assets/delete.svg" alt="delete idea" id="x-delete-btn"/>
    </div>
    <div class="idea-box-main-content">
      <h4 class="idea-box-title">${currentIdea.title}</h4>
      <p class="idea-box-body">${currentIdea.body}</p>
    </div>
    <div class="idea-box-add-comment">
      <h4>Comment</h4>
    </div>
  </section>`;
  ideaCardsSection.insertAdjacentHTML('afterbegin', ideaBox);
}








// As a user,
// - When I click “Save”,

    // Same as above

// - If I entered information in both the “Title” and “Body” input fields,

    //  Since we are also validating data here, it is an indication that form validation is handled by one function
    //  This function, when validation is true will run a number of different functions namely the one above and the following one:

// - I should see the “Title” and “Body” input fields clear out

    // Once the idea card has been created (simply means invoked after the function above), both input field under the
    //  idea-form form element should be reset to be empty.




// As a user,
// - When I look at the “Save” button,

    //  The Save button will handle many events it seems, this just means running seperate functions around the same event
    //      it will be important to rememeber "Single responsibility principles"  and how you can use scope and event delegation to your advantage
    //      What's more efficient having query selectors for different elements and each have their own event listeners or have a parent element with multiple event listeners?
    //      From the lessons it would seem that the latter is preferred.
    //      This button is inside the form element which also holds the inputs to be validated. The form (parent) element seems like a good candidates, but looking ahead
    //      eventually we will have to make use of the search bar as well (in it's seperate div parent element) which is contained by the Dave button's
    //      grandparent idea-form-section


// - When either the “Title” or “Body” inputs are empty,

    //  Again, the guess number game might be of good reference here, albeit not perfect (not just patter matching)
    //  Similar to the conditions above, if those conditions are note me (i.e. else if (oppositeCondition)) do the following;


// - I should notice that the “Save” button is disabled because it is a lighter color and the cursor is not a pointer when I hover over it

      // the "Save" button should be disabled. The styling (in CSS using pseudo-class :disabled) should be different. We will use the previous
      //  validations and JS to toggle the disabled feature when relevant. (relevantElement.disabled = true or false is the kind of documentation that I have seen. Will requiere further probing)




// As a user,
// - When I click “Save”,
      // When broken down like this, javascipt seems like an uber-condensed way to storytell.
      // A lot is center around this "Save" button.

// - And a new card is successfully created,
      // I believe successfully created may mean creating a new Idea object instance and have that instance stored in local storage
      //  (the local storage bit may come at a later iteration)
      //    For now, it means the object instance has been created, and like our hang in there posters, show up within our session within the idea-cards-section,
      //    which could mean being stored in some array within a global variable.


// - I should NOT see the page reload

    //  event.preventDefault() but what event, where to place it, and how to apply it are the big questions.
