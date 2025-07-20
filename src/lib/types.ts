export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Character extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface ErrorResponse {
  error: string;
}

export interface SuccessResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
export type ApiResponse = SuccessResponse | ErrorResponse;
