import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MessageDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  public onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class MessageDialogModel {
  constructor(public title: string, public message: string) {}
}