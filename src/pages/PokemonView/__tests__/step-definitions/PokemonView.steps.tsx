import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import { PokemonView } from "../..";
import { getPokemon } from "../../../../services/getPokemons";
import { getPokemonSpecies } from "../../../../services/getPokemonSpecies";
import { PokemonDetails } from "../../../../types/pokemonTypes";
import { RouteComponentProps } from "react-router-dom";
import { Typography } from "@material-ui/core";

const feature = loadFeature(
  "./src/pages/PokemonView/__tests__/features/PokemonView-scenario.feature"
);

jest.mock("../../../../services/getPokemons");
jest.mock("../../../../services/getPokemonSpecies");

interface RouteParams {
  id: string;
}

defineFeature(feature, (test) => {
  let props: RouteComponentProps<RouteParams>;
  let wrapper: ShallowWrapper;
  let instance: PokemonView;

  const mockPokemonDetails: PokemonDetails = {
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

  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn();
    props = {
      match: {
        isExact: true,
        params: { id: "pikachu" },
        path: "/pokemon/:id",
        url: "/pokemon/pikachu",
      },
      history: {
        length: 1,
        push: jest.fn(),
        replace: jest.fn(),
        go: jest.fn(),
        goBack: jest.fn(),
        goForward: jest.fn(),
        block: jest.fn(),
        listen: jest.fn(),
        createHref: jest.fn(),
        location: { pathname: "", search: "", state: {}, hash: "" },
        action: "PUSH",
      },
      location: {
        pathname: "",
        search: "",
        state: {},
        hash: "",
      },
    };

    (getPokemon as jest.Mock).mockResolvedValue(mockPokemonDetails);
    (getPokemonSpecies as jest.Mock).mockResolvedValue({
      flavor_text_entries: [
        {
          flavor_text: "A cute Pokemon.",
          language: {
            name: "en",
            url: "https://example.com/language",
          },
        },
      ],
    });

    wrapper = shallow(<PokemonView {...props} />);
    instance = wrapper.instance() as PokemonView;
  });

  test("User views Pokemon View Page", ({ given, when, then }) => {
    given("User navigates to the Pokemon view page", () => {
      // Already initialized in beforeEach
    });

    when("the Pokemon data is fetched successfully", async () => {
      await instance.componentDidMount();
      wrapper.update();
    });

    then("user will see the Pokemon's name and image", () => {
      const typography = wrapper.find(Typography).first();
      expect(typography.prop("component")).toBe("h1");
      expect(typography.text()).toBe("pikachu");
      expect(wrapper.find("img").prop("src")).toBe(
        "https://example.com/pikachu.png"
      );
    });
  });
});
