import { API_URL } from '../lib/constants';

export async function getSearchResults(searchQuery: string) {
  const req = await fetch(
    `${API_URL}?page=1${searchQuery ? `&search=${searchQuery}` : ''}`
  );

  const data = await req.json();

  return data.results;
}
