import { Movie } from '../../../../models/movie.model';

export interface ISearchState {
    searchQuery: string;
    searchResult: Movie[];
    isLoading: boolean;
}

export const initialSearchState: ISearchState = {
    searchQuery: null,
    searchResult: [],
    isLoading: false
};
