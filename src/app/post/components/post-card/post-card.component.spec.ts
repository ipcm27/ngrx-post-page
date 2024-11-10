import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCardComponent } from './post-card.component';
import { Post } from '../../services/post.service';
import { By } from '@angular/platform-browser';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  const mockPost: Post = {
    userId: 1,
    id: 1,
    title: 'Test Post',
    body: 'This is a test post body'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    component.post = mockPost; 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial property (title) by default', () => {
    fixture.detectChanges();
    expect(component.displayedValue).toBe(mockPost.title);
  });

  it('should cycle through post properties on click', () => {
    fixture.detectChanges();

    component.onClick();
    expect(component.displayedValue).toBe(mockPost.userId);

    component.onClick();
    expect(component.displayedValue).toBe(mockPost.id);

    component.onClick();
    expect(component.displayedValue).toBe(mockPost.body);

    component.onClick();
    expect(component.displayedValue).toBe(mockPost.title);
  });

  it('should emit cardClick event with post ID on click', () => {
    spyOn(component.cardClick, 'emit');
    component.onClick();
    expect(component.cardClick.emit).toHaveBeenCalledWith(mockPost.id);
  });

  it('should reset displayedProperty to title if isActive is set to false', () => {
    component.onClick();
    expect(component.displayedProperty).toBe('userId');

    component.isActive = false;
    component.ngOnChanges();
    expect(component.displayedProperty).toBe('title');
  });

  it('should retain displayed property if isActive is true', () => {
    component.onClick(); 
    expect(component.displayedProperty).toBe('userId');

    component.isActive = true;
    component.ngOnChanges();
    expect(component.displayedProperty).toBe('userId'); 
  });
});
