import axios from 'axios';

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }), options);
  return instance;
}

//export const canvases = create(
//'http://json-server-vercel-blue-nine.vercel.app/canvases/',
//);
export const canvases = create(`${import.meta.env.VITE_API_BASE_URL}/canvases`);
