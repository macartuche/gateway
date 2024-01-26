import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { DiscapacidadService } from '../service/discapacidad.service';
import { IDiscapacidad } from '../discapacidad.model';
import { DiscapacidadFormService } from './discapacidad-form.service';

import { DiscapacidadUpdateComponent } from './discapacidad-update.component';

describe('Discapacidad Management Update Component', () => {
  let comp: DiscapacidadUpdateComponent;
  let fixture: ComponentFixture<DiscapacidadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let discapacidadFormService: DiscapacidadFormService;
  let discapacidadService: DiscapacidadService;
  let catalogoItemService: CatalogoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DiscapacidadUpdateComponent],
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
      .overrideTemplate(DiscapacidadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DiscapacidadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    discapacidadFormService = TestBed.inject(DiscapacidadFormService);
    discapacidadService = TestBed.inject(DiscapacidadService);
    catalogoItemService = TestBed.inject(CatalogoItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CatalogoItem query and add missing value', () => {
      const discapacidad: IDiscapacidad = { id: 456 };
      const tipo: ICatalogoItem = { id: 5632 };
      discapacidad.tipo = tipo;
      const estado: ICatalogoItem = { id: 5298 };
      discapacidad.estado = estado;

      const catalogoItemCollection: ICatalogoItem[] = [{ id: 11442 }];
      jest.spyOn(catalogoItemService, 'query').mockReturnValue(of(new HttpResponse({ body: catalogoItemCollection })));
      const additionalCatalogoItems = [tipo, estado];
      const expectedCollection: ICatalogoItem[] = [...additionalCatalogoItems, ...catalogoItemCollection];
      jest.spyOn(catalogoItemService, 'addCatalogoItemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ discapacidad });
      comp.ngOnInit();

      expect(catalogoItemService.query).toHaveBeenCalled();
      expect(catalogoItemService.addCatalogoItemToCollectionIfMissing).toHaveBeenCalledWith(
        catalogoItemCollection,
        ...additionalCatalogoItems.map(expect.objectContaining),
      );
      expect(comp.catalogoItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const discapacidad: IDiscapacidad = { id: 456 };
      const tipo: ICatalogoItem = { id: 32113 };
      discapacidad.tipo = tipo;
      const estado: ICatalogoItem = { id: 14052 };
      discapacidad.estado = estado;

      activatedRoute.data = of({ discapacidad });
      comp.ngOnInit();

      expect(comp.catalogoItemsSharedCollection).toContain(tipo);
      expect(comp.catalogoItemsSharedCollection).toContain(estado);
      expect(comp.discapacidad).toEqual(discapacidad);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiscapacidad>>();
      const discapacidad = { id: 123 };
      jest.spyOn(discapacidadFormService, 'getDiscapacidad').mockReturnValue(discapacidad);
      jest.spyOn(discapacidadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ discapacidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: discapacidad }));
      saveSubject.complete();

      // THEN
      expect(discapacidadFormService.getDiscapacidad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(discapacidadService.update).toHaveBeenCalledWith(expect.objectContaining(discapacidad));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiscapacidad>>();
      const discapacidad = { id: 123 };
      jest.spyOn(discapacidadFormService, 'getDiscapacidad').mockReturnValue({ id: null });
      jest.spyOn(discapacidadService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ discapacidad: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: discapacidad }));
      saveSubject.complete();

      // THEN
      expect(discapacidadFormService.getDiscapacidad).toHaveBeenCalled();
      expect(discapacidadService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDiscapacidad>>();
      const discapacidad = { id: 123 };
      jest.spyOn(discapacidadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ discapacidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(discapacidadService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCatalogoItem', () => {
      it('Should forward to catalogoItemService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(catalogoItemService, 'compareCatalogoItem');
        comp.compareCatalogoItem(entity, entity2);
        expect(catalogoItemService.compareCatalogoItem).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
