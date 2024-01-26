jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Formulario053ReferenciaService } from '../service/formulario-053-referencia.service';

import { Formulario053ReferenciaDeleteDialogComponent } from './formulario-053-referencia-delete-dialog.component';

describe('Formulario053Referencia Management Delete Component', () => {
  let comp: Formulario053ReferenciaDeleteDialogComponent;
  let fixture: ComponentFixture<Formulario053ReferenciaDeleteDialogComponent>;
  let service: Formulario053ReferenciaService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Formulario053ReferenciaDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(Formulario053ReferenciaDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(Formulario053ReferenciaDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(Formulario053ReferenciaService);
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
