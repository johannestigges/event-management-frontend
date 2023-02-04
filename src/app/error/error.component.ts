import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faEye, faEyeSlash, faFrown } from '@fortawesome/free-regular-svg-icons';
import { ErrorData } from './error.service';

@Component({
  selector: 'evm-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnChanges {
  readonly REMOVE_ERROR_AFTER = 10_000;

  faFrown = faFrown;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() errorData?: ErrorData;
  showDetails = false;

  errorList: ErrorData[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.errorData) {
      if (this.errorData.hasError === false) {
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
