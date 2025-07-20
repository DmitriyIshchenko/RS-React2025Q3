import { http, HttpResponse } from 'msw';
import { API_URL } from '../../lib/constants';

export const handlers = [
  http.get(API_URL, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'Rick') {
      return HttpResponse.json({
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [{ id: 1, name: 'Rick Sanchez', status: 'Alive' }],
      });
    }

    if (name === 'Invalid') {
      return new HttpResponse(
        { error: 'There is nothing here' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      results: [],
    });
  }),
];
