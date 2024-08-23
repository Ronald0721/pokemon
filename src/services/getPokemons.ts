interface Pokemon {
  name: string;
  url: string;
}

export const getPokemons = async (
  limit: number,
  offset: number
): Promise<{
  pokemons: Pokemon[];
  hasMore: boolean;
}> => {
  let pokemons: Pokemon[] = [];
  let hasMore = false;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      pokemons = data.results;
      hasMore = data.results.length > 0;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to fetch Pokemon list: ${error.message}`);
    }
  }

  return { pokemons, hasMore };
};

export const getPokemon = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const pokemon = await response.json();
      return pokemon;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Pokemon details: ${error.message}`);
    }
  }
};
