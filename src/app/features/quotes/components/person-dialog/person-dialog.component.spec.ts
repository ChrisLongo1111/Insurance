import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotesModule } from '../../quotes.module';

import { PersonDialogComponent } from './person-dialog.component';

describe('PersonDialogComponent', () => {
  let component: PersonDialogComponent;
  let fixture: ComponentFixture<PersonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDialogComponent ],
      imports: [        
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        QuotesModule,
        BrowserAnimationsModule
      ],
      providers: [
	      { provide: MatDialogRef, useValue: {} },
	      { provide: MAT_DIALOG_DATA, useValue: [] },
      ]   
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
