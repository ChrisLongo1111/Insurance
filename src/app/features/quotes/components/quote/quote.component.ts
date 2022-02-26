import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { take } from 'rxjs';

import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/features/ux/components/confirm-dialog/confirm-dialog.component';
import { Dependent } from '../../models/dependent';
import { Employee } from '../../models/employee';
import { Person } from '../../models/person';
import { Quote } from '../../models/quote';
import { PersonDialogComponent, PersonDialogModel } from '../person-dialog/person-dialog.component';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  
  public quoteAmount: number = 0;
  public quote: Quote = new Quote();
  
  
  constructor(public dialog: MatDialog) { 
    this.quote.employees = [new Employee(), new Employee()];

    this.quote.employees[0].firstName = 'Chris';
    this.quote.employees[0].lastName = 'Longo';
    const dependent = new Dependent();
    dependent.firstName = 'Andy';
    dependent.lastName = 'Longo';
    this.quote.employees[0].dependents.push(dependent);
  }

  public ngOnInit(): void {
    this.quoteChanged();
  }

  public quoteChanged(): void {
    this.quoteAmount = this.quote.calculate();
  }

  public addEmployee(): void {
    const employee = new Employee();
    const dialogData = new PersonDialogModel("Add Employee", employee);

    const dialogRef = this.dialog.open(PersonDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        this.quote.employees.push(employee);
        this.quoteChanged();
      }
    });
  }

  public deleteEmployee(employee: Employee): void {
    const dialogData = new ConfirmDialogModel("Delete Employee", 'Are you sure you want to delete this employee?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        const index = this.quote.employees.indexOf(employee);
        if (index !== -1) {
          this.quote.employees.splice(index, 1);
          this.quoteChanged();
        }
      }
    });
  }

  public deleteDependent(employee: Employee, dependent: Dependent): void {
    const dialogData = new ConfirmDialogModel("Delete Dependent", 'Are you sure you want to delete this dependent?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        const index = employee.dependents.indexOf(dependent);
        if (index !== -1) {
          employee.dependents.splice(index, 1);
          this.quoteChanged();
        }
      }
    });
  }
}
