var mqMedium = window.matchMedia('(max-width: 860px)');
// var mqSmall = window.matchMedia('(max-width: 600px)');

var menu = document.querySelector('.menu');
var ideaFormSection = document.querySelector('.idea-form-section');
var ideaCardsSection = document.querySelector('.idea-cards-section')

var userIdeas = [];
var idea;

window.addEventListener('resize', adaptLayout);

menu.addEventListener('click', function() {
  showMenu(event),
  hideMenu(event)
});

ideaFormSection.addEventListener('click', ideaFormButtonHandler)
// ideaFormSection.addEventListener('keyup', enableButton)

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
  }
  showMenuContent();
};

function showMenuContent() {
  menu.style.cssText = "grid-template-rows: 8vh 20vh";
};

function hideMenu (event) {
  if (event.target === menu.childNodes[3]) {
    menu.childNodes[3].classList.add('hidden');
    menu.childNodes[1].classList.remove('hidden');
  };
};

// add function to the hamburger button
// display hidden filter star Ideas
// 1. add addEventListener to querySelector for 'menu'
// 2. click event on hamburger btn should display the filter star idea section
// 3. it should also display x icon and hide hamburger button
// 4. the main body contents should fade/contrast or become opaque (pg.254 in css book)
// 5. when we click on the x the filter star idea section should hide
// 6. after the idea section is hidden the hamburger btn should come back to the display


// Iteration 2 - Adding Ideas


// As a user,
// - When I click “Save”,

// Save is a button inside the idea-form form element inside the idea-form-section section element
//    it has a class name of save-idea-btn
//    what is the most efficient way to access this button ??????

function ideaFormButtonHandler(event) {
  var ideaFormButtons = ideaFormSection.getElementsByTagName('button'); // may not be neccessary...
  if (event.target.className === "save-idea-btn") {
      validateInputFields()
      // we can add any other functions related to our event here.  
  } 
  // event.preventDefault();
}

// - If I entered information in both the “Title” and “Body” input fields,

    // This means some form of input validation, still kind of iffy on this, but the number guess game 
    //    we were asked to refactor may provide some insigth within the mess of functions. The event chapter 
    //    in JS book is basically built around a validation function and events, also good resource.  



function validateInputFields() {
  var formInputs = ideaFormSection.getElementsByTagName("input");
  if (formInputs[0].value === '' || formInputs[1].value === '') {
    alert('Please, share your Ideas :) save button enabler function may go here, not sure yet.' ) 
  } else {
    idea = new Idea (`${formInputs[0].value}`, `${formInputs[1].value}`);
    userIdeas.push(idea);
    renderIdea(idea);
  }   
  event.preventDefault();
}  

// - I should see a new idea card with the provided title and body appear in the idea list

//  after inputs are validated, it should become a new instance of our Idea object defined in Idea.js
//  as a new Idea instance, it should become displayed in ou idea-cards section. 

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
  starIcon.setAttribute('id', 'star-icon');
  starIcon.disabled = true;
  topBarParentDiv.appendChild(starIcon);
}
  
function createDeleteIcon(topBar) {
  var deleteIcon = document.createElement('button');
  deleteIcon.setAttribute('id', 'delete-icon');
  deleteIcon.disabled = true;
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
