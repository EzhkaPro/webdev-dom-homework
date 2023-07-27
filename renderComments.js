import { listElement, buttonElement, nameInputElement, commentTextElement } from "../main.js";
import {initLikeButtonsListeners } from "./likeEvent.js"


export const renderComments = ({  comments }) => {
    listElement.innerHTML = comments
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

 
  //initEventListeners(comments, listElement, buttonElement, listElement, nameInputElement, commentTextElement);
  //changeButtonElementsFunc(comments, buttonElement, listElement, nameInputElement, commentTextElement);
  //reviewButtonElements(comments, buttonElement, listElement, nameInputElement, commentTextElement);
  //formatTime(currentDate);
  initLikeButtonsListeners(comments);


};