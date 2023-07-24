import { 
  buttonElement, 
  listElement, 
  nameInputElement, 
  commentTextElement } from "../main.js";



export const renderComments = ({comments, listElement, initEventListeners, 
  initLikeButtonsListeners, changeButtonElementsFunc,reviewButtonElements, formatTime }) => {
    listElement.innerHTML = listElementData;
    const appElement = document.getElementById("app");
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
  
const appHtml = `
<div class="container">
<ul id="list" class="comments">${commentsHtml}</ul>
<div class="login-page">
  Чтобы добавить комментарий, <a href="LoginPage.html" class="login-page">авторизуйтесь</a>
</div>
<div id="loading-comment">
  <p>Подождие, комментарии загружаются...</p>
</div>
<div id="comment-hover">
  <p>Комментарий добавляется...</p>
</div>
<div class="add-form" id="add-form-disable">
  <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" value="" />
  <textarea id="comment-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    value=""></textarea>
  <div class="add-form-row">
    <button id="add-button" class="add-form-button" data-index="${index}"> Написать</button>
  </div>
</div>
</div>
`;


appElement.innerHTML = appHtml;
  
    initEventListeners(buttonElement, listElement, nameInputElement, commentTextElement);
    initLikeButtonsListeners(buttonElement, listElement, nameInputElement, commentTextElement);
    changeButtonElementsFunc(buttonElement, listElement, nameInputElement, commentTextElement);
    reviewButtonElements(buttonElement, listElement, nameInputElement, commentTextElement);
    //formatTime(currentDate);


    
    document.getElementById('add-form-disable').style.display = 'none';//скрывает форму добавления комме
  };