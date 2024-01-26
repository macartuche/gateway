jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';

import { DiagnosticoFormulario053DeleteDialogComponent } from './diagnostico-formulario-053-delete-dialog.component';

describe('DiagnosticoFormulario053 Management Delete Component', () => {
  let comp: DiagnosticoFormulario053DeleteDialogComponent;
  let fixture: ComponentFixture<DiagnosticoFormulario053DeleteDialogComponent>;
  let service: DiagnosticoFormulario053Service;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DiagnosticoFormulario053DeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(DiagnosticoFormulario053DeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DiagnosticoFormulario053DeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DiagnosticoFormulario053Service);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
