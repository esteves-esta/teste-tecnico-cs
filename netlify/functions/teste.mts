
import type { Config } from "@netlify/functions";

export default async () => {

  return new Response('ola')
};

export const config: Config = {
  path: "/api/teste",
};

