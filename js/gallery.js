import images from "./gallery-items.js"

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const originalImageView = document.querySelector('.lightbox__image');
const closingModalBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('.lightbox__overlay');

const string = images.reduce((acc, image) => acc +=
    `<li class="gallery__item"><a class="gallery__link" href="${image.original}"><img class="gallery__image" data-source="${image.original}" src="${image.preview}"
        alt="${image.description}" ></a></li>`
    , '')
     
galleryRef.insertAdjacentHTML("afterbegin", string)

function closingModalPerEsc (event) {
    if (event.key === "Escape") closingModal()
    window.removeEventListener('keydown', closingModalPerEsc)
}

function closingModal()  {
    modalRef.classList.remove('is-open')
    originalImageView.src = ''
    originalImageView.alt = ''
}

galleryRef.addEventListener('click', (event) => { 
    event.preventDefault()
    if (!event.target.classList.contains('gallery__image')) return
    modalRef.classList.add('is-open')
    originalImageView.src = event.target.dataset.source
    originalImageView.alt = event.target.alt
    window.addEventListener('keydown',closingModalPerEsc )
})

closingModalBtnRef.addEventListener('click', closingModal)
overlayRef.addEventListener('click', closingModal)
