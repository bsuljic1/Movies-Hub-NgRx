import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MoviesModule } from './modules/movies/movies.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderModule } from './modules/header/header.module';
import { CoreModule } from './modules/core/core.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MoviesModule,
    HeaderModule,
    CoreModule,
    AppRoutingModule 
  ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ],
    providers: [ ]
})

export class AppModule {}