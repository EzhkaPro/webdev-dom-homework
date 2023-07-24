const commentsURL = 'https://wedev-api.sky.pro/api/v2/galina-lukianova/comments';
const loginURL = "https://wedev-api.sky.pro/api/user/login";
const userURL = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function getComments() {
    return fetch(commentsURL, {
        method: "GET",
        //headers: {
        //   Authorization:`Bearer ${token}`,
        // },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации")
            }
            return response.json();
        })
}

export function postComments({ text, name }) {
    return fetch(commentsURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: true,
        })
            .then((response) => {
                if (response.status === 201) {
                    document.getElementById('comment-hover').style.display = 'none';   
                }
                 if (response.status === 400) {
                    throw new Error("Количество символов в сообщении должно быть больше 3");
                }
                if (response.status === 500) {
                    throw new Error("Кажется что-то пошло не так, попробуйте позже"); 
                } else {
                    return response.json();
                };
            })
    })
}


export function login({ login, password }) {
    return fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Введен неправильный логин или пароль');
            }
            else {
                return response.json();
            }
        })
}

export function registration({ name, login, password }) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Пользователь с таким логином уже сущетсвует');
            }
            else {
                return response.json();
            }
        })
}