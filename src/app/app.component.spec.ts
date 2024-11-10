import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PostPageComponent } from './post/components/post-page/post-page.component';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      declarations: [AppComponent, PostPageComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
