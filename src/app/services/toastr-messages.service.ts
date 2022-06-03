import { Injectable } from '@angular/core';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
@Injectable({
  providedIn: 'root',
})
export class ToastrMessagesService {
  constructor(private toastrService: NbToastrService) { }
  showSuccessMessage(message: string) {
    const status: NbComponentStatus = 'success';
    this.toastrService.show(message, `Success!`, { status });
  }
  showErrorMessage(message: string) {
    const status: NbComponentStatus = 'danger';
    this.toastrService.show(message, `Error!`, { status });
  }
}
