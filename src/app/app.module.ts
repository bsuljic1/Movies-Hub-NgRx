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
import { AccountModule } from './modules/account/account.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { metaReducers, reducers } from './app.reducers';
import { AppEffects } from './app.effects';
import { CoreEffects } from './modules/core/store/core.effects';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }), FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MoviesModule,
    HeaderModule,
    CoreModule,
    AppRoutingModule,
    AccountModule,
    ToastModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [MessageService]
})

export class AppModule { }