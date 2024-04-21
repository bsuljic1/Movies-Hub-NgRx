import { MovieRegion } from "./movie-region.model";

export interface ProvidersResponse {
    results: {
        [region: string]: MovieRegion;
    };
};