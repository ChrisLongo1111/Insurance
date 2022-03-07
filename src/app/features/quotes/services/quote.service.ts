import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { IQuote, Quote } from '@features/quotes/models/quote';
import { IQouteService } from '@features/quotes/models/quote.service.model';

@Injectable({
  providedIn: 'any'
})
export class QuoteService implements IQouteService{

  constructor(private httpClient: HttpClient) { 
  }

  public get(id: number): Observable<Quote> {
    return this.httpClient.get<IQuote>(`api/insurance/${id}`).pipe(map(quote => {
      return new Quote(quote);
    }));
  }

  public put(quote: Quote): Observable<number> {
    return this.httpClient.put<number>('api/insurance', quote);
  }
}
