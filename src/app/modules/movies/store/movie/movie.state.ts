import { ExtendedMovie } from '../../../../models/movie.model';
import { WatchProvider } from '../../../../models/watch-provider.model';
import { Image } from '../../../../models/image.model';
import { Review } from '../../../../models/review.model';
import { Video } from '../../../../models/video.model';

export interface IMovieState {
    selectedMovie: ExtendedMovie;
    watchProviders: WatchProvider[];
    images: Image[];
    reviews: Review[];
    trailer: Video;
}

export const initialMovieState: IMovieState = {
    selectedMovie: null,
    watchProviders: [],
    images: [],
    reviews: [],
    trailer: null,
};
