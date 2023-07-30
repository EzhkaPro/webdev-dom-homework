import { appElement, formElement } from "./main.js";
import { login, registration, setToken } from "./api.js";
import { renderLogin } from "./LoginPage.js";

export const renderRegistration = ({ listElement, comments }) => {
    const linkElement = document.getElementById("register");//из LoginPage
    linkElement.addEventListener('click', () => {
        const registrationElementHtml = `
    <div class="add-form" id="register-add-form">
        <h3 class="form-title">Форма регистрации</h3>
        <input type="text" id="name-input-registration" class="input" placeholder="Имя">
            <input type="text" id="login-input-registration" class="input" placeholder="Логин" >
                <input type="text" id="password-input-registration" class="input" placeholder="Пароль" >
                    <button class="add-form-button" id="login-button-registration">Зарегистрироваться</button>
                    <a class="link form-register-comment" href="#" id="register-comment">Войти</a>                 
                </div>
    `;

        appElement.innerHTML = registrationElementHtml;

        const buttonRegistrationElement = document.getElementById("login-button-registration");
        const nameInputElement = document.getElementById("name-input-registration");
        const loginInputElement = document.getElementById("login-input-registration");
        const passwordInputElement = document.getElementById("password-input-registration");
        const registerAddForm = document.getElementById("register-add-form");
        const buttonRegisterComment = document.getElementById("register-comment");

        buttonRegistrationElement.addEventListener("click", () => {
            registration({
                name: nameInputElement.value,
                login: loginInputElement.value,
                password: passwordInputElement.value,
            })
                .then((response) => {
                    return response;
                })
                .then((responseData) => {
                    login({
                        login: responseData.user.login,
                        password: responseData.user.password,
                    })
                    console.log(responseData);
                    setToken(responseData.user.token);
                    nameInputElement.value = responseData.user.name;
                    localStorage.setItem('name', responseData.user.name)
                    localStorage.setItem('token', responseData.user.token)
                    return responseData.user.name
                })
                .then(() => {
                    appElement.style.display = "flex";
                    listElement.style.display = "flex";
                    registerAddForm.style.display = "none";
                    formElement.style.display = "flex";
                })
                .catch((error) => {
                    if (error.message === 'Пользователь с таким логином уже сущетсвует') {
                        appElement.style.display = "none";
                        registerAddForm.style.display = "flex";
                        alert(error.message);
                    }
                });

           // nameInputElement.value = "";
            loginInputElement.value = "";
            passwordInputElement.value = "";
        })
        renderLogin({ listElement, comments });
    })

    /*buttonRegisterComment.addEventListener("click", () => {
         listElement.style.display = "none";
         loginAddForm.style.display = "flex";
    })
    renderLogin({ listElement, comments });*/
};

