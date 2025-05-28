import {Component, Input, OnChanges} from '@angular/core';
import {faEye, faEyeSlash, faFrown} from '@fortawesome/free-regular-svg-icons';
import {ErrorData} from './error.service';
import {NgFor, NgIf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'evm-error',
  templateUrl: './error.component.html',
  standalone: true,
  imports: [NgIf, NgFor, FaIconComponent]
})
export class ErrorComponent implements OnChanges {
  readonly REMOVE_ERROR_AFTER = 10_000;

  faFrown = faFrown;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() errorData?: ErrorData;
  showDetails = false;

  errorList: ErrorData[] = [];

  ngOnChanges(): void {
    if (this.errorData) {
      if (!this.errorData.hasError) {
        this.errorList = [];
      } else {
        this.errorData.occured_at = Date.now();
        console.log('new Error', this.errorData);
        this.errorList.push(this.errorData);
      }
    }
    setTimeout(() => {
      const t = Date.now() - this.REMOVE_ERROR_AFTER + 1000;
      this.errorList = this.errorList.filter(error => error.occured_at && error.occured_at > t);
    }, this.REMOVE_ERROR_AFTER);
  }
}
