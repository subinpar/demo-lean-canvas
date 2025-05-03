import axios from 'axios';

function create(baseURL, options) {
  return axios.create({
    baseURL,
    ...options,
  });
}

export const canvases = create(import.meta.env.VITE_API_BASE_URL + '/canvases');
