let imageId = 5258 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  init();
})

function init() {
  fetchImageData();
}

function fetchImageData() {
  fetch(imageURL)
    .then(response => response.json())
    .then(image => renderImage(image));
}

function renderImage(image) {
  imageImage = document.querySelector('#image');
  imageImage.src = image.url;

  imageTitle = document.querySelector('#name');
  imageTitle.textContent = image.name;

  renderLikes(image);

  imageLikeButton = document.querySelector('#like_button');
  imageLikeButton.addEventListener('click', () => addLike(image));

  imageCommentForm = document.querySelector('#comment_form');
  imageCommentForm.addEventListener('submit', (e) => submitComment(e, image))

  renderComments(image);
}

function renderLikes(image) {
  imageLikes = document.querySelector('#likes');
  imageLikes.textContent = image.like_count;
}

function renderComments(image) {
  image.comments.forEach(comment => renderComment(comment))
}

function renderComment(comment) {

  const commentsContainer = document.querySelector('#comments');

  const commentListItem = document.createElement('li');
  commentListItem.textContent = comment.content;
  commentListItem.setAttribute('comment_id', comment.id);

  const commentSpaceSpan = document.createElement('span');
  commentSpaceSpan.textContent = ' ';

  const commentDeleteButton = document.createElement('button');
  commentDeleteButton.textContent = 'Delete Comment';
  commentDeleteButton.addEventListener('click', () => deleteComment(commentDeleteButton))

  commentListItem.append(commentSpaceSpan, commentDeleteButton);
  commentsContainer.appendChild(commentListItem);
}

function addLike(image) {
  image.like_count += 1;

  renderLikes(image);

  likeObject = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  }

  fetch(likeURL, likeObject)
}

function submitComment(e, image) {
  e.preventDefault();

  const commentInput = e.target.querySelector('#comment_input');

  // Previously renderComment function was here (optimistic rendering)
  // However, because comment Id's are needed to delete a comment
  // Pessimistic render was required and rendering was moved to postComment function

  postComment(image, commentInput.value);

  e.target.reset();
}

function postComment(image, content) {
  commentsObject = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: content
    })
  }

  fetch(commentsURL, commentsObject)
    .then(response => response.json())
    .then(comment => renderComment(comment));
}

function deleteComment(button) {
  const commentListItem = button.parentElement;
  const commentId = commentListItem.getAttribute('comment_id');

  const deleteObject = {
    method: 'DELETE'
  };

  fetch(`${commentsURL}/${commentId}`, deleteObject)
    .then(response => response.json())
    .then(() => commentListItem.remove());
}