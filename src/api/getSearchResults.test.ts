import { getSearchResults } from './getSearchResults';
import { server } from '../test-utils/mocks/node';
import { mockCharacters } from '../test-utils/mocks/data/characters';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('API Integration Tests', () => {
  test('returns results for successful search', async () => {
    const results = await getSearchResults('Rick');
    expect(results).toEqual([mockCharacters[0]]);
  });

  test('returns empty array for 404 status', async () => {
    const results = await getSearchResults('NotFound');
    expect(results).toEqual([]);
  });

  test('throws error for server errors', async () => {
    await expect(getSearchResults('ServerError')).rejects.toThrow(
      'HTTP Error! (500)'
    );
  });
});
