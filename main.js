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
  getComments()
    .then((responseData) => {
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
    /*.then(() => {
      if (response.status === 201) {
        listElement.style.display = "flex";
        formElement.style.display = "flex";
      }
    })*/
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
  postComments({
    name: sanitizeHtml(nameInputElement.value),
    text: sanitizeHtml(commentTextElement.value)
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Количество символов в сообщении должно быть больше 3");
      }
      else if (response.status === 500) {
        throw new Error("Кажется что-то пошло не так, попробуйте позже");
      } else {
        return response.json();
      };
    })
    .then((responseData) => {
      console.log(responseData);
    })
    .then(() => {
      mainGetComments(comments);
      renderComments({ comments });
      commentHover.style.display = 'none';
      formElement.style.display = 'flex';
      listElement.style.display = "flex";
      formElement.style.display = 'flex';
      nameInputElement.value = "";
      commentTextElement.value = "";
    })
    .catch((error) => {
      alert(error.message)
      console.warn(error);
    });
};

buttonElement.addEventListener("click", () => {
  mainPostComments();
  renderComments({ comments });
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
  //renderComments(comments)
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

initLikeButtonsListeners({ comments });