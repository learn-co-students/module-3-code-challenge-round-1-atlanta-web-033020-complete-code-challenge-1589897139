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
  form.addEventListener('submit', (e) => {
    submitComment(e, image)
  })
  renderComments(image)
}

function renderComments(image){
  image.comments.forEach((comment) => renderComment(comment.content))
}

function renderComment(comment){
  parent = document.getElementById('comments')
  commentLi = document.createElement('li')
  commentLi.innerText = comment
  parent.appendChild(commentLi) 
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
  .then(res => console.log(res))
}

function submitComment(e, image){
  e.preventDefault()
  renderComment(e.target.querySelector('input').value)
  let commentObj = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: e.target.querySelector('input').value
    })
  }
  fetch(commentsURL, commentObj)
  .then(res => res.json())
  .then(res => console.log(res))
}