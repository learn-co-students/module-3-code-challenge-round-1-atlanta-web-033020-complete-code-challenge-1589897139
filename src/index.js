document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  init()
})

let imageId = 5259

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

function init(){
  getImage()
}

function getImage(){
  fetch('https://randopic.herokuapp.com/images/5259')
  .then(res => res.json())
  .then(image => {
    renderImage(image)
  })
}

function renderImage(image){
  const parent = document.getElementById('image_card')
  let img = document.getElementById('image')
  img.src = image.url
  const imgTitle = document.getElementById('name')
  imgTitle.innerText = image.name
  const imgSpan = document.getElementById('likes')
  imgSpan.innerText = image.like_count
  const imgBtn = document.getElementById('like_button')
  imgBtn.innerText = 'Like'
  imgBtn.addEventListener('click', () => {
      likeImage(image, imgSpan)
  })
  const form = document.getElementById('comment_form')
  form.addEventListener('input', submitComment)
}

function likeImage(image, imgSpan){
  imgSpan.innerText = image.like_count += 1
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: image.id
    })
  })
  .then(res => res.json())
  .then(error => console.log(error))
}

function submitComment(input){
  console.log(input)
  debugger;
  event.preventDefault()
  const imageUl = document.createElement('ul')
  imageUl.innerText = input.target.value

}
