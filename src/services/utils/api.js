import { SERVER_API } from "./constants";

export async function handleResponse(res) {
  const jsonData = await res.json();
  if (!res.ok) {
    throw new Error(jsonData.message);
  }
  return jsonData;
}

export const postRequest = async (type, options) => {
  const res = await fetch(`${SERVER_API + type}`, options);
  return res;
};

export const patchRequest = async (type, data, token) => {
  const res = await fetch(`${SERVER_API + type}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  });
  return res;
};

export const refreshToken = (type) => {
  return fetch(`${SERVER_API + type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => handleResponse(res));
};

export const fetchWithRefresh = async (type, options) => {
  try {
    const res = await fetch(`${SERVER_API + type}`, options);
    return await handleResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken("/auth/token");
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${SERVER_API + type}`, options);
      console.log("успешно перезахожу");
      return await handleResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
