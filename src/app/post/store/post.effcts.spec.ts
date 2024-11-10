import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PostsEffects } from '../store/post.effects';
import * as PostActions from '../store/post.actions';
import { PostService } from '../services/post.service';
import { Action } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import 'jasmine-marbles';
import { provideHttpClient } from '@angular/common/http';


describe('PostsEffects', () => {
  let actions$: Observable<Action>;
  let effects: PostsEffects;
  let postService: jasmine.SpyObj<PostService>;

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        PostsEffects,
        provideMockActions(() => actions$),
        { provide: PostService, useValue: postServiceSpy }
      ]
    });

    effects = TestBed.inject(PostsEffects);
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should dispatch loadPostsSuccess when loadPosts is triggered successfully', () => {
    const mockPosts = [
      { userId: 1, id: 1, title: 'Test Post 1', body: 'Body of Test Post 1' }
    ];

    const action = PostActions.loadPosts();
    const completion = PostActions.loadPostsSuccess({ posts: mockPosts });

    actions$ = hot('-a', { a: action });
    postService.getPosts.and.returnValue(of(mockPosts));
    const expected = cold('-b', { b: completion });

    expect(effects.loadPosts$).toBeObservable(expected);
  });

  it('should dispatch loadPostsFailure when loadPosts fails', () => {
    const action = PostActions.loadPosts();
    const error = 'Failed to load posts';
    const completion = PostActions.loadPostsFailure({ error });

    actions$ = hot('-a', { a: action });
    postService.getPosts.and.returnValue(throwError(() => new Error(error)));
    const expected = cold('-b', { b: completion });

    expect(effects.loadPosts$).toBeObservable(expected);
  });

  it('should not dispatch any action if a different action is triggered', () => {
    const unrelatedAction = { type: '[Other] Unrelated Action' };

    actions$ = hot('-a', { a: unrelatedAction });
    const expected = cold('---'); 

    expect(effects.loadPosts$).toBeObservable(expected);
  });

  it('should dispatch loadPostsFailure action when posts fail to load', () => {
    const error = 'Error loading posts';
    const action = PostActions.loadPosts();
    const completion = PostActions.loadPostsFailure({ error });

    actions$ = hot('-a', { a: action });
    postService.getPosts.and.returnValue(cold('-#|', {}, new Error(error)));

    expect(effects.loadPosts$).toBeObservable(cold('--c', { c: completion }));
  });
});
