import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person-dialog.component.html',
  styleUrls: ['./person-dialog.component.scss']
})
export class PersonDialogComponent {

  public title: string;
  public person: Person;

  constructor(public dialogRef: MatDialogRef<PersonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PersonDialogModel) {
    this.title = data.title;
    this.person = data.person ?? new Person();
  }
 
  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  public onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class PersonDialogModel {
  constructor(public title: string, public person: Person) {}
}