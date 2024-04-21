import { createAction, props } from "@ngrx/store";
import { Movie } from "../../../../models/movie.model";
import { Category } from "../../../../models/category.enum";

export const navigateMovieDetails = createAction(
    '[Navigation] Navigate Movie Details',
    props<{ movieId: number, category: Category }>()
);
