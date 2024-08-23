import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Home from "../../../Home";

const feature = loadFeature(
  "./src/pages/Home/__tests__/features/Home-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("User navigates to Home", ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper<typeof Home>;
    let instance: Home;

    given("User is loading Home Page", () => {
      HomeWrapper = shallow(<Home />);
    });

    when("I successfully load Home Page", () => {
      instance = HomeWrapper.instance() as Home;
    });

    then("User will see the Home Page components", () => {
      expect(HomeWrapper.find("SearchBar")).toHaveLength(1);
      expect(HomeWrapper.find("InfiniteScroll")).toHaveLength(1);
      expect(HomeWrapper.find("PokemonList")).toHaveLength(1);
    });
  });

  test("User searches for a Pokemon", ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper<typeof Home>;
    let instance: Home;

    given("User is on the Home Page", () => {
      HomeWrapper = shallow(<Home />);
      instance = HomeWrapper.instance() as Home;
    });

    when("User enters a Pokemon name in the search bar", () => {
      instance.handleSearch("pikachu");
    });

    then("The Pokemon list should update with the search result", () => {
      expect(instance.state.pokemonQuery).toBe("pikachu");
      expect(instance.state.offset).toBe(0);
    });
  });

  test("User loads more Pokemon", ({ given, when, then }) => {
    let HomeWrapper: ShallowWrapper<typeof Home>;
    let instance: Home;

    given("User is on the Home Page with a list of Pokemon", () => {
      HomeWrapper = shallow(<Home />);
      instance = HomeWrapper.instance() as Home;
      instance.setState({
        pokemonList: [
          { name: "bulbasaur", url: "bulbasaur-url" },
          { name: "charmander", url: "charmander-url" },
        ],
        hasMore: true,
      });
    });

    when("User scrolls down to load more Pokemon", async () => {
      await instance.fetchMoreData();
    });

    then("More Pokemon should be added to the list", () => {
      expect(instance.state.pokemonList.length).toBeGreaterThan(2);
      expect(instance.state.hasMore).toBe(true);
    });
  });
});
