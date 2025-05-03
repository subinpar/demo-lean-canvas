import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export async function getCanvases(params) {
  const payload = {
    _sort: 'lastModified',
    _order: 'desc',
    ...params,
  };

  const { data } = await canvases.get('/', { params: payload });
  return Array.isArray(data) ? data : data.canvases; // 오류 방지
}

export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  return canvases.post('/', newCanvas);
}

export async function deleteCanvas(id) {
  await canvases.delete(`/${id}`);
}

export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  await canvases.patch(`/${id}`, { title });
}

export async function updateCanvas(id, canvas) {
  await canvases.put(`/${id}`, canvas);
}
