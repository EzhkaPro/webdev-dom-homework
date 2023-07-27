import { appElement, formElement } from "../main.js";
import { login, registration, setToken } from "./api.js";
import { renderLogin } from "./LoginPage.js";

export const renderRegistration = ({ listElement, comments }) => {

    const registrationHtml = `
    <div class="add-form" >
        <h3 class="form-title">Форма регистрации</h3>
        <input type="text" id="name-input-registration" class="input" placeholder="Имя">
            <input type="text" id="login-input-registration" class="input" placeholder="Логин" >
                <input type="text" id="password-input-registration" class="input" placeholder="Пароль" >
                    <button class="add-form-button" id="login-button-registration">Зарегистрироваться</button>                 
                </div>
    `;

                appElement.innerHTML = registrationHtml;

                const buttonRegistrationElement = document.getElementById("login-button-registration");
                const nameInputElement = document.getElementById("name-input-registration");
                const loginInputElement = document.getElementById("login-input-registration");
                const passwordInputElement = document.getElementById("password-input-registration");
            

                buttonRegistrationElement.addEventListener("click", () => {
                    registration({
                        name: nameInputElement.value,
                        login: loginInputElement.value,
                        password: passwordInputElement.value,
                    })
                        .then((response) => {
                            alert('Новый пользователь успешно зарегистрирован');
                            return response;
                        })
                        .then((responseData) => {
                            login({
                                login: responseData.user.login,
                                password: responseData.user.password,
                            })
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
                            if (error.message === 'Пользователь с таким логином уже сущетсвует') {
                                alert(error.message);
                            }     
                            console.warn(error);
                        });

                nameInputElement.value ="";
                loginInputElement.value = "";
                passwordInputElement.value = "";
            })
                renderLogin({listElement, comments});
};