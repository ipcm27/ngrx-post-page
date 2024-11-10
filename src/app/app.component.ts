import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostPageComponent } from './post/components/post-page/post-page.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hundred-cards';
}
