import { Video } from "./video.model";

export interface VideoResponse {
    results: Video[];
    id: string;
};