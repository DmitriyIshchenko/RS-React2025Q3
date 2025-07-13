import { API_URL } from '../lib/constants';

export async function getSearchResults(searchQuery: string) {
  const req = await fetch(`${API_URL}/search?q=${searchQuery}&limit=10`);

  const data = await req.json();

  return data.recipes;
}
