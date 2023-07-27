import { appElement, formElement, nameInputElement } from "../main.js";
import { login, setToken, token } from "./api.js";
import { renderRegistration } from "./registrationPage.js";

export const renderLogin = ({ listElement, comments }) => {
    for (const linkLoginPageElement of document.querySelectorAll('.link-login-page')) {
        linkLoginPageElement.addEventListener('click', () => {
            const loginHtml = `
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <input type="text" id="login-input" class="input" placeholder="Логин" />
      <input type="text" id="password-input" class="input" placeholder="Пароль"
      <button class="add-form-button" id="login-button" >Войти</button>
      <a class="form-register" href="#" id="register">Зарегистрироваться</a>
    </div>
    `;
            appElement.innerHtml = loginHtml;

            listElement.style.display = "none";
            for (const loginPageElement of document.querySelectorAll('.login-page')) {
                loginPageElement.style.display = "none";
            }

            const buttonLoginElement = document.getElementById("login-button");
            const loginInputElement = document.getElementById("login-input");
            const passwordInputElement = document.getElementById("password-input");

            buttonLoginElement.addEventListener('click', () => {
                login({
                    login: loginInputElement.value,
                    password: passwordInputElement.value,
                })
                    .then((responseData) => {
                        setToken(responseData.user.token);
                        nameInputElement.value = responseData.user.name;
                    })
                    .then(() => {
                        mainGetComments({ comments });
                        appElement.style.display = "none";
                        listElement.style.display = "flex";
                        formElement.style.display = "flex";
                    })
                    .catch((error) => {
                        if (error.message === 'Введен неправильный логин или пароль') {
                            alert(error.message);
                        }
                        console.warn(error);
                    });

                loginInputElement.value = "";
                passwordInputElement.value = "";
            });

            const linkElement = document.getElementById("register");

            linkElement.addEventListener("click", () => {
                renderRegistration({ listElement, comments });
            })
        })
    }
};