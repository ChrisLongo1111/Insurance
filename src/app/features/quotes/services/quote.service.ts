import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Quote } from '@features/quotes/models/quote';

@Injectable({
  providedIn: 'any'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { 
  }

  public get(id: number): Observable<Quote> {
    return this.httpClient.get<Quote>(`api/quotes/${id}`);
  }

  public put(quote: Quote): Observable<any> {
    return this.httpClient.put<Quote>('api/quotes', quote);
  }
}
