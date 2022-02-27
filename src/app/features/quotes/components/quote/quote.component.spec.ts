import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UxModule } from 'src/app/features/ux/ux.module';
import { QuotesModule } from '../../quotes.module';
import { PersonDialogComponent } from '../person-dialog/person-dialog.component';
import { ConfirmDialogComponent } from 'src/app/features/ux/components/confirm-dialog/confirm-dialog.component';
import { QuoteComponent } from './quote.component';
import { MockQuoteService } from '../../services/mock-quote.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteComponent, PersonDialogComponent, ConfirmDialogComponent ],
      imports: [
        QuotesModule,
        MatButtonModule,
        MatDialogModule,
        UxModule,
        NoopAnimationsModule
      ],      
      providers: [
	      { provide: MatDialogRef, useValue: {} },
	      { provide: MAT_DIALOG_DATA, useValue: [] },
        MockQuoteService
      ]   
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
