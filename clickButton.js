import {initEventListeners, changeButtonElementsFunc, reviewButtonElements } from "./main.js";

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