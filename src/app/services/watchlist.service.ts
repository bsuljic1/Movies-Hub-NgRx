import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviePaged } from '../models/movies-paged.model';
import { AddToWatchlistResponse } from '../models/add-to-watchlist-response.model';


const apiUrl = "https://api.themoviedb.org/3/account/21215786/watchlist";

@Injectable({
    providedIn: 'root'
})
export class WatchlistService {
    constructor(private readonly httpClient: HttpClient) { }

    addToWatchlist(movieId: number, watchlist: boolean): Observable<AddToWatchlistResponse> {
        const body = {
            media_id: movieId,
            media_type: 'movie',
            watchlist
        };
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsIm5iZiI6MTcxMzIxMjk5OS45MTI5OTk5LCJzdWIiOiI2NjFkOGU0NzRjYTY3NjAxODcxZDAzZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3GjmjjNPybv4fs1WBYLrzv7syzh15Y7XWvBQoUQCs8c'
        };
        return this.httpClient.post<AddToWatchlistResponse>(apiUrl, body, { headers });
    }

    getMoviesFromWatchlist(): Observable<MoviePaged> {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
            }
        };
        return this.httpClient.get<MoviePaged>(`${apiUrl}/movies`, options);
    }
}
