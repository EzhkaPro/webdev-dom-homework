export function mainGetComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/:galina-lukianova/comments', {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
}

export function mainPostComments({text, name, date}) {
    return fetch('https://wedev-api.sky.pro/api/v1/:galina-lukianova/comments', {
        method: "POST",
        body: JSON.stringify({
            name: name,
            date: date,
            likes: 0,
            text: text,
            isLiked: false,
            forceError: true,
        })
    })
}