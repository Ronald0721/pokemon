export const getPokemonSpecies = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon details");
    }

    const species = await response.json();
    return species;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Pokemon species: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
