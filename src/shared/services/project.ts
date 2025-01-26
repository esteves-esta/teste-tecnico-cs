import type { ProjectListRequest } from "@/shared/models/ProjectList";
import type { Project } from "@/shared//models/Project";
import http from '@/config/https';

const API_ROUTE = "project/";

async function create(project: Project) {
  try {
    const response = await http.post(`${API_ROUTE}`, { project });
    return response.data;

  } catch (error) {
    throw error;
  }
}
async function edit(project: Project) {
  try {
    const response = await http.put(`${API_ROUTE}`, { project });
    return response.data;

  } catch (error) {

    throw error;
  }
}
async function get(id: string) {
  try {
    const response = await http.get(`${API_ROUTE}/${id}`);
    return response.data;
  } catch (error) {

    throw error;
  }
}
async function list(request: ProjectListRequest) {
  try {
    const { favoritesOnly, sort, query } = request;

    let filters = "";
    if (favoritesOnly) filters += `favoritesOnly=${favoritesOnly}&`
    if (query) filters += `query=${query}&`;
    if (sort) filters += `sort=${sort}`;

    const response = await http.get(`${API_ROUTE}?${filters}`);
    return response.data;
  } catch {
    return { projects: [], total: 0 }
  }
}
async function toggleFavorite(id: string) {
  try {
    const response = await http.put(`${API_ROUTE}/favorite/${id}`);
    return response.data;

  } catch (error) {
    throw error;
  }
}
async function remove(id: string) {
  try {
    const response = await http.delete(`${API_ROUTE}/${id}`);
    return response.data;

  } catch (error) {
    throw error;
  }
}

export default {
  create, edit, list, toggleFavorite, remove, get
}



