import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review, Comment } from '../model/models';
import { Subject, Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MovieServiceService implements OnDestroy {

  movies: Review[] = []
  emitMovies = new Subject<Review[]>
  moviesSub$!: Subscription
  searchQuery!: string

  constructor(private http: HttpClient) { }

  getMoviesObservable(movieName: string) {

    console.log("movie search sending get request", movieName)
    const params = new HttpParams()
      .set('query', movieName)
    return this.http.get(environment.SERVER_URL + "/api/search", { params })


  }

  getMovies(movieName: string) {
    this.searchQuery = movieName
    this.moviesSub$ = this.getMoviesObservable(movieName).subscribe(
      (resp) => {
        console.log(resp)
        this.movies = resp as Review[]
        this.emitMovies.next(this.movies)
      }
    );
  }

  postCommentObservable(comment: Comment) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    // const body = new URLSearchParams().set('comment', JSON.stringify(comment))

    let body = JSON.stringify(comment)
    return this.http.post(environment.SERVER_URL + "/api/comment", body, { headers: headers })
  }

  postComment(comment: Comment) {
    this.postCommentObservable(comment).subscribe(
      (resp) => console.log("comment inserted")
    )
  }

  ngOnDestroy(): void {
    this.moviesSub$.unsubscribe()
  }

}
