export const getPokemonSpecies = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const species = await response.json();
      return species;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Pokemon species: ${error.message}`);
    }
  }
};
