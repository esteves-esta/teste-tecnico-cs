import type { DateValue } from "@internationalized/date";

export class Project {
  id: string = crypto.randomUUID();
  name: string = "";
  client: string = "";
  date_start: DateValue | undefined;
  date_end: DateValue | undefined;
  cover_url?: string;
  isFavorite: boolean = false;
}
