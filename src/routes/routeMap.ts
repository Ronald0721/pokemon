import { ComponentType } from "react";
import { Home, PokemonView } from "../pages";

interface RouteType {
  component: ComponentType;
  path: string;
  exact?: boolean;
}

const routeMap: Array<RouteType> = [
  {
    component: Home,
    path: "/",
    exact: true,
  },
  {
    component: PokemonView,
    path: "/pokemon/:id",
    exact: true,
  },
];

export default routeMap;
