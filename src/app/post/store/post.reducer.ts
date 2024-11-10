import { createReducer, on } from "@ngrx/store";
import { Post } from "../services/post.service";
import * as PostPageActions from './post.actions';

export interface State {
  posts: Post[];
  activePostId: number | null;
  error: string | null;
}

export const initialState: State = {
  posts: [],
  activePostId: null,
  error: null
}

export const postsReducer = createReducer(initialState,
  on(PostPageActions.loadPostsSuccess, (state, { posts }) => ({ ...state, posts, error: null })), 
  on(PostPageActions.setActivePostId, (state, { id }) => ({ ...state, activePostId: id, error: null })),
  on(PostPageActions.loadPostsFailure, (state, { error }) => ({ ...state, error })),

)
