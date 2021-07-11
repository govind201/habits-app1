// yarn add typescript @types/node @types/react @types/react-dom @types/jest


function formatParams(params) {
  return Object.keys(params)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");
}

function convertToJSON(res) {
  if (!res.ok) {
    throw new Error( `API request failed with response status ${res.status} and text: ${res.statusText}`);
  }

  return res
    .clone()
    .json() 
    .catch((error) => {
      return res.text().then((text) => {
        throw new Error( `API request's result could not be converted to a JSON object: \n${text}`);
      });
    });
}

export function get(endpoint, params = {}) {
  const fullPath = endpoint + "?" + formatParams(params);
  return fetch(fullPath)
    .then(convertToJSON)
    .catch((error) => {
      throw new Error( `GET request to ${fullPath} failed with error:\n${error}`);
    });
}

export function post(endpoint, params = {}) {
  return fetch(endpoint, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(params),
  })
    .then(convertToJSON) 
    .catch((error) => {
      throw new Error(`POST request to ${endpoint} failed with error:\n${error}`);
    });
}