export class Project {
  id: string = crypto.randomUUID();
  name: string = "";
  client: string = "";
  date_start: Date | null = null;
  date_end: Date | null = null;
  cover_url?: string;
  isFavorite: boolean = false;
}
