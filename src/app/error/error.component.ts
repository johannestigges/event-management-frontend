import { Component, Input } from '@angular/core';
import { ErrorData } from './error.service';

@Component({
  selector: 'evm-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() errorData?: ErrorData;
  showDetails=true;
}
