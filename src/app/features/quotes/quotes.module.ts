import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { PersonDialogComponent } from '@features/quotes/components/person-dialog/person-dialog.component';
import { QuoteComponent } from '@features/quotes/components/quote/quote.component';
import { QuoteRoutingModule } from '@features/quotes/quote-routing.module';
import { UxModule } from '@features/ux/ux.module';

@NgModule({
  declarations: [
    QuoteComponent,
    PersonDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuoteRoutingModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    UxModule
  ],
  providers: [MatDatepickerModule]
})
export class QuotesModule { }
