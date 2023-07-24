export const initLikeButtonsListeners = () => {
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