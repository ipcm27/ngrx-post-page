import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../services/post.service';
import * as PostPageActions from './post.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostPageActions.loadPosts),
      switchMap(() =>
        this.postService.getPosts().pipe(
          map(posts => {
            console.log('Posts carregados:', posts);
            return PostPageActions.loadPostsSuccess({ posts });
          }),
          catchError(error => {
            console.error('Error loading posts:', error);
            return of(PostPageActions.loadPostsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(private postService: PostService) {}
}
