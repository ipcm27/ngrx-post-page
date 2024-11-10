import { postsReducer, initialState, State } from './post.reducer';
import * as PostPageActions from './post.actions';
import { Post } from '../services/post.service';

describe('PostsReducer', () => {

  it('should return the initial state by default', () => {
    const action = { type: 'Unknown' };
    const state = postsReducer(initialState, action as any);
    expect(state).toBe(initialState);
  });

  it('should update posts on loadPostsSuccess', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test Post 1', body: 'Body of Test Post 1' },
      { userId: 2, id: 2, title: 'Test Post 2', body: 'Body of Test Post 2' }
    ];
    
    const action = PostPageActions.loadPostsSuccess({ posts: mockPosts });
    const state = postsReducer(initialState, action);

    expect(state.posts).toEqual(mockPosts);
    expect(state.activePostId).toBeNull();
  });

  it('should set activePostId on setActivePostId', () => {
    const postId = 1;
    const action = PostPageActions.setActivePostId({ id: postId });
    const state = postsReducer(initialState, action);

    expect(state.activePostId).toBe(postId);
    expect(state.posts).toEqual([]);
  });

  it('should set error on loadPostsFailure action', () => {
    const errorMessage = 'Error loading posts';
    const action = PostPageActions.loadPostsFailure({ error: errorMessage });
    const state = postsReducer(initialState, action);

    expect(state.error).toEqual(errorMessage);
    expect(state.posts).toEqual([]);
  });
});
