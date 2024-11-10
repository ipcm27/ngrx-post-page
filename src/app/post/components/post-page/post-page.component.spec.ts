import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostPageComponent } from './post-page.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as Actions from '../../store/post.actions';
import * as Selectors from '../../store/post.selectors';
import { Post } from '../../services/post.service';
import { PostCardComponent } from '../post-card/post-card.component';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      declarations: [PostPageComponent, PostCardComponent], 
      providers: [{ provide: Store, useValue: storeSpy }]
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;

    store.select.and.callFake((selector: any) => {
      if (selector === Selectors.selectPosts) {
        return of([
          { userId: 1, id: 1, title: 'Test Post 1', body: 'Body of Test Post 1' },
          { userId: 2, id: 2, title: 'Test Post 2', body: 'Body of Test Post 2' }
        ]); 
      }
      if (selector === Selectors.selectActivePostId) {
        return of(1); 
      }
      return of(null);
    });

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPosts action on initialization', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(Actions.loadPosts());
  });

  it('should render posts from posts$ observable', () => {
    fixture.detectChanges();

    const postElements = fixture.nativeElement.querySelectorAll('app-post-card');
    expect(postElements.length).toBe(2);
    expect(postElements[0].textContent).toContain('Test Post 1');
    expect(postElements[1].textContent).toContain('Test Post 2');
  });

  it('should dispatch setActivePostId with correct postId on card click', () => {
    const postId = 3;
    component.onCardClick(postId);
    expect(store.dispatch).toHaveBeenCalledWith(Actions.setActivePostId({ id: postId }));
    expect(component.activePostId).toBe(postId);
  });

  it('should select activePostId$ from the store', (done) => {
    component.activePostId$.subscribe((activePostId) => {
      expect(activePostId).toBe(1); 
      done();
    });
  });

});
