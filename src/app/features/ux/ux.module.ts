import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [ConfirmDialogComponent, MessageDialogComponent]
})
export class UxModule { }
