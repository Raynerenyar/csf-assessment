import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReviewComponentComponent } from './components/search-review-component.component';
import { MovieReviewsListComponent } from './components/movie-reviews-list.component';
import { PostCommentComponent } from './components/post-comment.component';

const routes: Routes = [
  { path: '', component: SearchReviewComponentComponent },
  { path: ':movieName/result', component: MovieReviewsListComponent },
  { path: 'comment/:index', component: PostCommentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
