import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Home from "../../../Home";
import { SearchBar, PokemonList } from "../../../../components";
import { getPokemon, getPokemons } from "../../../../services/getPokemons";
import { Pokemon, PokemonDetails } from "../../../../types/pokemonTypes";

const feature = loadFeature(
  "./src/pages/Home/__tests__/features/Home-scenario.feature"
);

jest.mock("../../../../services/getPokemons");

defineFeature(feature, (test) => {
  let HomeWrapper: ShallowWrapper<typeof Home>;
  let instance: Home;

  const mockPokemon: PokemonDetails = {
    name: "pikachu",
    height: "7",
    sprites: {
      front_default: "https://example.com/pikachu.png",
    },
    types: [
      {
        type: {
          name: "grass",
          url: "https://example.com/pikachu.png",
        },
        slot: 0,
      },
    ],
    stats: [
      {
        base_stat: 45,
        stat: {
          name: "hp",
          url: "",
        },
        effort: 0,
      },
    ],
    species: {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon-species/25/",
    },
  };

  const mockPokemons: Pokemon[] = [
    { name: "bulbasaur", url: "bulbasaur_url" },
    { name: "charmander", url: "charmander_url" },
    { name: "squirtle", url: "squirtle_url" },
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Home", ({ given, when, then }) => {
    given("User is loading Home Page", () => {
      (getPokemons as jest.Mock).mockResolvedValue({
        pokemons: mockPokemons,
        hasMore: true,
      });
      HomeWrapper = shallow(<Home />);
      instance = HomeWrapper.instance() as Home;
    });

    when("I successfully load Home Page", () => {
      // Setup already done in given
    });

    then("User will see the Home Page components", () => {
      expect(HomeWrapper.find(SearchBar)).toHaveLength(1);
      expect(HomeWrapper.find(PokemonList)).toHaveLength(1);
    });
  });

  test("User searches for a Pokemon", ({ given, when, then }) => {
    given("User is on the Home Page", () => {
      (getPokemon as jest.Mock).mockResolvedValue(mockPokemon);
      HomeWrapper = shallow(<Home />);
      instance = HomeWrapper.instance() as Home;
    });

    when("User enters a Pokemon name in the search bar", async () => {
      instance.componentDidMount();
      instance.handleSearch("pikachu");
      HomeWrapper.update();
    });

    then("The Pokemon list should update with the search result", () => {
      expect(instance.state.pokemonQuery).toBe("pikachu");
      expect(instance.state.pokemonList.length).toBe(1);
      expect(instance.state.pokemonList).toEqual([mockPokemon]);
      expect(instance.state.hasMore).toBe(false);
    });
  });

  test("User searches for an unknown Pokemon", ({ given, when, then }) => {
    given("User is on the Home Page", () => {
      (getPokemon as jest.Mock).mockRejectedValue(
        new Error("Pokemon not found")
      );
      HomeWrapper = shallow(<Home />);
      instance = HomeWrapper.instance() as Home;
    });

    when("User enters an unknown Pokemon name in the search bar", async () => {
      instance.componentDidMount();
      instance.handleSearch("pikachow");
      HomeWrapper.update();
    });

    then("The user should see an error message", () => {
      const errorMessage = HomeWrapper.find(".error-message").text();
      expect(errorMessage).toMatch(/Oops/);
      expect(instance.state.pokemonList.length).toBe(0);
    });
  });

  test("User loads more Pokemon", ({ given, when, then }) => {
    given("User is on the Home Page with a list of Pokemon", () => {
      (getPokemons as jest.Mock).mockResolvedValue({
        pokemons: mockPokemons,
        hasMore: false,
      });
      HomeWrapper = shallow(<Home />);
      instance = HomeWrapper.instance() as Home;
      instance.setState({
        pokemonList: mockPokemons,
        hasMore: true,
      });
    });

    when("User scrolls down to load more Pokemon", async () => {
      await instance.fetchMoreData();
      HomeWrapper.update();
    });

    then("More Pokemon should be added to the list", () => {
      const pokemonList = HomeWrapper.find(PokemonList).props().pokemons;
      expect(pokemonList.length).toBeGreaterThan(mockPokemons.length);
      expect(instance.state.hasMore).toBe(false);
    });
  });
});
