document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5261 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  testFunction(imageURL, likeURL, commentsURL)


})

function testFunction(imageURL, likeURL, commentsURL) {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(data => addImage(data))
}

function addImage(data) {
  const imageLoc = document.querySelector("#image")
  imageLoc.src = data.url
  const imageName = document.querySelector("#name")
  imageName.innerText = data.name
  const imageLikes = document.querySelector("#likes")
  imageLikes.innerText = data.like_count
  
  let li = document.createElement("LI");
  const imageComments = document.querySelector("#comments")
  let commentsAll = []
  data.comments.forEach (function (comment) {
    let content = comment.content
    li.innerText = content
    commentsAll.push(li)
    imageComments.appendChild(li)
  })
  
  let likeButton = document.querySelector("#like_button")
  likeButton.addEventListener("click", function () {
    let likes = parseInt(imageLikes.innerText, 10)
    likes += 1
    imageLikes.innerText = likes

    // fetch(likeURL, {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(likes )
    // })

  })

  let commentsForm = document.querySelector("#comment_form")
  let commentButton = document.querySelector("#comment_form > input[type=submit]:nth-child(2)")
  commentButton.addEventListener("click", function (event) {
    event.preventDefault()
    let li2 = document.createElement('li')
    let commentBox = document.querySelector("#comment_input").value
    li2.innerText = commentBox
    imageComments.appendChild(li2)
    commentsForm.reset()
  } )


  debugger
}
