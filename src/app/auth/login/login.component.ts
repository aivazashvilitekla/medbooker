import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faEnvelope, faLock, faEye, faL } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrMessagesService } from 'src/app/services/toastr-messages.service';
import { showAuthError } from 'src/app/shared/utils';
import { LoadingService } from 'src/app/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;

  submitted = false;
  passwordVisibility = false;
  authError: boolean = false;

  loginForm: FormGroup | undefined;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrMessagesService,
    private loadingService: LoadingService
  ) {}

  private _initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
  ngOnInit() {
    this._initLoginForm();
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm?.valid) {
      const user = this.loginForm.value;
      this.loadingService.startLoading();
      this.auth.SignIn(user.email, user.password).subscribe({
        next: () => {
          this.loadingService.stopLoading();
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loadingService.stopLoading();
          this.authError = !this.authError;
          const message = showAuthError(error);
          this.toastrService.showErrorMessage(message);
        },
      });
    } else {
      this.toastrService.showErrorMessage(
        'Not all fields in form group are valid.'
      );
    }
  }
}
