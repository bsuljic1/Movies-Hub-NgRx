import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenreResponse } from '../models/genre-response.model';

const apiUrl = "https://api.themoviedb.org/3/genre/movie/list?";
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
export class GenreService {
    constructor(private readonly httpClient: HttpClient) { }

    getMovieGenres(page = 1): Observable<GenreResponse> {
        return this.httpClient.get<GenreResponse>(apiUrl + `language=en-US&page=${page}`, options);
    }
}
