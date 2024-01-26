import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IFormulario053 } from 'app/entities/serviciosmedicos/formulario-053/formulario-053.model';
import { Formulario053Service } from 'app/entities/serviciosmedicos/formulario-053/service/formulario-053.service';
import { Formulario053ContrareferenciaService } from '../service/formulario-053-contrareferencia.service';
import { IFormulario053Contrareferencia } from '../formulario-053-contrareferencia.model';
import { Formulario053ContrareferenciaFormService } from './formulario-053-contrareferencia-form.service';

import { Formulario053ContrareferenciaUpdateComponent } from './formulario-053-contrareferencia-update.component';

describe('Formulario053Contrareferencia Management Update Component', () => {
  let comp: Formulario053ContrareferenciaUpdateComponent;
  let fixture: ComponentFixture<Formulario053ContrareferenciaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let formulario053ContrareferenciaFormService: Formulario053ContrareferenciaFormService;
  let formulario053ContrareferenciaService: Formulario053ContrareferenciaService;
  let formulario053Service: Formulario053Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), Formulario053ContrareferenciaUpdateComponent],
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
      .overrideTemplate(Formulario053ContrareferenciaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Formulario053ContrareferenciaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    formulario053ContrareferenciaFormService = TestBed.inject(Formulario053ContrareferenciaFormService);
    formulario053ContrareferenciaService = TestBed.inject(Formulario053ContrareferenciaService);
    formulario053Service = TestBed.inject(Formulario053Service);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Formulario053 query and add missing value', () => {
      const formulario053Contrareferencia: IFormulario053Contrareferencia = { id: 456 };
      const formulario: IFormulario053 = { id: 26741 };
      formulario053Contrareferencia.formulario = formulario;

      const formulario053Collection: IFormulario053[] = [{ id: 12610 }];
      jest.spyOn(formulario053Service, 'query').mockReturnValue(of(new HttpResponse({ body: formulario053Collection })));
      const additionalFormulario053s = [formulario];
      const expectedCollection: IFormulario053[] = [...additionalFormulario053s, ...formulario053Collection];
      jest.spyOn(formulario053Service, 'addFormulario053ToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ formulario053Contrareferencia });
      comp.ngOnInit();

      expect(formulario053Service.query).toHaveBeenCalled();
      expect(formulario053Service.addFormulario053ToCollectionIfMissing).toHaveBeenCalledWith(
        formulario053Collection,
        ...additionalFormulario053s.map(expect.objectContaining),
      );
      expect(comp.formulario053sSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const formulario053Contrareferencia: IFormulario053Contrareferencia = { id: 456 };
      const formulario: IFormulario053 = { id: 30212 };
      formulario053Contrareferencia.formulario = formulario;

      activatedRoute.data = of({ formulario053Contrareferencia });
      comp.ngOnInit();

      expect(comp.formulario053sSharedCollection).toContain(formulario);
      expect(comp.formulario053Contrareferencia).toEqual(formulario053Contrareferencia);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053Contrareferencia>>();
      const formulario053Contrareferencia = { id: 123 };
      jest
        .spyOn(formulario053ContrareferenciaFormService, 'getFormulario053Contrareferencia')
        .mockReturnValue(formulario053Contrareferencia);
      jest.spyOn(formulario053ContrareferenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053Contrareferencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formulario053Contrareferencia }));
      saveSubject.complete();

      // THEN
      expect(formulario053ContrareferenciaFormService.getFormulario053Contrareferencia).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(formulario053ContrareferenciaService.update).toHaveBeenCalledWith(expect.objectContaining(formulario053Contrareferencia));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053Contrareferencia>>();
      const formulario053Contrareferencia = { id: 123 };
      jest.spyOn(formulario053ContrareferenciaFormService, 'getFormulario053Contrareferencia').mockReturnValue({ id: null });
      jest.spyOn(formulario053ContrareferenciaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053Contrareferencia: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: formulario053Contrareferencia }));
      saveSubject.complete();

      // THEN
      expect(formulario053ContrareferenciaFormService.getFormulario053Contrareferencia).toHaveBeenCalled();
      expect(formulario053ContrareferenciaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFormulario053Contrareferencia>>();
      const formulario053Contrareferencia = { id: 123 };
      jest.spyOn(formulario053ContrareferenciaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ formulario053Contrareferencia });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(formulario053ContrareferenciaService.update).toHaveBeenCalled();
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
