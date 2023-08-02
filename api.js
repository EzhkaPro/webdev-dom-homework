const commentsURL = 'https://wedev-api.sky.pro/api/v2/galina-lukianova/comments';
const loginURL = "https://wedev-api.sky.pro/api/user/login";
const userURL = "https://wedev-api.sky.pro/api/user";
import _ from 'lodash';

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function getComments() {
    return fetch(commentsURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
};

export function postComments({ text, name }) {
    return fetch(commentsURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: _.capitalize(name),
            text: _.capitalize(text),
            likes: 0,
            isLiked: false,
            forceError: true,
        })
    })
};


export function likeComment({ id }) {
    return fetch(`${commentURL}/${id}/toggle-like`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error('Авторизуйтесь чтобы ставить лайки');
            }
        })
}

export function login({ login, password }) {
    return fetch(loginURL, {
        method: "POST",
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }
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
            name: _.capitalize(name),
            login: login,
            password: password,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                alert('Вы успешно зарегистрировались')
            }
            if (response.status === 400) {
                throw new Error('Пользователь с таким логином уже сущетсвует');
            }
            else {
                return response.json();
            }
        })
}