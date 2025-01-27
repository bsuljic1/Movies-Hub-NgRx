import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtendedMovie } from '../models/movie.model';
import { ProvidersResponse } from '../models/providers-response.model';
import { ImageResponse } from '../models/image-response.model';
import { ReviewResponse } from '../models/review-response.model';
import { VideoResponse } from '../models/video-response.model';


const apiUrl = "https://api.themoviedb.org/3/movie/";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
    }
};


@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private readonly httpClient: HttpClient) { }

    getMovieDetailsById(movieId: number): Observable<ExtendedMovie> {
        return this.httpClient.get<ExtendedMovie>(apiUrl + `${movieId}?language=en-US`, options);
    }

    getMovieImages(movieId: number): Observable<ImageResponse> {
        return this.httpClient.get<ImageResponse>(apiUrl + `${movieId}/images`, options);
    }

    getWatchProviderForMovie(movieId: number): Observable<ProvidersResponse> {
        return this.httpClient.get<ProvidersResponse>(apiUrl + `${movieId}/watch/providers`, options);
    }

    getReviewsForMovie(movieId: number): Observable<ReviewResponse> {
        return this.httpClient.get<ReviewResponse>(apiUrl + `${movieId}/reviews?language=en-US&page=1`, options);
    }

    getVideosForMovie(movieId: number): Observable<VideoResponse> {
        return this.httpClient.get<VideoResponse>(apiUrl + `${movieId}/videos`, options);
    }
}
