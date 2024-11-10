import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./post.reducer";
import { Post } from "../services/post.service";

export const selectPostsState = createFeatureSelector<State>('posts');

export const selectPosts = createSelector(
  selectPostsState,
  (state: State) => state.posts
)

export const selectActivePostId = createSelector(
  selectPostsState,
  (state: State) => state.activePostId
);

export const selectError= createSelector(
  selectPostsState,
  (state: State) => state.error
);

