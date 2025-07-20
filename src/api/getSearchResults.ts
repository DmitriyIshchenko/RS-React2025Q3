import { API_URL } from '../lib/constants';

export async function getSearchResults(searchQuery: string) {
  const req = await fetch(
    `${API_URL}?page=1${searchQuery ? `&name=${searchQuery.trim()}` : ''}`
  );

  if (req.status === 404) return [];

  if (!req.ok) throw new Error(`HTTP Error! (${req.status})`);

  const data = await req.json();

  return data.results;
}
