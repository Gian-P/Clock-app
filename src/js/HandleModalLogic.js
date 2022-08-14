const ArrowButton = document.querySelector('.arrow-button')
const ArrowImg = document.querySelector('.arrow-img')
const Modal = document.querySelector('.modal')
const BottomSideContainer = document.querySelector('.bottom-side-container')
const firstHeaderContainer = document.querySelector('.header-container')
const ContainerAuthorName = document.querySelector('.container-author-name')
const SpanMessage = document.querySelector('.span-message')

let modal = 'off'
ArrowButton.addEventListener('click', function ActivateAnimations () {
  if (modal === 'off') {
    // cambia esto por toggle

    ArrowImg.setAttribute('class', 'arrow-img arrow-animation-on')
    Modal.setAttribute('class', 'modal slide-up-modal')
    BottomSideContainer.setAttribute('class', 'bottom-side-container slide-up-bottom-side-container')

    firstHeaderContainer.setAttribute('class', 'header-container slide-up-first-header-container')

    ContainerAuthorName.setAttribute('class', 'container-author-name slide-up-container-author-name')

    SpanMessage.innerText = 'LESS'

    modal = 'on'
  } else {
    ArrowImg.setAttribute('class', 'arrow-img arrow-animation-off')

    Modal.setAttribute('class', 'modal')

    BottomSideContainer.setAttribute('class', 'bottom-side-container')

    firstHeaderContainer.setAttribute('class', 'header-container')

    ContainerAuthorName.setAttribute('class', 'container-author-name')

    SpanMessage.innerText = 'MORE'

    modal = 'off'
  }
})
