import { Injectable } from '@angular/core';
import { MovieStore } from './movie.store';
import { ExtendedMovie } from '../../../../models/movie.model';
import { WatchProvider } from '../../../../models/watch-provider.model';
import { Image } from '../../../../models/image.model';
import { Review } from '../../../../models/review.model';
import { Video } from '../../../../models/video.model';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImageResponse } from '../../../../models/image-response.model';
import { ReviewResponse } from '../../../../models/review-response.model';
import { VideoResponse } from '../../../../models/video-response.model';
import { ProvidersResponse } from '../../../../models/providers-response.model';

const apiUrl = "https://api.themoviedb.org/3/movie/";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
    }
};

@Injectable({ providedIn: 'root' })
export class MovieService {
    constructor(private readonly movieStore: MovieStore, private readonly httpClient: HttpClient) { }

    setSelectedMovie(movieId: number) {
        this.movieStore.update({ isLoading: true });
        return this.httpClient.get<ExtendedMovie>(apiUrl + `${movieId}?language=en-US`, options).pipe(
            tap(response => this.movieStore.update({ selectedMovie: response, isLoading: false }))
        );
    }

    setImages(movieId: number) {
        this.movieStore.update({ isLoading: true });
        return this.httpClient.get<ImageResponse>(apiUrl + `${movieId}/images`, options).pipe(
            tap(response => this.movieStore.update({ images: response.backdrops, isLoading: false }))
        );
    }

    setReviews(movieId: number) {
        this.movieStore.update({ isLoading: true });
        return this.httpClient.get<ReviewResponse>(apiUrl + `${movieId}/reviews?language=en-US&page=1`, options).pipe(
            tap(response => this.movieStore.update({ reviews: response.results, isLoading: false }))
        );
    }

    setTrailer(movieId: number) {
        this.movieStore.update({ isLoading: true });
        return this.httpClient.get<VideoResponse>(apiUrl + `${movieId}/videos`, options).pipe(
            tap(response => this.movieStore.update({ trailer: response.results.find(x => x.site === "YouTube"), isLoading: false }))
        );
    }

    setWatchProviders(movieId: number) {
        this.movieStore.update({ isLoading: true });
        return this.httpClient.get<ProvidersResponse>(apiUrl + `${movieId}/watch/providers`, options).pipe(
            tap(providers => this.movieStore.update({watchProviders:  providers.results['US']?.rent ?? providers.results['US']?.flatrate, isLoading: false }))
        );
    }
}
