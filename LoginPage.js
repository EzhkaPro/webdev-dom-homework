import { nameInputElement, formElement, listElement, appElement } from "./main.js";
import { login, setToken } from "./api.js";
import { renderRegistration } from "./registrationPage.js";


export const renderLogin = ({ listElement, comments }) => {
    for (const linkLoginPageElement of document.querySelectorAll('.link-login-page')) { //из HTML кнопка авторизоваться
        linkLoginPageElement.addEventListener('click', () => {
            const loginElementHtml = `
    <div class="add-form" id="login-add-form">
      <h3 class="form-title">Форма входа</h3>
      <input type="text" id="login-input" class="input" placeholder="Введите логин"  />
      <input type="text" id="password-input" class="input" placeholder="Введите пароль">
      <button class="add-form-button" id="login-button" >Войти</button>
      <a class="link form-register" href="#" id="register">Зарегистрироваться</a>
    </div>
    `;

            appElement.innerHTML = loginElementHtml;

            listElement.style.display = "none";
            for (const loginPageElement of document.querySelectorAll('.login-page')) {
                loginPageElement.style.display = "none";
             }


            const loginAddForm = document.getElementById("login-add-form");
            const loginInputElement = document.getElementById("login-input");
            const passwordInputElement = document.getElementById("password-input");
            const buttonLoginElement = document.getElementById("login-button");


            buttonLoginElement.addEventListener('click', () => {
                login({
                    login: loginInputElement.value,
                    password: passwordInputElement.value,
                })
                    .then((responseData) => {
                        console.log(responseData);
                        setToken(responseData.user.token)
                        nameInputElement.value = responseData.user.name;
                        localStorage.setItem('name', responseData.user.name)
                        localStorage.setItem('token', responseData.user.token)
                        return responseData.user.name
                    })
                    .then(() => {
                            appElement.style.display = "flex";
                            listElement.style.display = "flex";
                            loginAddForm.style.display = "none";
                            formElement.style.display = "flex";                      
                    })
                    .catch((error) => {
                        if (error.message === 'Введен неправильный логин или пароль') {
                            listElement.style.display = "none";
                            loginAddForm.style.display = "flex";
                            alert(error.message);                                              
                        }
                    })
                loginInputElement.value = "";
                passwordInputElement.value = "";
            });
            renderRegistration({ listElement, comments });
        })
    }
};