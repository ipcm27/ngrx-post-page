import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { postsReducer } from './post/store/post.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './post/store/post.effects';
import { PostPageComponent } from './post/components/post-page/post-page.component';
import { PostCardComponent } from './post/components/post-card/post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PostPageComponent,
    PostCardComponent  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), 
    StoreModule.forRoot({ posts: postsReducer }),  
    EffectsModule.forRoot([PostsEffects])          
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
