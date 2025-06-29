import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class NotificationComponent {
  constructor(public dialog: MatDialog) {}

  showNotification(title: string, message: string) {
    this.dialog.open(NotificationDialogComponent, {
      data: { title, message },
      panelClass: 'custom-notification-dialog',
      position: { top: '32px', right: '32px' }
    });
  }
}

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification.component.html',
})
export class NotificationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {
    setTimeout(() => this.dialogRef.close(), 3000);
  }
}
