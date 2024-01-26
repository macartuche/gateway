jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Formulario053ContrareferenciaService } from '../service/formulario-053-contrareferencia.service';

import { Formulario053ContrareferenciaDeleteDialogComponent } from './formulario-053-contrareferencia-delete-dialog.component';

describe('Formulario053Contrareferencia Management Delete Component', () => {
  let comp: Formulario053ContrareferenciaDeleteDialogComponent;
  let fixture: ComponentFixture<Formulario053ContrareferenciaDeleteDialogComponent>;
  let service: Formulario053ContrareferenciaService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Formulario053ContrareferenciaDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(Formulario053ContrareferenciaDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(Formulario053ContrareferenciaDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(Formulario053ContrareferenciaService);
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
