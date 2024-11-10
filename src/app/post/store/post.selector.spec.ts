import { selectPosts, selectActivePostId, selectPostsState } from './post.selectors';
import { State } from './post.reducer';
import { Post } from '../services/post.service';

describe('Post Selectors', () => {
  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Body of Post 1' },
    { userId: 2, id: 2, title: 'Post 2', body: 'Body of Post 2' }
  ];

  const initialState: State = {
    posts: mockPosts,
    activePostId: 1
  };

  it('should select the posts state', () => {
    const result = selectPostsState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select all posts', () => {
    const result = selectPosts.projector(initialState);
    expect(result).toEqual(mockPosts);
  });

  it('should select the active post ID', () => {
    const result = selectActivePostId.projector(initialState);
    expect(result).toBe(1);
  });


});
