import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteComponent } from './components/quote/quote.component';
import { QuoteRoutingModule } from './quote-routing.module';

@NgModule({
  declarations: [
    QuoteComponent
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule
  ]
})
export class QuotesModule { }
