import { TestBed } from '@angular/core/testing';

import { Post, PostService } from './post.service';
import { StoreModule } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController,  provideHttpClientTesting } from '@angular/common/http/testing';


describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [provideHttpClient(), provideHttpClientTesting() ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts via GET', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test Post', body: 'Test post body' },
      { userId: 2, id: 2, title: 'Another Post', body: 'Body of another post' }
    ];
  
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });
  
    
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
  
  it('should handle empty post response', () => {
    service.getPosts().subscribe(posts => {
      expect(posts.length).toBe(0); 
    });
  
    const req = httpMock.expectOne(service['apiUrl']);
    req.flush([]); 
  });
  
  it('should handle HTTP error gracefully', () => {
    const errorMsg = 'Failed to load posts';
  
    service.getPosts().subscribe({
      next: (posts) => {
        expect(posts).toEqual([]);
      },
      error: () => fail('Expected empty array, not an error')
    });
  
    const req = httpMock.expectOne(service['apiUrl']);
    req.flush(errorMsg, { status: 500, statusText: 'Server Error' });
  });
});
