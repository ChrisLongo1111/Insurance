import { Component, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
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
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
    
  public quoteAmount: number = 0;
  public quote: Quote = new Quote();
  public employeesQuote: Array<number> = []
  
  constructor(public dialog: MatDialog, private zone: NgZone) { 
  }

  public ngOnInit(): void {
    this.quoteChanged();
  }

  public quoteChanged(): void {
    this.quoteAmount = this.quote.calculate();
    this.employeesQuote = this.quote.calculateByEmployee();
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
        
        setTimeout(() => {
          this.zone.run(() => {
            if (this.panels) {
              const panel = this.panels.get(this.panels.length - 1) as MatExpansionPanel;
              if (panel) {
                panel.expanded = true;
              }
            }
          });
        });
      }
    });
  }

  public editEmployee(employee: Employee): void {
    const person = new Person();
    person.firstName = employee.firstName;
    person.lastName = employee.lastName;
    const dialogData = new PersonDialogModel("Edit Employee", person);

    const dialogRef = this.dialog.open(PersonDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        employee.lastName = person.lastName;
        employee.firstName = person.firstName;
        this.quoteChanged();
      }
    });
  }

  public deleteEmployee(employee: Employee): void {
    const dialogData = new ConfirmDialogModel("Remove Employee", 'Are you sure you want to remove this employee?');
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

  public addDependent(employee: Employee): void {
    const dependent = new Dependent();

    const dialogData = new PersonDialogModel("Add Dependent", dependent);
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        employee.dependents.push(dependent);
        this.quoteChanged();
      }
    });
  }

  public editDependent(dependent: Dependent): void {
    const person = new Person();
    person.firstName = dependent.firstName;
    person.lastName = dependent.lastName;

    const dialogData = new PersonDialogModel("Add Dependent", person);
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        dependent.firstName = person.firstName;
        dependent.lastName = person.lastName;
        this.quoteChanged();
      }
    });
  }

  public deleteDependent(employee: Employee, dependent: Dependent): void {
    const dialogData = new ConfirmDialogModel("Remove Dependent", 'Are you sure you want to remove this dependent?');
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
