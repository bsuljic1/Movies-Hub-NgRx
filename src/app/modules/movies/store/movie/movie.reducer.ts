import { createReducer, Action, on } from '@ngrx/store';
import { IMovieState, initialMovieState } from './movie.state';
import { getImagesForMovie, getImagesForMovieFailure, getImagesForMovieSuccess, getMovieDetailsByIdFailure, getMovieDetailsByIdRequest, getMovieDetailsByIdSuccess, getReviewsForMovie, getReviewsForMovieFailure, getReviewsForMovieSuccess, getVideosForMovieFailure, getVideosForMovieRequest, getVideosForMovieSuccess, getWatchProviderForMovie, getWatchProviderForMovieFailure, getWatchProviderForMovieSuccess } from './movie.actions';

const reducer = createReducer(
    initialMovieState,
    on(getMovieDetailsByIdSuccess,
        (state, { movie }) => ({
            ...state,
            selectedMovie: movie,
            isLoading: false
        })
    ),
    on(getWatchProviderForMovieSuccess,
        (state, { watchProviders }) => ({
            ...state,
            watchProviders,
            isLoading: false
        })
    ),
    on(getImagesForMovieSuccess,
        (state, { images }) => ({
            ...state,
            images,
            isLoading: false
        })
    ),
    on(getReviewsForMovieSuccess,
        (state, { reviews }) => ({
            ...state,
            reviews,
            isLoading: false
        })
    ),
    on(getVideosForMovieSuccess,
        (state, { trailer }) => ({
            ...state,
            trailer,
            isLoading: false
        })
    ),
    on(getVideosForMovieFailure,
        getReviewsForMovieFailure,
        getImagesForMovieFailure,
        getWatchProviderForMovieFailure,
        getMovieDetailsByIdFailure,
        (state) => ({
            ...state,
            isLoading: false
        })
    ),
    on(getVideosForMovieRequest,
        getReviewsForMovie,
        getImagesForMovie,
        getWatchProviderForMovie,
        getMovieDetailsByIdRequest,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
);

export function movieReducer(state: IMovieState, action: Action): IMovieState {
    return reducer(state, action);
}
