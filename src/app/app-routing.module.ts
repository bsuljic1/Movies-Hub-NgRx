import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading, ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './modules/movies/components/movie-details/movie-details.component';
import { MoviesAccordionComponent } from './modules/movies/components/movies-accordion/movies-accordion.component';



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
