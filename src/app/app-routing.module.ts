import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { MovieDetailsComponent } from './modules/movies/components/movie-details/movie-details.component';
import { MoviesAccordionComponent } from './modules/movies/components/movies-accordion/movies-accordion.component';
import { Category } from './models/category.enum';
import { MoviesCategoryComponent } from './modules/movies/components/movies-category/movies-category.component';
import { SearchResultsComponent } from './modules/movies/components/search-results/search-results.component';
import { WatchlistComponent } from './modules/account/components/watchlist/watchlist.component';
import { RatingsComponent } from './modules/account/components/ratings/ratings.component';



const routes: Routes = [
    {
        path: '',
        component: MoviesAccordionComponent,
        children: [
            // {
            //     path: 'details/:movieId',
            //     component: MovieDetailsComponent
            // },
            //   {
            //     path: 'guest', loadChildren: () : Promise<any> => import('./modules/guest/guest.module').then(m => m.GuestModule),
            //     canActivate: [guestGuard],
            //     data: {
            //       pageCategoryAnalytic: 'Home',
            //     }
            //   },
            //     { path: '**', redirectTo: 'not-found' }
        ]
    },
    {
        path: 'details/:movieId',
        component: MovieDetailsComponent
    },
    {
        path: 'category/toprated',
        component: MoviesCategoryComponent,
        data: {
            category: Category.TopRated
        }
    },
    {
        path: 'category/popular',
        component: MoviesCategoryComponent,
        data: {
            category: Category.Popular
        }
    },
    {
        path: 'category/upcoming',
        component: MoviesCategoryComponent,
        data: {
            category: Category.Upcoming
        }
    },
    {
        path: 'category/nowplaying',
        component: MoviesCategoryComponent,
        data: {
            category: Category.NowPlaying
        }
    },
    {
        path: 'search/:query',
        component: SearchResultsComponent,
    },
    {
        path: 'watchlist',
        component: WatchlistComponent
    },
    {
        path: 'ratings',
        component: RatingsComponent
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                preloadingStrategy: NoPreloading,
                initialNavigation: 'enabledBlocking'
            })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
