import { mainGetComments, mainPostComments } from "./api.js";

const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentTextElement = document.getElementById('comment-text');


const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment  class-li" data-name="${comment.name}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div data-answer='${index}' class="comment-text">
            ${(comment.isEdit) ? `<textarea class="edit-form-text" >${comment.text}</textarea>` : `${comment.text}`}
           </div> 
            
        </div> 
              <button class="add-form-button edit-form-button" data-index="${index}"> ${(comment.isEdit) ? `Сохранить` : `Изменить`} </button>
              <button data-id="${comment.id}" class="add-form-button button delete-button">Удалить</button>
              </div>    
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-like='${index}' class="like-button ${(comment.isLiked) ? "active" : ''}" ></button>
            </div>
          </div>
        </li>`
    })
    .join("");

  listElement.innerHTML = commentsHtml;

  initEventListeners();
  initLikeButtonsListeners();
  changeButtonElementsFunc();
  reviewButtonElements();
  formatTime(currentDate);
};


let comments = [];

const jsonComments = JSON.stringify(comments);
const commentsFromJson = JSON.parse(jsonComments);

const startAt = Date.now();
console.log('запрос обрабатывается')


document.getElementById('comment-hover').style.display = 'none';

function getComments() {
  document.getElementById('loading-comment').style.display = 'flex';
  mainGetComments()
    .then((responseData) => {
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
      renderComments();
    })
    .then((data) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      document.getElementById('add-form-disable').style.display = 'flex';
      document.getElementById('loading-comment').style.display = 'none';
      document.getElementById('comment-hover').style.display = 'none';
    })
}
getComments()

document.getElementById('comment-hover').style.display = 'none';

const sanitizeHtml = (htmlString) => {
  return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
};
getComments()



function postComments() {
  document.getElementById('comment-hover').style.display = 'none';
  document.getElementById('add-form-disable').style.display = 'none';

  mainPostComments({
    name: sanitizeHtml(nameInputElement.value),
    date: formatTime(new Date),
    likes: 0,
    text: sanitizeHtml(commentTextElement.value),
    isLiked: false,
    forceError: true,
  })
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        document.getElementById('comment-hover').style.display = 'none';
        return response.json();
      } if (response.status === 400) {
        throw new Error("Количество символов в сообщении должно быть больше 3");
      } else {
        throw new Error("Кажется что-то пошло не так, попробуйте позже");
      };
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
      document.getElementById('add-form-disable').style.display = 'flex';
      document.getElementById('loading-comment').style.display = 'none';
      document.getElementById('comment-hover').style.display = 'flex';

      alert(error.message)
      console.warn(error);
    });
};


let currentDate = new Date();
function formatTime(currentDate) {
  const date = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const h = currentDate.getHours().toString().padStart(2, "0");
  const m = currentDate.getMinutes().toString().padStart(2, "0");

  return `${date}.${month}.${year}, ${h}:${m}`
  renderComments()
}
console.log(formatTime(currentDate));

buttonElement.addEventListener("click", (event) => {
  postComments()
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
    //console.log(commentElement.dataset.name);
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

const initLikeButtonsListeners = () => {
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
};
