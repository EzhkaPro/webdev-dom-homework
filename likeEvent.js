import { renderComments } from "./renderComments.js";
//import { mainGetComments } from "./main.js";
//import { likeComment } from "./api.js";

export const initLikeButtonsListeners = ( comments ) => {
  const likeButtonsElements = document.querySelectorAll('.like-button');
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
      renderComments ({ comments });
    });
  })
};

