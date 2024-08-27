import axios from "axios";

export const getPokemonSpecies = async (url: string) => {
  try {
    const response = await axios.get(url);
    const species = response.data;
    return species;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Pokemon species: ${error.message}`);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
