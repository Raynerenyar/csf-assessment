import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieServiceService } from '../service/movie-service.service';
import { Review, Comment } from '../model/models';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  commentForm!: FormGroup
  selectedMovie!: Review

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private movieSvc: MovieServiceService) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      rating: this.fb.control<number>(1, [Validators.required, Validators.min(1), Validators.max(5)]),
      comment: this.fb.control<string>('', [Validators.required])
    })
    this.route.params.subscribe(
      (param) => {
        let index = param['index']
        this.selectedMovie = this.movieSvc.movies[index]
        console.log("posting about ... ", this.selectedMovie)
      }
    )
  }

  postComment() {
    let comment: Comment = {
      title: this.selectedMovie.title,
      posterName: this.commentForm.get('name')?.value,
      rating: this.commentForm.get('rating')?.value,
      comment: this.commentForm.get('comment')?.value,
    }
    this.movieSvc.postComment(comment)
    // console.log(comment)

    // TODO navigate back to view 1 with list of movies
    console.log(this.movieSvc.searchQuery)
    this.router.navigate([this.movieSvc.searchQuery, 'result'])


  }

  back() {
    // ideally should store movie search result to redis
    // then retrieve it here when navigating back to view 1
    // or after posting a comment
    // prevent error 429 on the nytimes api
    this.router.navigate([this.movieSvc.searchQuery, 'result'])
  }
}
