import { createFeatureSelector } from '@ngrx/store';
import { IAppState } from './app.state';

export const appSelectors = createFeatureSelector<IAppState>('app');
