import * as PostActions from './post.actions';

describe('Post Actions', () => {
 
  it('should create loadPosts action', () => {
    const action = PostActions.loadPosts();
    expect(action.type).toBe('[Posts] Load Posts');
  });

  it('should create loadPostsSuccess action with posts payload', () => {
    const mockPosts = [
      { userId: 1, id: 1, title: 'Test Post 1', body: 'Body of Test Post 1' },
      { userId: 2, id: 2, title: 'Test Post 2', body: 'Body of Test Post 2' }
    ];

    const action = PostActions.loadPostsSuccess({ posts: mockPosts });
    expect(action.type).toBe('[Posts] Load Posts Success');
    expect(action.posts).toEqual(mockPosts);
  });

  it('should create loadPostsFailure action with error payload', () => {
    const error = 'Failed to load posts';
    const action = PostActions.loadPostsFailure({ error });
    expect(action.type).toBe('[Posts] Load Posts Failure');
    expect(action.error).toBe(error);
  });

  it('should create setActivePostId action with post ID payload', () => {
    const postId = 1;
    const action = PostActions.setActivePostId({ id: postId });
    expect(action.type).toBe('[Posts] Set Active Post ID');
    expect(action.id).toBe(postId);
  });
});
