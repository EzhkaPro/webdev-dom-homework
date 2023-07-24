import { getComments, postComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { formatTime } from "./formatTime.js";
import { renderLogin } from "./LoginPage.js";
import { initLikeButtonsListeners } from "./like.js";



export const buttonElement = document.getElementById('add-button');
export const listElement = document.getElementById('list');
export const nameInputElement = document.getElementById('name-input');
export const commentTextElement = document.getElementById('comment-text');

let comments = [];

const jsonComments = JSON.stringify(comments);
const commentsFromJson = JSON.parse(jsonComments);

const startAt = Date.now();
console.log('запрос обрабатывается')


//renderComments({ initEventListeners, initLikeButtonsListeners, changeButtonElementsFunc,reviewButtonElements, formatTime });

renderLogin({listElement, listElementData});
//document.getElementById('add-form-disable').style.display = 'none';//скрывает форму добавления комментария

function mainGetComments() {
  document.getElementById('loading-comment').style.display = 'none';
  getComments().then((responseData) => {
    console.log(responseData);
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: formatTime(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    })
    comments = appComments;
    renderComments({ comments, initEventListeners, initLikeButtonsListeners, changeButtonElementsFunc, reviewButtonElements, formatTime });
  })
    .then((data) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
    })
}
mainGetComments();

renderLogin();

document.getElementById('comment-hover').style.display = 'none';

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


const initEventListeners = () => {
  const commentElements = document.querySelectorAll(".comment");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
    });
  }
};

const changeButtonElementsFunc = () => {
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



initLikeButtonsListeners(); //Like
/*const initLikeButtonsListeners = () => {
  const likeButtonsElements = document.querySelectorAll('.like-button');//кнопка
  likeButtonsElements.forEach((likeButtonsElement, index) => {
    likeButtonsElement.addEventListener("click", (event) => {
      event.stopPropagation();
      if (comments[index].isLiked === false) {
        comments[index].isLiked = true;
        comments[index].likes += 1;
      } else {
        comments[index].isLiked = false;
        comments[index].likes -= 1;
      }
      renderComments()
    });
  })
};*/
