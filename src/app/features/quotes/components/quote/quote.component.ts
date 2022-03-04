import { Component, NgZone, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { map, Observable, take } from 'rxjs';

import { Dependent } from '@features/quotes/models/dependent';
import { Employee } from '@features/quotes/models/employee';
import { Person } from '@features/quotes/models/person';
import { Quote } from '@features/quotes/models/quote';
import { PersonDialogComponent, PersonDialogModel } from '@features/quotes/components/person-dialog/person-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@features/ux/components/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent, MessageDialogModel } from '@features/ux/components/message-dialog/message-dialog.component';
import { QuoteService } from '@features/quotes/services/quote.service';

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
  public quote: Quote;
  public quote$: Observable<any> | undefined;
  public employeesQuote: Array<number> = []
  
  constructor(public dialog: MatDialog, private zone: NgZone, private quoteService: QuoteService) { 
    this.quote = new Quote();
  }

  public ngOnInit(): void {
    this.quote$ = this.quoteService.get(1).pipe(take(1)).pipe(map(quote => {
      this.quote = quote;
      this.quoteChanged();
      return quote;
    }));
  }

  public quoteChanged(): void {
    this.quoteAmount = this.quote.calculate();
    this.employeesQuote = this.quote.calculateByEmployee();
  }

  public addEmployee(): void {
    const employee = new Employee();
    const dialogData = new PersonDialogModel("Add Employee", employee);

    const dialogRef = this.dialog.open(PersonDialogComponent, {
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

  public save(): void {
    this.quoteService.put(this.quote).pipe(take(1)).subscribe({
        next: () => this.displayMessage('Quote', 'Saved'),
        error: (error) => this.displayMessage('Error', error.error)
      }
    );
  } 

  public addDependent(employee: Employee, index: number): void {
    const dependent = new Dependent();
    const dialogData = new PersonDialogModel("Add Dependent", dependent);
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        employee.dependents.push(dependent);
        this.quoteChanged();
        if (employee.income < this.employeesQuote[index]) {
          this.removeDependent(employee, dependent);         
          this.displayMessage('Limit Exceeded', 'Benefits exceeded income');
        }
      }
    });
  }

  public editDependent(dependent: Dependent): void {
    const person = new Person();
    person.firstName = dependent.firstName;
    person.lastName = dependent.lastName;

    const dialogData = new PersonDialogModel("Add Dependent", person);
    const dialogRef = this.dialog.open(PersonDialogComponent, {
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
      data: dialogData
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(dialogResult => {
      if (dialogResult) {
        this.removeDependent(employee, dependent);
      }
    });
  }

  public trackByPersonId(index: number, person: Person): string {
    if (person.id) {
      return person?.id?.toString();
    }
    return '-1';
  }

  private removeDependent(employee: Employee, dependent: Dependent) {
    const index = employee.dependents.indexOf(dependent);
    if (index !== -1) {
      employee.dependents.splice(index, 1);
      this.quoteChanged();
    }
  }

  private displayMessage(title: string, message: string): void {
    const dialogData = new MessageDialogModel(title, message);
    this.dialog.open(MessageDialogComponent, {
      data: dialogData
    });
  }
}
