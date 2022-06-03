import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor, Patient } from 'src/app/models';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingCardComponent implements OnInit {
  @Input() item: Doctor | Patient | undefined;
  bookingForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this._initBookingForm();
  }

  private _initBookingForm() {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
    });
  }
  createBooking() {
    
  }
  get currentDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }
}
