import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  allErrors!: Map<string, string[]>

  constructor(private fb: FormBuilder, private movieSvc: MovieServiceService, private router: Router) { }

  // , this.noWhitespaceValidator
  // , Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
  ngOnInit(): void {
    this.movieSearchForm = this.fb.group({
      movie: this.fb.control<string>('', [Validators.required, Validators.minLength(2), this.nonWhitespace()]) // need customer validator for the trailing blank spaces
    })
  }

  // public noWhitespaceValidator(control: FormControl) {
  //   // const isWhitespace = (control.value || '').trim().length === 0;
  //   let beforeTrimLen = control.value.length
  //   let afterTrimLen = control.value.trim()
  //   const isWhitespace = beforeTrimLen === afterTrimLen;
  //   const isValid = !isWhitespace;
  //   return isValid ? null : { 'whitespace': true };
  // }

  nonWhitespace = (): ValidatorFn => {
    return (ctrl: AbstractControl): ValidationErrors | null => {
      const regex = new RegExp(/\s+/g)
      let result = ctrl.value.matchAll(regex).next().value
      if (result === undefined) {
        return null
      }
      return { nonWhitespace: "Trailing whitespaces not allowed" } as ValidationErrors
    }
  }

  ngOnDestroy(): void {
    // this.movieSvcSub$.unsubscribe()
  }

  searchMovie() {
    console.log(this.movieSearchForm.get('movie')?.value)
    let movieName = this.movieSearchForm.get('movie')?.value
    // this.movieSvc.getMovies(movieName)
    this.router.navigate([movieName, 'result'])


    // if (!this.getErrors()) {
    //   console.log(this.movieSearchForm.get('movie')?.value)
    //   let movieName = this.movieSearchForm.get('movie')?.value
    //   this.router.navigate([movieName, 'result'])
    // }
  }

  getErrors(): Boolean {
    this.allErrors = new Map()

    let movieErrs: ValidationErrors | undefined | null = this.movieSearchForm.get('movie')?.errors
    let hasErrors = false

    // adding movie search error into allErrors map
    if (movieErrs != null) {
      this.allErrors.set('movie', Object.keys(movieErrs))
      hasErrors = true
    }

    return hasErrors

  }

}
