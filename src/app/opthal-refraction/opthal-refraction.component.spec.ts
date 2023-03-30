import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpthalRefractionComponent } from './opthal-refraction.component';

describe('OpthalRefractionComponent', () => {
  let component: OpthalRefractionComponent;
  let fixture: ComponentFixture<OpthalRefractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpthalRefractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpthalRefractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
