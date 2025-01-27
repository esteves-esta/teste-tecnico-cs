
import type { Config, Context } from "@netlify/functions";
import Handler from './controllers/searchHistoryController'

export default async (req: Request, context: Context) => {
  let response;

  try {
    switch (req.method) {
      case 'GET':
        response = await Handler.getHistory();
        break;
      case 'POST':
        const body = await req.json();
        response = await Handler.saveHistory(body.query)
        break;
      case 'DELETE':
        const { query } = context.params;
        response = await Handler.remove(query);
        break;

      default:
        response = {
          status: 404
        }
    }
  }
  catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 })
  }

  return Response.json(response.body, { status: response.status })
};

export const config: Config = {
  path: ["/api/search-history", "/api/search-history/:query"],
};


/* export const config: Config = {
  path: ["/sale/*", "/item/:sku"]
}; */
