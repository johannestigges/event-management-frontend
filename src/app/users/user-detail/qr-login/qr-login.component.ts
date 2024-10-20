import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';

export interface QrLoginData {
  username: string;
  password: string;
}

@Component({
  selector: 'evm-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.scss'],
  standalone: true,
  imports: [QRCodeModule]
})
export class QrLoginComponent {

  username;
  qrUrl;

  constructor(
    private readonly dialogRef: MatDialogRef<QrLoginComponent>,
    @Inject(MAT_DIALOG_DATA) data: QrLoginData
  ) {
    this.username = data.username;
    this.qrUrl = `${window.location.origin}/#/login&username=${data.username}&password=${data.password}`;
  }

  onClose() {
    this.dialogRef.close();
  }
}
