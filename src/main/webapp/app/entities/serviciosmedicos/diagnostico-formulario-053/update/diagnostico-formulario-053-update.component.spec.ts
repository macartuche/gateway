import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IFormulario053Referencia } from 'app/entities/serviciosmedicos/formulario-053-referencia/formulario-053-referencia.model';
import { Formulario053ReferenciaService } from 'app/entities/serviciosmedicos/formulario-053-referencia/service/formulario-053-referencia.service';
import { IFormulario053Contrareferencia } from 'app/entities/serviciosmedicos/formulario-053-contrareferencia/formulario-053-contrareferencia.model';
import { Formulario053ContrareferenciaService } from 'app/entities/serviciosmedicos/formulario-053-contrareferencia/service/formulario-053-contrareferencia.service';
import { IItemCie } from 'app/entities/serviciosmedicos/item-cie/item-cie.model';
import { ItemCieService } from 'app/entities/serviciosmedicos/item-cie/service/item-cie.service';
import { IDiagnosticoFormulario053 } from '../diagnostico-formulario-053.model';
import { DiagnosticoFormulario053Service } from '../service/diagnostico-formulario-053.service';
import { DiagnosticoFormulario053FormService } from './diagnostico-formulario-053-form.service';

import { DiagnosticoFormulario053UpdateComponent } from './diagnostico-formulario-053-update.component';

