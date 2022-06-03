import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Observable } from 'rxjs';
import { Doctor } from 'src/app/models';
import { AppState } from 'src/app/store/states/app.state';
import * as SearchActions from 'src/app/store/actions/search.actions';
import { selectMarkersCount, selectSearchedDoctors } from 'src/app/store/selectors/search.selectors';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  doctors$: Observable<Doctor[]> | undefined;
  markersCount$: Observable<number | undefined> | undefined;
  searchForm: FormGroup | undefined;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.store.dispatch(SearchActions.clearState())
  }
  loadDoctors() {
    this.store.dispatch(SearchActions.loadDoctors());
    this.doctors$ = this.store.select(selectSearchedDoctors);
  }
  ngOnInit() {
    this._initSearchForm();
    this.loadDoctors();

    this.markersCount$ = this.store.select(selectMarkersCount);
    this.doctors$ = this.store.select(selectSearchedDoctors);
    this.listeningSearch();
  }
  listeningSearch() {
    if (this.searchForm)
      this.searchForm.valueChanges
        .pipe(debounceTime(700))
        .subscribe(({ firstName, lastName }) => {
          if (!firstName && !lastName) this.loadDoctors();
          this.searchDoctors(firstName, lastName);
        });
  }
  searchDoctors(firstName: string, lastName: string) {
    this.store.dispatch(
      SearchActions.loadSearchDoctors({ firstName, lastName })
    );
  }

  private _initSearchForm() {
    this.searchForm = this.fb.group({
      firstName: '',
      lastName: '',
    });
  }
}
