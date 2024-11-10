import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../services/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() isActive: boolean = false;
  @Output() cardClick = new EventEmitter<number>();

   private properties = ['title', 'userId', 'id', 'body'];
   private currentIndex = 0;
 
   displayedProperty: string = this.properties[this.currentIndex];

   get displayedValue(): string | number {
    return this.post[this.displayedProperty as keyof Post];
  }

   ngOnChanges(): void {
    if (!this.isActive) {
      this.resetDisplayedProperty();
    }
  }

  private resetDisplayedProperty(): void {
    this.currentIndex = 0;
    this.displayedProperty = 'title';
  }
 
   onClick(): void {
     this.currentIndex = (this.currentIndex + 1) % this.properties.length;
     this.displayedProperty = this.properties[this.currentIndex];
 
     this.cardClick.emit(this.post.id);
   }
 


}
