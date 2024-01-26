import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { EspecialidadService } from '../service/especialidad.service';
import { IEspecialidad } from '../especialidad.model';
import { EspecialidadFormService } from './especialidad-form.service';

import { EspecialidadUpdateComponent } from './especialidad-update.component';

describe('Especialidad Management Update Component', () => {
  let comp: EspecialidadUpdateComponent;
  let fixture: ComponentFixture<EspecialidadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let especialidadFormService: EspecialidadFormService;
  let especialidadService: EspecialidadService;
  let catalogoItemService: CatalogoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), EspecialidadUpdateComponent],
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
      .overrideTemplate(EspecialidadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EspecialidadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    especialidadFormService = TestBed.inject(EspecialidadFormService);
    especialidadService = TestBed.inject(EspecialidadService);
    catalogoItemService = TestBed.inject(CatalogoItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CatalogoItem query and add missing value', () => {
      const especialidad: IEspecialidad = { id: 456 };
      const tipo: ICatalogoItem = { id: 22041 };
      especialidad.tipo = tipo;

      const catalogoItemCollection: ICatalogoItem[] = [{ id: 12968 }];
      jest.spyOn(catalogoItemService, 'query').mockReturnValue(of(new HttpResponse({ body: catalogoItemCollection })));
      const additionalCatalogoItems = [tipo];
      const expectedCollection: ICatalogoItem[] = [...additionalCatalogoItems, ...catalogoItemCollection];
      jest.spyOn(catalogoItemService, 'addCatalogoItemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ especialidad });
      comp.ngOnInit();

      expect(catalogoItemService.query).toHaveBeenCalled();
      expect(catalogoItemService.addCatalogoItemToCollectionIfMissing).toHaveBeenCalledWith(
        catalogoItemCollection,
        ...additionalCatalogoItems.map(expect.objectContaining),
      );
      expect(comp.catalogoItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const especialidad: IEspecialidad = { id: 456 };
      const tipo: ICatalogoItem = { id: 6008 };
      especialidad.tipo = tipo;

      activatedRoute.data = of({ especialidad });
      comp.ngOnInit();

      expect(comp.catalogoItemsSharedCollection).toContain(tipo);
      expect(comp.especialidad).toEqual(especialidad);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEspecialidad>>();
      const especialidad = { id: 123 };
      jest.spyOn(especialidadFormService, 'getEspecialidad').mockReturnValue(especialidad);
      jest.spyOn(especialidadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ especialidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: especialidad }));
      saveSubject.complete();

      // THEN
      expect(especialidadFormService.getEspecialidad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(especialidadService.update).toHaveBeenCalledWith(expect.objectContaining(especialidad));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEspecialidad>>();
      const especialidad = { id: 123 };
      jest.spyOn(especialidadFormService, 'getEspecialidad').mockReturnValue({ id: null });
      jest.spyOn(especialidadService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ especialidad: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: especialidad }));
      saveSubject.complete();

      // THEN
      expect(especialidadFormService.getEspecialidad).toHaveBeenCalled();
      expect(especialidadService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEspecialidad>>();
      const especialidad = { id: 123 };
      jest.spyOn(especialidadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ especialidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(especialidadService.update).toHaveBeenCalled();
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
