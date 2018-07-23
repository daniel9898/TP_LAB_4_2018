import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreferenciasComponent } from './modal-preferencias.component';

describe('ModalPreferenciasComponent', () => {
  let component: ModalPreferenciasComponent;
  let fixture: ComponentFixture<ModalPreferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
