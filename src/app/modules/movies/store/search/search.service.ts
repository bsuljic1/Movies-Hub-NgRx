import { Injectable } from '@angular/core';
import { SearchStore } from './search.store';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MoviePaged } from '../../../../models/movies-paged.model';

const apiUrl = "https://api.themoviedb.org/3/search";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
    }
};


@Injectable({ providedIn: 'root' })
export class SearchService {
    constructor(private readonly searchStore: SearchStore, private readonly httpClient: HttpClient) { }

    searchMovies(query: string) {
        this.searchStore.update({ loading: true, searchQuery: query });
        return this.httpClient.get<MoviePaged>(`${apiUrl}/movie?query=${query}&language=en-US`, options).pipe(
            tap(response =>  this.searchStore.update({ searchResults: response.results, loading: false }))
        );
    }
}
