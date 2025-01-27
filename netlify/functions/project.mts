import Handler from './controllers/projectsController'
import type { Config, Context } from "@netlify/functions";
import { ProjectListRequest, sort_types } from './models/ProjectList';

export default async (req: Request, context: Context) => {
  let response;

  const { id } = context.params;

  try {
    switch (req.method) {
      case 'GET':
        {
          if (id) {
            console.log({ id })
            response = await Handler.get(id);
            break;
          }
          const searchParams = context.url.searchParams
          const request: ProjectListRequest = {
            favoritesOnly: searchParams.get('favoritesOnly') == 'true',
            query: searchParams.get('query') as string,
            sort: searchParams.get('sort') as sort_types
          }
          response = await Handler.list(request);
          break;
        }
      case 'POST':
        {
          const body = await req.json();
          response = await Handler.create(body.project)
          break;
        }
      case 'PUT':
        {
          if (context.url.toString().includes('favorite')) {
            response = await Handler.toggleFavorite(id);
            break;

          }
          const body = await req.json();
          response = await Handler.edit(body.project)
          break;
        }
      case 'DELETE':
        {
          response = await Handler.remove(id);
          break;
        }

      default:
        {
          response = {
            body: '',
            status: 400
          }
        }
    }
  }
  catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 })
  }

  return Response.json(response.body, { status: response.status })
};

export const config: Config = {
  path: ["/api/project", "/api/project/:id", "/api/project/favorite/:id"],
};

