import { createAction, props } from '@ngrx/store';
import { ExtendedMovie } from '../../../../models/movie.model';
import { WatchProvider } from '../../../../models/watch-provider.model';
import { Image } from "../../../../models/image.model";
import { Review } from '../../../../models/review.model';
import { Video } from '../../../../models/video.model';


///DETAILS
export const getMovieDetailsByIdRequest = createAction(
    '[Movie] Get Movie Details By Id Request',
    props<{ id: number }>()
);

export const getMovieDetailsByIdSuccess = createAction(
    '[Movie] Get Movie Details By Id Success',
    props<{ movie: ExtendedMovie }>()
);

export const getMovieDetailsByIdFailure = createAction(
    '[Movie] Get Movie Details By Id Failure'
);

///WATCH PROVIDERS
export const getWatchProviderForMovie = createAction(
    '[Movie] Get Watch Provider For Movie Request',
    props<{ movieId: number }>()
);

export const getWatchProviderForMovieSuccess = createAction(
    '[Movie] Get Watch Provider For Movie Success',
    props<{ watchProviders: WatchProvider[] }>()
);

export const getWatchProviderForMovieFailure = createAction(
    '[Movie] Get Watch Provider For Movie Failure',
);

/// IMAGES

export const getImagesForMovie = createAction(
    '[Movie] Get Images For Movie Request',
    props<{ movieId: number }>()
);

export const getImagesForMovieSuccess = createAction(
    '[Movie] Get Images For Movie Success',
    props<{ images: Image[] }>()
);

export const getImagesForMovieFailure = createAction(
    '[Movie] Get Images For Movie Failure'
);

/// REVIEWS
export const getReviewsForMovie = createAction(
    '[Movie] Get Reviews For Movie Request',
    props<{ movieId: number }>()
);

export const getReviewsForMovieSuccess = createAction(
    '[Movie] Get Reviews For Movie Success',
    props<{ reviews: Review[] }>()
);

export const getReviewsForMovieFailure = createAction(
    '[Movie] Get Reviews For Movie Failure'
);

///VIDEOS 
export const getVideosForMovieRequest = createAction(
    '[Movie] Get Videos For Movie Request',
    props<{ movieId: number }>()
);

export const getVideosForMovieSuccess = createAction(
    '[Movie] Get Videos For Movie Success',
    props<{ trailer: Video }>()
);

export const getVideosForMovieFailure = createAction(
    '[Movie] Get Videos For Movie Failure',
);