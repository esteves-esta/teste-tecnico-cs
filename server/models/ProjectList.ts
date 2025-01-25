import type { Project } from "./Project";

export class ProjectListResponse {
  projects: Project[] = [];
  total: number = 0;
}
export type sort_types = 'default' | 'recent' | 'ending';

export class ProjectListRequest {
  favoritesOnly = false;
  sort: sort_types = 'default';
  query?: string;
}

