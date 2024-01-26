import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IPaciente } from 'app/entities/paciente/paciente.model';
import { PacienteService } from 'app/entities/paciente/service/paciente.service';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { IContactoEmergenciaPaciente } from '../contacto-emergencia-paciente.model';
import { ContactoEmergenciaPacienteService } from '../service/contacto-emergencia-paciente.service';
import { ContactoEmergenciaPacienteFormService } from './contacto-emergencia-paciente-form.service';

import { ContactoEmergenciaPacienteUpdateComponent } from './contacto-emergencia-paciente-update.component';

describe('ContactoEmergenciaPaciente Management Update Component', () => {
  let comp: ContactoEmergenciaPacienteUpdateComponent;
  let fixture: ComponentFixture<ContactoEmergenciaPacienteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let contactoEmergenciaPacienteFormService: ContactoEmergenciaPacienteFormService;
  let contactoEmergenciaPacienteService: ContactoEmergenciaPacienteService;
  let pacienteService: PacienteService;
  let catalogoItemService: CatalogoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ContactoEmergenciaPacienteUpdateComponent],
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
      .overrideTemplate(ContactoEmergenciaPacienteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ContactoEmergenciaPacienteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    contactoEmergenciaPacienteFormService = TestBed.inject(ContactoEmergenciaPacienteFormService);
    contactoEmergenciaPacienteService = TestBed.inject(ContactoEmergenciaPacienteService);
    pacienteService = TestBed.inject(PacienteService);
    catalogoItemService = TestBed.inject(CatalogoItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Paciente query and add missing value', () => {
      const contactoEmergenciaPaciente: IContactoEmergenciaPaciente = { id: 456 };
      const paciente: IPaciente = { id: 30846 };
      contactoEmergenciaPaciente.paciente = paciente;

      const pacienteCollection: IPaciente[] = [{ id: 16804 }];
      jest.spyOn(pacienteService, 'query').mockReturnValue(of(new HttpResponse({ body: pacienteCollection })));
      const additionalPacientes = [paciente];
      const expectedCollection: IPaciente[] = [...additionalPacientes, ...pacienteCollection];
      jest.spyOn(pacienteService, 'addPacienteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contactoEmergenciaPaciente });
      comp.ngOnInit();

      expect(pacienteService.query).toHaveBeenCalled();
      expect(pacienteService.addPacienteToCollectionIfMissing).toHaveBeenCalledWith(
        pacienteCollection,
        ...additionalPacientes.map(expect.objectContaining),
      );
      expect(comp.pacientesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CatalogoItem query and add missing value', () => {
      const contactoEmergenciaPaciente: IContactoEmergenciaPaciente = { id: 456 };
      const parentezco: ICatalogoItem = { id: 4588 };
      contactoEmergenciaPaciente.parentezco = parentezco;

      const catalogoItemCollection: ICatalogoItem[] = [{ id: 28437 }];
      jest.spyOn(catalogoItemService, 'query').mockReturnValue(of(new HttpResponse({ body: catalogoItemCollection })));
      const additionalCatalogoItems = [parentezco];
      const expectedCollection: ICatalogoItem[] = [...additionalCatalogoItems, ...catalogoItemCollection];
      jest.spyOn(catalogoItemService, 'addCatalogoItemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ contactoEmergenciaPaciente });
      comp.ngOnInit();

      expect(catalogoItemService.query).toHaveBeenCalled();
      expect(catalogoItemService.addCatalogoItemToCollectionIfMissing).toHaveBeenCalledWith(
        catalogoItemCollection,
        ...additionalCatalogoItems.map(expect.objectContaining),
      );
      expect(comp.catalogoItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const contactoEmergenciaPaciente: IContactoEmergenciaPaciente = { id: 456 };
      const paciente: IPaciente = { id: 30392 };
      contactoEmergenciaPaciente.paciente = paciente;
      const parentezco: ICatalogoItem = { id: 26479 };
      contactoEmergenciaPaciente.parentezco = parentezco;

      activatedRoute.data = of({ contactoEmergenciaPaciente });
      comp.ngOnInit();

      expect(comp.pacientesSharedCollection).toContain(paciente);
      expect(comp.catalogoItemsSharedCollection).toContain(parentezco);
      expect(comp.contactoEmergenciaPaciente).toEqual(contactoEmergenciaPaciente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactoEmergenciaPaciente>>();
      const contactoEmergenciaPaciente = { id: 123 };
      jest.spyOn(contactoEmergenciaPacienteFormService, 'getContactoEmergenciaPaciente').mockReturnValue(contactoEmergenciaPaciente);
      jest.spyOn(contactoEmergenciaPacienteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactoEmergenciaPaciente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contactoEmergenciaPaciente }));
      saveSubject.complete();

      // THEN
      expect(contactoEmergenciaPacienteFormService.getContactoEmergenciaPaciente).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(contactoEmergenciaPacienteService.update).toHaveBeenCalledWith(expect.objectContaining(contactoEmergenciaPaciente));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactoEmergenciaPaciente>>();
      const contactoEmergenciaPaciente = { id: 123 };
      jest.spyOn(contactoEmergenciaPacienteFormService, 'getContactoEmergenciaPaciente').mockReturnValue({ id: null });
      jest.spyOn(contactoEmergenciaPacienteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactoEmergenciaPaciente: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: contactoEmergenciaPaciente }));
      saveSubject.complete();

      // THEN
      expect(contactoEmergenciaPacienteFormService.getContactoEmergenciaPaciente).toHaveBeenCalled();
      expect(contactoEmergenciaPacienteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IContactoEmergenciaPaciente>>();
      const contactoEmergenciaPaciente = { id: 123 };
      jest.spyOn(contactoEmergenciaPacienteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ contactoEmergenciaPaciente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(contactoEmergenciaPacienteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePaciente', () => {
      it('Should forward to pacienteService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pacienteService, 'comparePaciente');
        comp.comparePaciente(entity, entity2);
        expect(pacienteService.comparePaciente).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
