import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Review } from '../model/models';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../service/movie-service.service';

@Component({
  selector: 'app-movie-reviews-list',
  templateUrl: './movie-reviews-list.component.html',
  styleUrls: ['./movie-reviews-list.component.css']
})
export class MovieReviewsListComponent implements AfterViewInit, OnInit {


  movies: Review[] = []

  constructor(private router: Router, private route: ActivatedRoute, private movieSvc: MovieServiceService) { }

  ngAfterViewInit(): void {
    // this.movieSvc.movies.forEach(movie => {
    //   this.movies.push(movie)
    // });
    // this.movies = this.movieSvc.movies
    this.movieSvc.emitMovies.subscribe(
      (movies) => {
        this.movies = movies
        console.log(this.movies)
      }
    )
    this.route.params.subscribe(
      (param) => {
        let query = param['movieName']
        console.log(query)
        this.movieSvc.getMovies(query)
      }
    )
  }

  ngOnInit(): void {
    // this.movieSvc.movies.forEach(movie => {
    //   this.movies.push(movie)
    // });

  }

  postComment(movieTitle: string) {
    let index = this.movies.findIndex(
      (review) => {
        return review.title == movieTitle
      }
    )
    this.router.navigate(['comment', index])


  }
}
