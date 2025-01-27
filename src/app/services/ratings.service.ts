import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviePaged } from '../models/movies-paged.model';

@Injectable({
    providedIn: 'root'
})
export class RatingsService {
    constructor(private readonly httpClient: HttpClient) { }

    getRatedMovies(): Observable<MoviePaged> {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
            }
        };
        return this.httpClient.get<MoviePaged>("https://api.themoviedb.org/3/account/21215786/rated/movies", options);
    }

        
    addRatingForMovie(movieId: number, rating: number): Observable<any> {
         const body = {
            value: rating
        };
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsIm5iZiI6MTcxMzIxMjk5OS45MTI5OTk5LCJzdWIiOiI2NjFkOGU0NzRjYTY3NjAxODcxZDAzZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3GjmjjNPybv4fs1WBYLrzv7syzh15Y7XWvBQoUQCs8c'
        };
        return this.httpClient.post<any>(`https://api.themoviedb.org/3/movie/${movieId}/rating`, body, { headers });
    }
}
