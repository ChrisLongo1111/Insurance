import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Dependent } from '@features/quotes/models/dependent';
import { Employee } from '@features/quotes/models/employee';
import { IQuote, Quote } from '@features/quotes/models/quote';
import { IQouteService } from '../models/quote.service.model';

@Injectable({
  providedIn: 'any'
})
export class MockQuoteService implements IQouteService {

  constructor() { 
  }

  public get(id: number): Observable<Quote> {
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

  public put(quote: IQuote): Observable<number> {
    return of(1);
  }
}
