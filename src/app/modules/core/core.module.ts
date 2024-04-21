import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { coreReducer } from './store/core.reducer';
import { CoreEffects } from './store/core.effects';
import { AuthenticationService } from '../../services/auth.service';
import { NavigationEffects } from './store/navigation/navigation.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('core', coreReducer),
        EffectsModule.forFeature([CoreEffects, NavigationEffects]),
    ],
    providers: [AuthenticationService]
})
export class CoreModule { }