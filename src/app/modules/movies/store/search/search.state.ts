import { Movie } from '../../../../models/movie.model';

export interface ISearchState {
    searchQuery: string;
    searchResult: Movie[]
}

export const initialSearchState: ISearchState = {
    searchQuery: '',
    searchResult: []
};
