import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Roles, User } from '../../models/user-models';
import { ToastrMessagesService } from 'src/app/services';
import {
  MatchPassword,
  patternValidator,
  showAuthError,
} from 'src/app/shared/utils';
import { LoadingService } from 'src/app/services/loading.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;

  registerForm: FormGroup | undefined;
  selectedOption: string | undefined;
  submitted = false;
  passwordVisibility = false;
  confirmPasswordVisibility = false;

  constructor(
    private afAuth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService,
    private loadingService: LoadingService
  ) {}
  private _initRegisterForm() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          Validators.compose([Validators.required]),
          // Validators.compose([Validators.required, patternValidator()]),
        ],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      {
        validators: MatchPassword,
      }
    );
  }

  ngOnInit() {
    this._initRegisterForm();
  }
  generateUserData(firstName: string, lastName: string, role: string): User {
    return {
      firstName: firstName,
      lastName: lastName,
      entityNo: role === 'Doctor' ? Roles.Doctor : Roles.Patient,
    };
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm?.valid) {
      const user = this.registerForm.value;
      const userData: User = this.generateUserData(
        user.firstName,
        user.lastName,
        user.role
      );
      this.loadingService.startLoading();
      this.afAuth
        .SignUp(user.email, user.password, userData)
        .pipe(finalize(() => this.loadingService.stopLoading()))
        .subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: (err) =>
            this.toastrService.showErrorMessage(showAuthError(err)),
        });
    } else {
      this.toastrService.showErrorMessage(
        'Not all fields in form group are valid.'
      );
    }
  }
  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  toggleConfirmPassword() {
    this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
  }
}
