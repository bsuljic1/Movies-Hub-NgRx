import { WatchProvider } from "./watch-provider.model";

export interface MovieRegion {
    link: string;
    buy: WatchProvider[];
    rent: WatchProvider[];
    flatrate: WatchProvider[];
  }