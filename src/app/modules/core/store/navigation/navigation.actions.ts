import { createAction, props } from "@ngrx/store";

export const navigateMovieDetails = createAction(
    '[Navigation] Navigate Movie Details',
    props<{ movieId: number }>()
);
