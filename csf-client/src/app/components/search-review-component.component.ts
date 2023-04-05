import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieServiceService } from '../service/movie-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-review-component',
  templateUrl: './search-review-component.component.html',
  styleUrls: ['./search-review-component.component.css']
})
export class SearchReviewComponentComponent implements OnInit, OnDestroy {

  movieSearchForm!: FormGroup
  movieSvcSub$!: Subscription

  constructor(private fb: FormBuilder, private movieSvc: MovieServiceService, private router: Router) { }

  //, this.noWhitespaceValidator
  ngOnInit(): void {
    this.movieSearchForm = this.fb.group({
      movie: this.fb.control<string>('', [Validators.required, Validators.minLength(2), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]) // need customer validator for the trailing blank spaces
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnDestroy(): void {
    // this.movieSvcSub$.unsubscribe()
  }

  searchMovie() {
    console.log(this.movieSearchForm.get('movie')?.value)
    let movieName = this.movieSearchForm.get('movie')?.value
    // this.movieSvc.getMovies(movieName)
    this.router.navigate([movieName, 'result'])
    // this.movieSvcSub$ = this.movieSvc.getMoviesObservable(movieName).subscribe(
    //   (response) => console.log(response)
    // )
  }

}
