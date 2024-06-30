const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
  headers: {
    authorization: "227bf20c-afe3-46c1-8a4c-b3685b512683",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const patchUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

export const deleteCardFromServer = (id) => {
  return fetch(`${config.baseUrl}/cards/${id} `, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id} `, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const patchAvatar = (avatarURL) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
