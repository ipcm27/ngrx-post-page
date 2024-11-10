import { createAction, props } from "@ngrx/store";
import { Post } from '../services/post.service';



export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts : Post[] }>());
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: string }>());
export const setActivePostId = createAction('[Posts] Set Active Post ID', props<{ id: number | null }>());
