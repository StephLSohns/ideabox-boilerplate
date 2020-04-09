var menu = document.querySelector('.menu')
var mq_medium = window.matchMedia('(max-width: 860px)')
var mq_small = window.matchMedia('(max-width: 600px)')

window.addEventListener("resize", adaptLayout)

function adaptLayout() {
  if (mq_small.matches) {
    adaptSmallLayout();
  } else if (mq_medium.matches) {
    adaptMediumLayout();
  }
}

function adaptMediumLayout() {
  var filterIdeaMenu = menu.querySelector('.filter-star-ideas')
  console.log(filterIdeaMenu)
}
