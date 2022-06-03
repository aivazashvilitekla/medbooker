import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCardComponent implements OnInit {
  @Input() doctor: Doctor | undefined;
  fullName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.fullName = `${this.doctor?.firstName} ${this.doctor?.lastName}`;
  }

  book(id?: number) {
    this.router.navigate([`booking/${id}`]);
  }
}
