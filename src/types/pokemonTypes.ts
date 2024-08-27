export interface Pokemon {
  name: string;
  url?: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  name: string;
  height: string;
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
    url: string;
  };
  types: PokemonType[];
  stats: Stats[];
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface TextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}
