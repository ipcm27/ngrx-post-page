import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../services/post.service';
import * as Actions from '../../store/post.actions';
import * as Selectors from '../../store/post.selectors';
import { PostCardComponent } from '../post-card/post-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent implements OnInit{

  posts$: Observable<Post[]>;
  activePostId$: Observable<number | null>;
  activePostId: number = 0;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.posts$ = this.store.select(Selectors.selectPosts);
    this.error$ = this.store.select(Selectors.selectError);
    this.activePostId$ = this.store.select(Selectors.selectActivePostId);
  }

  ngOnInit(): void {
    this.store.dispatch(Actions.loadPosts());
  }

  onCardClick(postId: number) {
    this.activePostId = postId;
    this.store.dispatch(Actions.setActivePostId({ id: postId }));
  }

}
