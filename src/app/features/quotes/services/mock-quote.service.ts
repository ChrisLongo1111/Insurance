import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Dependent } from '@features/quotes/models/dependent';
import { Employee } from '@features/quotes/models/employee';
import { Quote } from '@features/quotes/models/quote';

@Injectable({
  providedIn: 'any'
})
export class MockQuoteService {

  constructor() { 
  }

  public get(): Observable<Quote> {
    const quote = new Quote();
    quote.employees = [new Employee(), new Employee()];
    quote.employees[0].firstName = 'Chris';
    quote.employees[0].lastName = 'Longo';
    const dependent = new Dependent();
    dependent.firstName = 'Andy';
    dependent.lastName = 'Longo';
    quote.employees[0].dependents.push(dependent);
    return of(quote);
  }

  public put(quote: Quote): Observable<any> {
      return of(null);
  }
}
