import { http, HttpResponse } from 'msw';
import { API_URL } from '../../lib/constants';
import type { SuccessResponse, ErrorResponse } from '../../lib/types';
import { mockCharacters } from './data/characters';

export const handlers = [
  http.get(`${API_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('name');

    if (searchQuery === 'Rick') {
      const successResponse: SuccessResponse = {
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [mockCharacters[0]],
      };
      return HttpResponse.json(successResponse, { status: 200 });
    }

    if (searchQuery === 'ErrorCase') {
      const errorResponse: ErrorResponse = {
        error: 'There is nothing here',
      };
      return HttpResponse.json(errorResponse, { status: 404 });
    }

    if (searchQuery === 'ServerError') {
      return new HttpResponse(null, { status: 500 });
    }

    const defaultResponse: SuccessResponse = {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
    return HttpResponse.json(defaultResponse, { status: 200 });
  }),
];
