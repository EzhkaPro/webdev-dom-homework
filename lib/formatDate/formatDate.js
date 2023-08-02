
/*export let currentDate = new Date();
const country = "ru";

export function formatDate(currentDate) {
    const date = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    const h = currentDate.getHours().toString().padStart(2, "0");
    const m = currentDate.getMinutes().toString().padStart(2, "0");
  
    return `${date}.${month}.${year}, ${h}:${m}`
   }
  console.log(formatDate(currentDate));
*/

export const formatDateToRu = (date) => {
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  };
  
  // Приводим дату к формату ММ-ДД-ГГГГ ЧЧ:ММ
  export const formatDateToUs = (date) => {
    return `${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}-${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  };
