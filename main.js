import { getComments, postComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { formatTime } from "./formatTime.js";
import { renderLogin } from "./LoginPage.js";
import { initLikeButtonsListeners } from "./likeEvent.js";



export const buttonElement = document.getElementById('add-button');
export const listElement = document.getElementById('list');
export const nameInputElement = document.getElementById('name-input');
export const commentTextElement = document.getElementById('comment-text');
export const formElement = document.getElementById('add-form-disable');
export const commentHover = document.getElementById('comment-hover');
export const loadingComment = document.getElementById('loading-comment');
export const appElement = document.getElementById('app');


loadingComment.style.display = 'none';
commentHover.style.display = 'none';
formElement.style.display = 'none';


let comments = [];

const startAt = Date.now();
console.log('запрос обрабатывается')

renderLogin({ listElement, comments });

const jsonComments = JSON.stringify(comments);
const commentsFromJson = JSON.parse(jsonComments);

function mainGetComments(comments) {
  //document.getElementById('loading-comment').style.display = 'none';
  getComments().then((responseData) => {
    console.log(responseData)

    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: formatTime(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
        id: comment.id,
      };
    })

    comments = appComments;
    renderComments({ comments });
    
    loadingComment.style.display = 'none';
  })
   // .then(() => {
   //   buttonElement.disabled = false;
  //    buttonElement.textContent = "Написать";
  //  })
    .catch((error) => {
      if (error === 'Сервер сломался, попробуй позже') {
        alert('Сервер сломался, попробуй позже');
      }
      else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      console.warn(error);
      formElement.style.display = 'none';
      loadingComment.style.display = 'none';
    });
};
mainGetComments(comments);
renderLogin({ listElement, comments });


const sanitizeHtml = (htmlString) => {
  return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
};
getComments()



function mainPostComments() {
  document.getElementById('loading-comment').style.display = 'none';
  document.getElementById('comment-hover').style.display = 'none';
  document.getElementById('add-form-disable').style.display = 'none';

  postComments({
    name: sanitizeHtml(nameInputElement.value),
    date: formatTime(new Date()),
    likes: 0,
    text: sanitizeHtml(commentTextElement.value),
    isLiked: false,
    forceError: true,
  })
    .then((responseData) => {
      console.log(responseData);
      getComments();
      renderComments();
      nameInputElement.value = "";
      commentTextElement.value = "";
    })
    .then(() => {
      commentHover.style.display = 'none';
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      document.getElementById('add-form-disable').style.display = 'none';
      document.getElementById('loading-comment').style.display = 'none';
      document.getElementById('comment-hover').style.display = 'none';

      alert(error.message)
      console.warn(error);
    });
};



buttonElement.addEventListener("click", (event) => {
  mainPostComments()
  renderComments()
});

const disableButton = () => {
  if (nameInputElement.value && commentTextElement.value) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
};
nameInputElement.addEventListener("input", disableButton);
commentTextElement.addEventListener("input", disableButton);


buttonElement.addEventListener("click", (event) => {

  nameInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return
  };
  commentTextElement.classList.remove("error");
  if (commentTextElement.value === "") {
    commentTextElement.classList.add("error");
    return
  };
  renderComments()
});


/*const initEventListeners = () => {
    const commentElements = document.querySelectorAll(".comment");

 for (const commentElement of commentElements) {
   commentElement.addEventListener("click", () => {
   });
  }
 };
*/
/*const changeButtonElementsFunc = () => {
  const changeButtonElements = document.querySelectorAll(".edit-form-button");
  for (const changeButtonElement of changeButtonElements) {
    changeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const editCommentText = document.querySelector('.edit-form-text')
      const index = changeButtonElement.dataset.index;
      if (comments[index].isEdit === false) {
        comments[index].isEdit = true;
      } else {
        comments[index].isEdit = false;
        if (element.children.length == 0) {
          editCommentText.value = `${comments[index].text}`;
        }
      }
      renderComments()
    });
  }
}
*/
/*
//отзыв на коммент
const reviewButtonElements = () => {
  const reviewElements = document.querySelectorAll('.class-li');
  reviewElements.forEach((element, index) => {

    element.addEventListener("click", (event) => {
      event.stopPropagation();
      if (element) {
        commentTextElement.value = `- ${comments[index].text}
  ${comments[index].name} -
  
           `
      };
      renderComments();
    });
  });
};

*/

initLikeButtonsListeners( {comments});