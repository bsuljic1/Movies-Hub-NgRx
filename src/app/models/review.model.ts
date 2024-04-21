import { ReviewAuthor } from "./review-author.model";

export interface Review {
    author: string;
    author_details: ReviewAuthor;
    content: string;
    created_at: Date;
    id: string;
    url: string;
};