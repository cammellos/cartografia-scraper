const axios = require('axios');

export default function fetchHTML(url) {
  return axios.get(url).then(response => response.data);
}
