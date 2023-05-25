export const fetchData = async (url) => {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData.data;
};

export const postData = async (url, data) => {
  const postResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  });
  return postResponse;
};
