import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { IFirmaDigital } from '../firma-digital.model';
import { FirmaDigitalService } from '../service/firma-digital.service';
import { FirmaDigitalFormService } from './firma-digital-form.service';

import { FirmaDigitalUpdateComponent } from './firma-digital-update.component';

describe('FirmaDigital Management Update Component', () => {
  let comp: FirmaDigitalUpdateComponent;
  let fixture: ComponentFixture<FirmaDigitalUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let firmaDigitalFormService: FirmaDigitalFormService;
  let firmaDigitalService: FirmaDigitalService;
  let catalogoItemService: CatalogoItemService;
  let personaService: PersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), FirmaDigitalUpdateComponent],
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
      .overrideTemplate(FirmaDigitalUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FirmaDigitalUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    firmaDigitalFormService = TestBed.inject(FirmaDigitalFormService);
    firmaDigitalService = TestBed.inject(FirmaDigitalService);
    catalogoItemService = TestBed.inject(CatalogoItemService);
    personaService = TestBed.inject(PersonaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CatalogoItem query and add missing value', () => {
      const firmaDigital: IFirmaDigital = { id: 456 };
      const tipo: ICatalogoItem = { id: 683 };
      firmaDigital.tipo = tipo;

      const catalogoItemCollection: ICatalogoItem[] = [{ id: 1592 }];
      jest.spyOn(catalogoItemService, 'query').mockReturnValue(of(new HttpResponse({ body: catalogoItemCollection })));
      const additionalCatalogoItems = [tipo];
      const expectedCollection: ICatalogoItem[] = [...additionalCatalogoItems, ...catalogoItemCollection];
      jest.spyOn(catalogoItemService, 'addCatalogoItemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ firmaDigital });
      comp.ngOnInit();

      expect(catalogoItemService.query).toHaveBeenCalled();
      expect(catalogoItemService.addCatalogoItemToCollectionIfMissing).toHaveBeenCalledWith(
        catalogoItemCollection,
        ...additionalCatalogoItems.map(expect.objectContaining),
      );
      expect(comp.catalogoItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Persona query and add missing value', () => {
      const firmaDigital: IFirmaDigital = { id: 456 };
      const persona: IPersona = { id: 859 };
      firmaDigital.persona = persona;

      const personaCollection: IPersona[] = [{ id: 4958 }];
      jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
      const additionalPersonas = [persona];
      const expectedCollection: IPersona[] = [...additionalPersonas, ...personaCollection];
      jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ firmaDigital });
      comp.ngOnInit();

      expect(personaService.query).toHaveBeenCalled();
      expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(
        personaCollection,
        ...additionalPersonas.map(expect.objectContaining),
      );
      expect(comp.personasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const firmaDigital: IFirmaDigital = { id: 456 };
      const tipo: ICatalogoItem = { id: 12423 };
      firmaDigital.tipo = tipo;
      const persona: IPersona = { id: 3258 };
      firmaDigital.persona = persona;

      activatedRoute.data = of({ firmaDigital });
      comp.ngOnInit();

      expect(comp.catalogoItemsSharedCollection).toContain(tipo);
      expect(comp.personasSharedCollection).toContain(persona);
      expect(comp.firmaDigital).toEqual(firmaDigital);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFirmaDigital>>();
      const firmaDigital = { id: 123 };
      jest.spyOn(firmaDigitalFormService, 'getFirmaDigital').mockReturnValue(firmaDigital);
      jest.spyOn(firmaDigitalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ firmaDigital });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: firmaDigital }));
      saveSubject.complete();

      // THEN
      expect(firmaDigitalFormService.getFirmaDigital).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(firmaDigitalService.update).toHaveBeenCalledWith(expect.objectContaining(firmaDigital));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFirmaDigital>>();
      const firmaDigital = { id: 123 };
      jest.spyOn(firmaDigitalFormService, 'getFirmaDigital').mockReturnValue({ id: null });
      jest.spyOn(firmaDigitalService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ firmaDigital: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: firmaDigital }));
      saveSubject.complete();

      // THEN
      expect(firmaDigitalFormService.getFirmaDigital).toHaveBeenCalled();
      expect(firmaDigitalService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFirmaDigital>>();
      const firmaDigital = { id: 123 };
      jest.spyOn(firmaDigitalService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ firmaDigital });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(firmaDigitalService.update).toHaveBeenCalled();
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

    describe('comparePersona', () => {
      it('Should forward to personaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(personaService, 'comparePersona');
        comp.comparePersona(entity, entity2);
        expect(personaService.comparePersona).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
