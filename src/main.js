var mqMedium = window.matchMedia('(max-width: 860px)')
var mqSmall = window.matchMedia('(max-width: 600px)')
var menu = document.querySelector('.menu')

window.addEventListener('resize', adaptLayout)

menu.addEventListener('click', function() {
  showMenu(event),
  hideMenu(event)
})

window.onload = adaptLayout();

function adaptLayout() {
  if (mqSmall.matches || mqMedium.matches) {
    adaptMobileLayout();
  } else if (!mqSmall.matches || !mqMedium.matches) {
    orginalLayout();
  }
}

function orginalLayout() {
  menu.childNodes[7].classList.remove('hidden')
  menu.childNodes[1].classList.add('hidden')  
}

function adaptMobileLayout() {
  menu.childNodes[7].classList.add('hidden')
  menu.childNodes[1].classList.remove('hidden')
}

function showMenu(event) {
  if (event.target === menu.childNodes[1]) {
    menu.childNodes[1].classList.add('hidden');
    menu.childNodes[3].classList.remove('hidden');
    menu.childNodes[7].classList.remove('hidden');
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
  }
}

// add function to the hamburger button
// display hidden filter star Ideas
// 1. add addEventListener to querySelector for 'menu'
// 2. click event on hamburger btn should display the filter star idea section
// 3. it should also display x icon and hide hamburger button
// 4. the main body contents should fade/contrast or become opaque (pg.254 in css book)
// 5. when we click on the x the filter star idea section should hide
// 6. after the idea section is hidden the hamburger btn should come back to the display
