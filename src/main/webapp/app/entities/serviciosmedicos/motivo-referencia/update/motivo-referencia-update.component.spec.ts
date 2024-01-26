import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IFormulario053Referencia } from 'app/entities/serviciosmedicos/formulario-053-referencia/formulario-053-referencia.model';
import { Formulario053ReferenciaService } from 'app/entities/serviciosmedicos/formulario-053-referencia/service/formulario-053-referencia.service';
import { MotivoReferenciaService } from '../service/motivo-referencia.service';
import { IMotivoReferencia } from '../motivo-referencia.model';
import { MotivoReferenciaFormService } from './motivo-referencia-form.service';

import { MotivoReferenciaUpdateComponent } from './motivo-referencia-update.component';

describe('MotivoReferencia Management Update Component', () => {
  let comp: MotivoReferenciaUpdateComponent;
  let fixture: ComponentFixture<MotivoReferenciaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let motivoReferenciaFormService: MotivoReferenciaFormService;
  let motivoReferenciaService: MotivoReferenciaService;
  let formulario053ReferenciaService: Formulario053ReferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), MotivoReferenciaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(MotivoReferenciaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MotivoReferenciaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    motivoReferenciaFormService = TestBed.inject(MotivoReferenciaFormService);
    motivoReferenciaService = TestBed.inject(MotivoReferenciaService);
    formulario053ReferenciaService = TestBed.inject(Formulario053ReferenciaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Formulario053Referencia query and add missing value', () => {
      const motivoReferencia: IMotivoReferencia = { id: 456 };
      const referencia: IFormulario053Referencia = { id: 29545 };
      motivoReferencia.referencia = referencia;

      const formulario053ReferenciaCollection: IFormulario053Referencia[] = [{ id: 19934 }];
      jest
        .spyOn(formulario053ReferenciaService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: formulario053ReferenciaCollection })));
      const additionalFormulario053Referencias = [referencia];
      const expectedCollection: IFormulario053Referencia[] = [...additionalFormulario053Referencias, ...formulario053ReferenciaCollection];
      jest.spyOn(formulario053ReferenciaService, 'addFormulario053ReferenciaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ motivoReferencia });
      comp.ngOnInit();

      expect(formulario053ReferenciaService.query).toHaveBeenCalled();
      expect(formulario053ReferenciaService.addFormulario053ReferenciaToCollectionIfMissing).toHaveBeenCalledWith(
        formulario053ReferenciaCollection,
        ...additionalFormulario053Referencias.map(expect.objectContaining),
      );
      expect(comp.formulario053ReferenciasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const motivoReferencia: IMotivoReferencia = { id: 456 };
      const referencia: IFormulario053Referencia = { id: 31319 };
      motivoReferencia.referencia = referencia;

      activatedRoute.data = of({ motivoReferencia });
      comp.ngOnInit();

      expect(comp.formulario053ReferenciasSharedCollection).toContain(referencia);
      expect(comp.motivoReferencia).toEqual(motivoReferencia);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMotivoReferencia>>();
      const motivoReferencia = { id: 123 };
      jest.spyOn(motivoReferenciaFormService, 'getMotivoReferencia').mockReturnValue(motivoReferencia);
      jest.spyOn(motivoReferenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ motivoReferencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: motivoReferencia }));
      saveSubject.complete();

      // THEN
      expect(motivoReferenciaFormService.getMotivoReferencia).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(motivoReferenciaService.update).toHaveBeenCalledWith(expect.objectContaining(motivoReferencia));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMotivoReferencia>>();
      const motivoReferencia = { id: 123 };
      jest.spyOn(motivoReferenciaFormService, 'getMotivoReferencia').mockReturnValue({ id: null });
      jest.spyOn(motivoReferenciaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ motivoReferencia: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: motivoReferencia }));
      saveSubject.complete();

      // THEN
      expect(motivoReferenciaFormService.getMotivoReferencia).toHaveBeenCalled();
      expect(motivoReferenciaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMotivoReferencia>>();
      const motivoReferencia = { id: 123 };
      jest.spyOn(motivoReferenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ motivoReferencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(motivoReferenciaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFormulario053Referencia', () => {
      it('Should forward to formulario053ReferenciaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(formulario053ReferenciaService, 'compareFormulario053Referencia');
        comp.compareFormulario053Referencia(entity, entity2);
        expect(formulario053ReferenciaService.compareFormulario053Referencia).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
