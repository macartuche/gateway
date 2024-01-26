import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { Formulario053Service } from 'app/entities/serviciosmedicos/formulario-053/service/formulario-053.service';
import { Formulario053ReferenciaService } from '../service/formulario-053-referencia.service';
import { IFormulario053Referencia } from '../formulario-053-referencia.model';
import { Formulario053ReferenciaFormService } from './formulario-053-referencia-form.service';

import { Formulario053ReferenciaUpdateComponent } from './formulario-053-referencia-update.component';

describe('Formulario053Referencia Management Update Component', () => {
  let comp: Formulario053ReferenciaUpdateComponent;
  let fixture: ComponentFixture<Formulario053ReferenciaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let formulario053ReferenciaFormService: Formulario053ReferenciaFormService;
  let formulario053ReferenciaService: Formulario053ReferenciaService;
  let formulario053Service: Formulario053Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Formulario053ReferenciaUpdateComponent],
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
      .overrideTemplate(Formulario053ReferenciaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Formulario053ReferenciaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    formulario053ReferenciaFormService = TestBed.inject(Formulario053ReferenciaFormService);
    formulario053ReferenciaService = TestBed.inject(Formulario053ReferenciaService);
    formulario053Service = TestBed.inject(Formulario053Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Formulario053 query and add missing value', () => {
      const formulario053Referencia: IFormulario053Referencia = { id: 456 };
      const formulario: IFormulario053 = { id: 28418 };
      formulario053Referencia.formulario = formulario;

      const formulario053Collection: IFormulario053[] = [{ id: 16794 }];
      jest.spyOn(formulario053Service, 'query').mockReturnValue(of(new HttpResponse({ body: formulario053Collection })));
      const additionalFormulario053s = [formulario];
      const expectedCollection: IFormulario053[] = [...additionalFormulario053s, ...formulario053Collection];
      jest.spyOn(formulario053Service, 'addFormulario053ToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ formulario053Referencia });
      comp.ngOnInit();

      expect(formulario053Service.query).toHaveBeenCalled();
      expect(formulario053Service.addFormulario053ToCollectionIfMissing).toHaveBeenCalledWith(
        formulario053Collection,
        ...additionalFormulario053s.map(expect.objectContaining),
      );
      expect(comp.formulario053sSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const formulario053Referencia: IFormulario053Referencia = { id: 456 };
      const formulario: IFormulario053 = { id: 27139 };
      formulario053Referencia.formulario = formulario;

      activatedRoute.data = of({ formulario053Referencia });
      comp.ngOnInit();

      expect(comp.formulario053sSharedCollection).toContain(formulario);
      expect(comp.formulario053Referencia).toEqual(formulario053Referencia);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053Referencia>>();
      const formulario053Referencia = { id: 123 };
      jest.spyOn(formulario053ReferenciaFormService, 'getFormulario053Referencia').mockReturnValue(formulario053Referencia);
      jest.spyOn(formulario053ReferenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053Referencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formulario053Referencia }));
      saveSubject.complete();

      // THEN
      expect(formulario053ReferenciaFormService.getFormulario053Referencia).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(formulario053ReferenciaService.update).toHaveBeenCalledWith(expect.objectContaining(formulario053Referencia));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053Referencia>>();
      const formulario053Referencia = { id: 123 };
      jest.spyOn(formulario053ReferenciaFormService, 'getFormulario053Referencia').mockReturnValue({ id: null });
      jest.spyOn(formulario053ReferenciaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053Referencia: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formulario053Referencia }));
      saveSubject.complete();

      // THEN
      expect(formulario053ReferenciaFormService.getFormulario053Referencia).toHaveBeenCalled();
      expect(formulario053ReferenciaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053Referencia>>();
      const formulario053Referencia = { id: 123 };
      jest.spyOn(formulario053ReferenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053Referencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(formulario053ReferenciaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFormulario053', () => {
      it('Should forward to formulario053Service', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(formulario053Service, 'compareFormulario053');
        comp.compareFormulario053(entity, entity2);
        expect(formulario053Service.compareFormulario053).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
