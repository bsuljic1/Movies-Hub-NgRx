import { Genre } from "./genre.model";
import { Language } from "./language.model";
import { ProductionCompany } from "./production-company.model";
import { ProductionCountry } from "./production-country.model";

export interface Movie {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    vote_average: number;
    vote_count: number;
    rating: number;
};

export interface ExtendedMovie extends Movie {
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    homepage: string; // trailer url
    imdb_id: string;
    runtime: number;
    spoken_languages: Language[];
    genres: Genre[];
}