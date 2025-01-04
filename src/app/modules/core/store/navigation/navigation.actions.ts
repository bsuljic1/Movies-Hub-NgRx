import { createAction, props } from "@ngrx/store";
import { Category } from "../../../../models/category.enum";

export const navigateMovieDetails = createAction(
    '[Navigation] Navigate Movie Details',
    props<{ movieId: number }>()
);

export const navigateToMovieCategory = createAction(
    '[Navigation] Navigate To Movie Category',
    props<{ category: Category }>()
);

export const navigateToSearchResults = createAction(
    '[Navigation] Navigate To Movie Category',
    props<{ query: string }>()
);

export const navigateToWatchlist = createAction(
    '[Navigation] Navigate To Watchlist'
);

export const navigateToMyRatings = createAction(
    '[Navigation] Navigate To Watchlist'
);