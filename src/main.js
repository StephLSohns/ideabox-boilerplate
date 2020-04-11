var menu = document.querySelector('.menu')
var mqMedium = window.matchMedia('(max-width: 860px)')
var mqSmall = window.matchMedia('(max-width: 600px)')

window.addEventListener('resize', adaptLayout)
menu.addEventListener('click', function() {
  showMenu(event),
  hideMenu(event)
})

window.onload = adaptLayout();

function adaptLayout() {
  if (mqSmall.matches || mqMedium.matches) {
    adaptLayout();
  } else if (!mqSmall.matches || !mqMedium.matches) {
    orginalLayout();
  }
}

function orginalLayout() {
  menu.childNodes[7].classList.remove('hidden')
  menu.childNodes[1].classList.add('hidden')
}

function adaptLayout() {
  menu.childNodes[7].classList.add('hidden')
  menu.childNodes[1].classList.remove('hidden')
}

function showMenu(event) {
  if (event.target === menu.childNodes[1]) {
    menu.childNodes[1].classList.add('hidden');
    menu.childNodes[3].classList.remove('hidden');
    menu.childNodes[7].classList.remove('hidden');
    var ideasSection = document.querySelector(".ideas");
    ideasSection.classList.add('faded');
  }

  showMenuContent();
}

function showMenuContent() {
  menu.style.cssText = "grid-template-rows: 8vh 20vh"
}

function hideMenu (event) {
  if (event.target === menu.childNodes[3]) {
    menu.childNodes[3].classList.add('hidden');
    menu.childNodes[1].classList.remove('hidden');
    menu.childNodes[7].classList.add('hidden');
    var ideasSection = document.querySelector(".ideas");
    ideasSection.classList.remove('faded');
  }
  hideMenuContent();
}

function hideMenuContent () {
  menu.style.cssText = "grid-template-rows: auto"
}
