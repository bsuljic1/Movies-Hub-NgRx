import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MoviesListStore } from './movie-list.store';
import { MoviePaged } from '../../../../models/movies-paged.model';
import { Category } from '../../../../models/category.enum';

const apiUrl = "https://api.themoviedb.org/3/movie/";
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRjNTQ4NTJhMzJmYjRjOTAzMThjNWFjNDU0YmNjNiIsInN1YiI6IjY2MWQ4ZTQ3NGNhNjc2MDE4NzFkMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3yOpb4W3um-8Pl6JMPjIELb2_507_Dd6aX8c8tiPaNY'
    }
};

@Injectable({
    providedIn: 'root',
})
export class MoviesListAkitaService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly moviesListStore: MoviesListStore
    ) { }

    fetchPopularMovies(page = 1): void {
        this.moviesListStore.update({ isLoading: true });

        this.httpClient.get<MoviePaged>(apiUrl + `popular?language=en-US&page=${page}`, options)
            .pipe(finalize(() => this.moviesListStore.update({ isLoading: false })))
            .subscribe((data: MoviePaged) => this.moviesListStore.update({ popular: data.results }));
    }

    fetchNowPlayingMovies(page = 1): void {
        this.moviesListStore.update({ isLoading: true });

        this.httpClient.get<MoviePaged>(apiUrl + `now_playing?language=en-US&page=${page}`, options)
            .pipe(finalize(() => this.moviesListStore.update({ isLoading: false })))
            .subscribe((data: MoviePaged) => {
                this.moviesListStore.update({ nowPlaying: data.results });
            });
    }

    fetchTopRatedMovies(page = 1): void {
        this.moviesListStore.update({ isLoading: true });

        this.httpClient.get<MoviePaged>(apiUrl + `top_rated?language=en-US&page=${page}`, options)
            .pipe(finalize(() => this.moviesListStore.update({ isLoading: false })))
            .subscribe((data: MoviePaged) => {
                this.moviesListStore.update({ topRated: data.results });
            });
    }

    fetchUpcomingMovies(page = 1): void {
        this.moviesListStore.update({ isLoading: true });

        this.httpClient.get<MoviePaged>(apiUrl + `upcoming?language=en-US&page=${page}`, options)
            .pipe(finalize(() => this.moviesListStore.update({ isLoading: false })))
            .subscribe((data: MoviePaged) => {
                this.moviesListStore.update({ upcoming: data.results });
            });
    }

    getMoviesByCategory(category: Category) {
        switch (category) {
            case Category.Popular:
                return this.fetchPopularMovies();
            case Category.NowPlaying:
                return this.fetchNowPlayingMovies();
            case Category.Upcoming:
                return this.fetchUpcomingMovies();
            case Category.TopRated:
                return this.fetchTopRatedMovies();
            default:
                return this.fetchPopularMovies();
        }
    }
}