describe('DiagnosticoFormulario053 Management Update Component', () => {
  let comp: DiagnosticoFormulario053UpdateComponent;
  let fixture: ComponentFixture<DiagnosticoFormulario053UpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let diagnosticoFormulario053FormService: DiagnosticoFormulario053FormService;
  let diagnosticoFormulario053Service: DiagnosticoFormulario053Service;
  let formulario053ReferenciaService: Formulario053ReferenciaService;
  let formulario053ContrareferenciaService: Formulario053ContrareferenciaService;
  let itemCieService: ItemCieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DiagnosticoFormulario053UpdateComponent],
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
      .overrideTemplate(DiagnosticoFormulario053UpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DiagnosticoFormulario053UpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    diagnosticoFormulario053FormService = TestBed.inject(DiagnosticoFormulario053FormService);
    diagnosticoFormulario053Service = TestBed.inject(DiagnosticoFormulario053Service);
    formulario053ReferenciaService = TestBed.inject(Formulario053ReferenciaService);
    formulario053ContrareferenciaService = TestBed.inject(Formulario053ContrareferenciaService);
    itemCieService = TestBed.inject(ItemCieService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Formulario053Referencia query and add missing value', () => {
      const diagnosticoFormulario053: IDiagnosticoFormulario053 = { id: 456 };
      const referencia: IFormulario053Referencia = { id: 18221 };
      diagnosticoFormulario053.referencia = referencia;

      const formulario053ReferenciaCollection: IFormulario053Referencia[] = [{ id: 27415 }];
      jest
        .spyOn(formulario053ReferenciaService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: formulario053ReferenciaCollection })));
      const additionalFormulario053Referencias = [referencia];
      const expectedCollection: IFormulario053Referencia[] = [...additionalFormulario053Referencias, ...formulario053ReferenciaCollection];
      jest.spyOn(formulario053ReferenciaService, 'addFormulario053ReferenciaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ diagnosticoFormulario053 });
      comp.ngOnInit();

      expect(formulario053ReferenciaService.query).toHaveBeenCalled();
      expect(formulario053ReferenciaService.addFormulario053ReferenciaToCollectionIfMissing).toHaveBeenCalledWith(
        formulario053ReferenciaCollection,
        ...additionalFormulario053Referencias.map(expect.objectContaining),
      );
      expect(comp.formulario053ReferenciasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Formulario053Contrareferencia query and add missing value', () => {
      const diagnosticoFormulario053: IDiagnosticoFormulario053 = { id: 456 };
      const contrareferencia: IFormulario053Contrareferencia = { id: 31076 };
      diagnosticoFormulario053.contrareferencia = contrareferencia;

      const formulario053ContrareferenciaCollection: IFormulario053Contrareferencia[] = [{ id: 25648 }];
      jest
        .spyOn(formulario053ContrareferenciaService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: formulario053ContrareferenciaCollection })));
      const additionalFormulario053Contrareferencias = [contrareferencia];
      const expectedCollection: IFormulario053Contrareferencia[] = [
        ...additionalFormulario053Contrareferencias,
        ...formulario053ContrareferenciaCollection,
      ];
      jest
        .spyOn(formulario053ContrareferenciaService, 'addFormulario053ContrareferenciaToCollectionIfMissing')
        .mockReturnValue(expectedCollection);

      activatedRoute.data = of({ diagnosticoFormulario053 });
      comp.ngOnInit();

      expect(formulario053ContrareferenciaService.query).toHaveBeenCalled();
      expect(formulario053ContrareferenciaService.addFormulario053ContrareferenciaToCollectionIfMissing).toHaveBeenCalledWith(
        formulario053ContrareferenciaCollection,
        ...additionalFormulario053Contrareferencias.map(expect.objectContaining),
      );
      expect(comp.formulario053ContrareferenciasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ItemCie query and add missing value', () => {
      const diagnosticoFormulario053: IDiagnosticoFormulario053 = { id: 456 };
      const itemCie: IItemCie = { id: 25604 };
      diagnosticoFormulario053.itemCie = itemCie;

      const itemCieCollection: IItemCie[] = [{ id: 28045 }];
      jest.spyOn(itemCieService, 'query').mockReturnValue(of(new HttpResponse({ body: itemCieCollection })));
      const additionalItemCies = [itemCie];
      const expectedCollection: IItemCie[] = [...additionalItemCies, ...itemCieCollection];
      jest.spyOn(itemCieService, 'addItemCieToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ diagnosticoFormulario053 });
      comp.ngOnInit();

      expect(itemCieService.query).toHaveBeenCalled();
      expect(itemCieService.addItemCieToCollectionIfMissing).toHaveBeenCalledWith(
        itemCieCollection,
        ...additionalItemCies.map(expect.objectContaining),
      );
      expect(comp.itemCiesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const diagnosticoFormulario053: IDiagnosticoFormulario053 = { id: 456 };
      const referencia: IFormulario053Referencia = { id: 30471 };
      diagnosticoFormulario053.referencia = referencia;
      const contrareferencia: IFormulario053Contrareferencia = { id: 18244 };
      diagnosticoFormulario053.contrareferencia = contrareferencia;
      const itemCie: IItemCie = { id: 8907 };
      diagnosticoFormulario053.itemCie = itemCie;

      activatedRoute.data = of({ diagnosticoFormulario053 });
      comp.ngOnInit();

      expect(comp.formulario053ReferenciasSharedCollection).toContain(referencia);
      expect(comp.formulario053ContrareferenciasSharedCollection).toContain(contrareferencia);
      expect(comp.itemCiesSharedCollection).toContain(itemCie);
      expect(comp.diagnosticoFormulario053).toEqual(diagnosticoFormulario053);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiagnosticoFormulario053>>();
      const diagnosticoFormulario053 = { id: 123 };
      jest.spyOn(diagnosticoFormulario053FormService, 'getDiagnosticoFormulario053').mockReturnValue(diagnosticoFormulario053);
      jest.spyOn(diagnosticoFormulario053Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ diagnosticoFormulario053 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: diagnosticoFormulario053 }));
      saveSubject.complete();

      // THEN
      expect(diagnosticoFormulario053FormService.getDiagnosticoFormulario053).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(diagnosticoFormulario053Service.update).toHaveBeenCalledWith(expect.objectContaining(diagnosticoFormulario053));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiagnosticoFormulario053>>();
      const diagnosticoFormulario053 = { id: 123 };
      jest.spyOn(diagnosticoFormulario053FormService, 'getDiagnosticoFormulario053').mockReturnValue({ id: null });
      jest.spyOn(diagnosticoFormulario053Service, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ diagnosticoFormulario053: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: diagnosticoFormulario053 }));
      saveSubject.complete();

      // THEN
      expect(diagnosticoFormulario053FormService.getDiagnosticoFormulario053).toHaveBeenCalled();
      expect(diagnosticoFormulario053Service.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiagnosticoFormulario053>>();
      const diagnosticoFormulario053 = { id: 123 };
      jest.spyOn(diagnosticoFormulario053Service, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ diagnosticoFormulario053 });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(diagnosticoFormulario053Service.update).toHaveBeenCalled();
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

    describe('compareFormulario053Contrareferencia', () => {
      it('Should forward to formulario053ContrareferenciaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(formulario053ContrareferenciaService, 'compareFormulario053Contrareferencia');
        comp.compareFormulario053Contrareferencia(entity, entity2);
        expect(formulario053ContrareferenciaService.compareFormulario053Contrareferencia).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareItemCie', () => {
      it('Should forward to itemCieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(itemCieService, 'compareItemCie');
        comp.compareItemCie(entity, entity2);
        expect(itemCieService.compareItemCie).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
