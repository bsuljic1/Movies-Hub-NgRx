import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MoviePaged } from '../models/movies-paged.model';

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
export class MovieListService {
    constructor(private readonly httpClient: HttpClient) { }

    getPopularMovies(page = 1): Observable<MoviePaged> {
        return this.httpClient.get<MoviePaged>(apiUrl + `popular?language=en-US&page=${page}`, options);
    }

    getNowPlayingMovies(page = 1): Observable<MoviePaged> {
        return this.httpClient.get<MoviePaged>(apiUrl + `now_playing?language=en-US&page=${page}`, options);
    }

    getTopRatedMovies(page = 1): Observable<MoviePaged> {
        return this.httpClient.get<MoviePaged>(apiUrl + `top_rated?language=en-US&page=${page}`, options);
    }

    getUpcomingMovies(page = 1): Observable<MoviePaged> {
        return this.httpClient.get<MoviePaged>(apiUrl + `upcoming?language=en-US&page=${page}`, options);
    }

    getMoviesByGenre(genreId: string, page = 1): Observable<MoviePaged> {
        return this.httpClient.get<MoviePaged>(apiUrl + `language=en-US&page=${page}&with_genres=${genreId}`, options);
    }
}
