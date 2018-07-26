import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBajaReservaComponent } from './modal-baja-reserva.component';

describe('ModalBajaReservaComponent', () => {
  let component: ModalBajaReservaComponent;
  let fixture: ComponentFixture<ModalBajaReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBajaReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBajaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
