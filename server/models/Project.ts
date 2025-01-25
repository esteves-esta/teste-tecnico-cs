import type { DateValue } from "@internationalized/date";

export class Project {
  [key: string]: string | undefined | DateValue | ArrayBuffer | boolean
  id: string = crypto.randomUUID();
  name: string = "";
  client: string = "";
  date_start: DateValue | undefined;
  date_end: DateValue | undefined;
  cover_url?: string | ArrayBuffer;
  isFavorite: boolean = false;
}
