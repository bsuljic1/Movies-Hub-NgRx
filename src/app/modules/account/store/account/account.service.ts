import { Injectable } from '@angular/core';
import { AccountStore } from './account.store';
import { Movie } from '../../../../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { MoviePaged } from '../../../../models/movies-paged.model';
import { tap } from 'rxjs';
import { AddToWatchlistResponse } from '../../../../models/add-to-watchlist-response.model';

const watchlistApiUrl = "https://api.themoviedb.org/3/account/21215786/watchlist";


@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private readonly accountStore: AccountStore, private readonly httpClient: HttpClient) { }

    addMovieToWatchlist(movieId: number) {
        this.accountStore.update({ isLoading: true });

        const body = {
            media_id: movieId,
            media_type: 'movie',
            watchlist: true
        };
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsIm5iZiI6MTcxMzIxMjk5OS45MTI5OTk5LCJzdWIiOiI2NjFkOGU0NzRjYTY3NjAxODcxZDAzZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3GjmjjNPybv4fs1WBYLrzv7syzh15Y7XWvBQoUQCs8c'
        };
        return this.httpClient.post<AddToWatchlistResponse>(watchlistApiUrl, body, { headers }).pipe(
            tap(() => this.accountStore.update({ isLoading: false }))
        );
    }

    removeMovieFromWatchlist(movieId: number) {
        this.accountStore.update({ isLoading: true });
        const body = {
            media_id: movieId,
            media_type: 'movie',
            watchlist: false
        };
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsIm5iZiI6MTcxMzIxMjk5OS45MTI5OTk5LCJzdWIiOiI2NjFkOGU0NzRjYTY3NjAxODcxZDAzZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3GjmjjNPybv4fs1WBYLrzv7syzh15Y7XWvBQoUQCs8c'
        };
        return this.httpClient.post<AddToWatchlistResponse>(watchlistApiUrl, body, { headers }).pipe(
            tap(() => this.accountStore.update({ isLoading: false }))
        );
    }

    setWatchlist() {
        this.accountStore.update({ isLoading: true });

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
            }
        };
        return this.httpClient.get<MoviePaged>(`${watchlistApiUrl}/movies`, options).pipe(
            tap(response => this.accountStore.update({ isLoading: false, watchlist: response.results }))
        );
    }

    setRatedMovies() {
        this.accountStore.update({ isLoading: true });
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
            }
        };
        return this.httpClient.get<MoviePaged>("https://api.themoviedb.org/3/account/21215786/rated/movies", options).pipe(
            tap(response => this.accountStore.update({ isLoading: false, ratedMovies: response.results }))
        );
    }

    addRatingForMovie(movieId: number, rating: number) {
        this.accountStore.update({ isLoading: true });

        const body = {
            value: rating
        };
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsIm5iZiI6MTcxMzIxMjk5OS45MTI5OTk5LCJzdWIiOiI2NjFkOGU0NzRjYTY3NjAxODcxZDAzZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3GjmjjNPybv4fs1WBYLrzv7syzh15Y7XWvBQoUQCs8c'
        };
        return this.httpClient.post<any>(`https://api.themoviedb.org/3/movie/${movieId}/rating`, body, { headers }).pipe(
            tap(response => this.accountStore.update({ isLoading: false, ratedMovies: response.results }))
        );
    }
}
