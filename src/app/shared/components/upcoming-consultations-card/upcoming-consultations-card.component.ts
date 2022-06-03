import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import {
  AttendType,
  Booking,
  Consultation,
  Roles,
  Status,
} from 'src/app/models';
import { AuthenticationService } from 'src/app/services';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-upcoming-consultations-card',
  templateUrl: './upcoming-consultations-card.component.html',
  styleUrls: ['./upcoming-consultations-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingConsultationsCardComponent implements OnInit {
  @Input() booking: Consultation | undefined;
  @Output() onAccept: EventEmitter<number> = new EventEmitter<number>();
  @Output() onReject: EventEmitter<number> = new EventEmitter<number>();
  status = Status;
  attendeeType = AttendType;
  @Input() showActions: boolean = false;
  role: Roles | undefined;
  roles = Roles;

  constructor() {}

  ngOnInit() {}
  updateRequestStatus(id: number, status: Status) {
    status === Status.CONFIRMED
      ? this.onAccept.emit(id)
      : this.onReject.emit(id);
  }
}
