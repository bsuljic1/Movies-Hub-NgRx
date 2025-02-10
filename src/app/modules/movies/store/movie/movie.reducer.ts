import { createReducer, Action, on } from '@ngrx/store';
import { IMovieState, initialMovieState } from './movie.state';
import { getImagesForMovieSuccess, getMovieDetailsByIdSuccess, getReviewsForMovieSuccess, getVideosForMovieSuccess, getWatchProviderForMovieSuccess } from './movie.actions';

const reducer = createReducer(
    initialMovieState,
    on(getMovieDetailsByIdSuccess,
        (state, { movie }) => ({
            ...state,
            selectedMovie: movie
        })
    ),
    on(getWatchProviderForMovieSuccess,
        (state, { watchProviders }) => ({
            ...state,
            watchProviders
        })
    ),
    on(getImagesForMovieSuccess,
        (state, { images }) => ({
            ...state,
            images
        })
    ),
    on(getReviewsForMovieSuccess,
        (state, { reviews }) => ({
            ...state,
            reviews
        })
    ),
    on(getVideosForMovieSuccess,
        (state, { trailer }) => ({
            ...state,
            trailer,
            isLoading: false
        })
    )
);

export function movieReducer(state: IMovieState, action: Action): IMovieState {
    return reducer(state, action);
}
