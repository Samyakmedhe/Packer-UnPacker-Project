import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpackerComponent } from './unpacker.component';

describe('UnpackerComponent', () => {
  let component: UnpackerComponent;
  let fixture: ComponentFixture<UnpackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnpackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
