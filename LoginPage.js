import { login, setToken, token } from "./api.js";


export const renderLogin = ({listElement, listElementData}) => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <h1>Страница входа</h1>
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <input type="text" id="login-input" class="input" placeholder="Логин" />
      <input type="text" id="password-input" class="input" placeholder="Пароль"
      <button class="button" id="login-button">Войти</button>
      <a class="form-register" href="#" id="register">Зарегистрироваться</a>
    </div>
    <a class="form-item" href="index.html" id="link-to-login">Перейти к комментариям</a>
</div>
    `;

    appElement.innerHtml = loginHtml;

    const buttonElement = document.getElementById('login-button');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');

   

    buttonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
        .then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
        })
        .then(() => {
            fetchGet({ listElementData });
            appElement.style.display = "none";
            listElement.style.display = "flex";
            formElement.style.display = "flex";
        })
    });

    const linkElement = document.getElementById("link-registration");

    linkElement.addEventListener("click", () => {
        renderRegistration({ listElement, listElementData });
    })

};