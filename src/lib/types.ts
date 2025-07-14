// export interface Character {
//   name: string;
//   height: string;
//   mass: string;
//   hair_color: string;
//   skin_color: string;
//   eye_color: string;
//   birth_year: string;
//   gender: string;
//   homeworld: string;
//   films: string[];
//   species: [];
//   vehicles: [];
//   starships: string[];
//   created: string;
//   edited: string;
//   url: string;
// }

// export interface ApiResponse {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: Character[];
// }

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
