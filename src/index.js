document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5262 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage();
})

function fetchImage() {
  fetch(`https://randopic.herokuapp.com/images/5262`)
    .then(resp => resp.json())
    .then(pic => renderPic(pic))
}

function renderPic(pic) {
  let imageDiv = document.getElementById("image-card")
  let imageTag = document.getElementById("image")
  imageTag.src = pic.url

  let nameTag = document.getElementById("name")
    nameTag.innerText = pic.name

  let likesTag = document.getElementById("likes")
  likesTag.innerText = pic.like_count

  let ulTag = document.getElementById("comments")
  let liTag = document.createElement("li")
  for (i = 0; i < pic.comments.length; i++) {
    liTag.innerText = pic.comments[i].content
  }
    ulTag.appendChild(liTag)

  let likeButton = document.getElementById("like-button")
    likeButton.addEventListener("click", () => makeLike(id))
  }

  function makeLike(id) {
    debugger;
    fetch(likeURL, {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: id
      })
    })
    .then(resp => resp.json())
    .then()
  }
  

    


  
  
  
  


{/* <body>
  <div class="container">
    <div class="row" id="image_content">
      <div class="card col-md-4"></div>
      <div id="image_card" class="card col-md-4">
          <img src="" id="image" data-id=""/>
          <h4 id="name">Title of image goes here</h4>
          <span>Likes:
            <span id="likes">Likes Go Here</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
               <!-- <li> for each comment goes here -->
          </ul>
        </div>
      <div class="card col-md-4"></div>
    </div>
  </div> */}