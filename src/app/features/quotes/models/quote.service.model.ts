import { Observable } from "rxjs";
import { IQuote } from "@features/quotes/models/quote";

export interface IQouteService {
    
    get(id: number): Observable<IQuote>;
    
    put(quote: IQuote): Observable<number>;
}