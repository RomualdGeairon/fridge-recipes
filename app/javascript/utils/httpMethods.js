export const GET = (url) => fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .catch((error) => console.error(error.message));

const factory = (method) => (url, body) => {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  return fetch(url, {
    method,
    headers: {
      'X-CSRF-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
    .catch((error) => console.error(error.message));
};

export const POST = factory('POST');
export const DELETE = factory('DELETE');
