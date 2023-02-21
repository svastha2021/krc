import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoObjDialogComponent } from './info-obj-dialog.component';

describe('ManageDialogComponent', () => {
  let component: InfoObjDialogComponent;
  let fixture: ComponentFixture<InfoObjDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoObjDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoObjDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
