import http from '@/config/https';

const API_ROUTE = "searchHistory";

async function save(query: string) {
  try {
    const response = await http.post(`${API_ROUTE}`, { query });
    return response.data;

  } catch (error) {

    throw error;
  }
}
async function get() {
  try {
    const response = await http.get(`${API_ROUTE}`);
    return response.data.history;

  } catch (error) {

    throw error;
  }
}
async function remove(query: string) {
  try {
    const response = await http.delete(`${API_ROUTE}/${query}`);
    return response.data;

  } catch (error) {

    throw error;
  }
}
export default {
  save, get, remove
}
