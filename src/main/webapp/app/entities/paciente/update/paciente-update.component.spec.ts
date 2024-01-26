import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IDiscapacidad } from 'app/entities/discapacidad/discapacidad.model';
import { DiscapacidadService } from 'app/entities/discapacidad/service/discapacidad.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { IParroquiaTerritorio } from 'app/entities/parroquia-territorio/parroquia-territorio.model';
import { ParroquiaTerritorioService } from 'app/entities/parroquia-territorio/service/parroquia-territorio.service';
import { ICatalogoItem } from 'app/entities/catalogo-item/catalogo-item.model';
import { CatalogoItemService } from 'app/entities/catalogo-item/service/catalogo-item.service';
import { IPaciente } from '../paciente.model';
import { PacienteService } from '../service/paciente.service';
import { PacienteFormService } from './paciente-form.service';

import { PacienteUpdateComponent } from './paciente-update.component';

describe('Paciente Management Update Component', () => {
  let comp: PacienteUpdateComponent;
  let fixture: ComponentFixture<PacienteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pacienteFormService: PacienteFormService;
  let pacienteService: PacienteService;
  let discapacidadService: DiscapacidadService;
  let personaService: PersonaService;
  let parroquiaTerritorioService: ParroquiaTerritorioService;
  let catalogoItemService: CatalogoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), PacienteUpdateComponent],
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
      .overrideTemplate(PacienteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PacienteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pacienteFormService = TestBed.inject(PacienteFormService);
    pacienteService = TestBed.inject(PacienteService);
    discapacidadService = TestBed.inject(DiscapacidadService);
    personaService = TestBed.inject(PersonaService);
    parroquiaTerritorioService = TestBed.inject(ParroquiaTerritorioService);
    catalogoItemService = TestBed.inject(CatalogoItemService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Discapacidad query and add missing value', () => {
      const paciente: IPaciente = { id: 456 };
      const discapacidad: IDiscapacidad = { id: 27575 };
      paciente.discapacidad = discapacidad;

      const discapacidadCollection: IDiscapacidad[] = [{ id: 21603 }];
      jest.spyOn(discapacidadService, 'query').mockReturnValue(of(new HttpResponse({ body: discapacidadCollection })));
      const additionalDiscapacidads = [discapacidad];
      const expectedCollection: IDiscapacidad[] = [...additionalDiscapacidads, ...discapacidadCollection];
      jest.spyOn(discapacidadService, 'addDiscapacidadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      expect(discapacidadService.query).toHaveBeenCalled();
      expect(discapacidadService.addDiscapacidadToCollectionIfMissing).toHaveBeenCalledWith(
        discapacidadCollection,
        ...additionalDiscapacidads.map(expect.objectContaining),
      );
      expect(comp.discapacidadsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Persona query and add missing value', () => {
      const paciente: IPaciente = { id: 456 };
      const persona: IPersona = { id: 6801 };
      paciente.persona = persona;

      const personaCollection: IPersona[] = [{ id: 30807 }];
      jest.spyOn(personaService, 'query').mockReturnValue(of(new HttpResponse({ body: personaCollection })));
      const additionalPersonas = [persona];
      const expectedCollection: IPersona[] = [...additionalPersonas, ...personaCollection];
      jest.spyOn(personaService, 'addPersonaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      expect(personaService.query).toHaveBeenCalled();
      expect(personaService.addPersonaToCollectionIfMissing).toHaveBeenCalledWith(
        personaCollection,
        ...additionalPersonas.map(expect.objectContaining),
      );
      expect(comp.personasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call ParroquiaTerritorio query and add missing value', () => {
      const paciente: IPaciente = { id: 456 };
      const parroquiaNacimiento: IParroquiaTerritorio = { id: 8988 };
      paciente.parroquiaNacimiento = parroquiaNacimiento;
      const parroquiaResidencia: IParroquiaTerritorio = { id: 10573 };
      paciente.parroquiaResidencia = parroquiaResidencia;

      const parroquiaTerritorioCollection: IParroquiaTerritorio[] = [{ id: 30167 }];
      jest.spyOn(parroquiaTerritorioService, 'query').mockReturnValue(of(new HttpResponse({ body: parroquiaTerritorioCollection })));
      const additionalParroquiaTerritorios = [parroquiaNacimiento, parroquiaResidencia];
      const expectedCollection: IParroquiaTerritorio[] = [...additionalParroquiaTerritorios, ...parroquiaTerritorioCollection];
      jest.spyOn(parroquiaTerritorioService, 'addParroquiaTerritorioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      expect(parroquiaTerritorioService.query).toHaveBeenCalled();
      expect(parroquiaTerritorioService.addParroquiaTerritorioToCollectionIfMissing).toHaveBeenCalledWith(
        parroquiaTerritorioCollection,
        ...additionalParroquiaTerritorios.map(expect.objectContaining),
      );
      expect(comp.parroquiaTerritoriosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CatalogoItem query and add missing value', () => {
      const paciente: IPaciente = { id: 456 };
      const autoidentificacionEtnica: ICatalogoItem = { id: 14411 };
      paciente.autoidentificacionEtnica = autoidentificacionEtnica;
      const nacionalidadEtnica: ICatalogoItem = { id: 823 };
      paciente.nacionalidadEtnica = nacionalidadEtnica;
      const pueblo: ICatalogoItem = { id: 26303 };
      paciente.pueblo = pueblo;
      const tipoEmpresaTrabajo: ICatalogoItem = { id: 18554 };
      paciente.tipoEmpresaTrabajo = tipoEmpresaTrabajo;
      const profesionOcupacion: ICatalogoItem = { id: 30478 };
      paciente.profesionOcupacion = profesionOcupacion;
      const seguroSaludPrincipal: ICatalogoItem = { id: 29069 };
      paciente.seguroSaludPrincipal = seguroSaludPrincipal;
      const tipoBono: ICatalogoItem = { id: 8251 };
      paciente.tipoBono = tipoBono;
      const procedenciaRepresentante: ICatalogoItem = { id: 6564 };
      paciente.procedenciaRepresentante = procedenciaRepresentante;

      const catalogoItemCollection: ICatalogoItem[] = [{ id: 5276 }];
      jest.spyOn(catalogoItemService, 'query').mockReturnValue(of(new HttpResponse({ body: catalogoItemCollection })));
      const additionalCatalogoItems = [
        autoidentificacionEtnica,
        nacionalidadEtnica,
        pueblo,
        tipoEmpresaTrabajo,
        profesionOcupacion,
        seguroSaludPrincipal,
        tipoBono,
        procedenciaRepresentante,
      ];
      const expectedCollection: ICatalogoItem[] = [...additionalCatalogoItems, ...catalogoItemCollection];
      jest.spyOn(catalogoItemService, 'addCatalogoItemToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      expect(catalogoItemService.query).toHaveBeenCalled();
      expect(catalogoItemService.addCatalogoItemToCollectionIfMissing).toHaveBeenCalledWith(
        catalogoItemCollection,
        ...additionalCatalogoItems.map(expect.objectContaining),
      );
      expect(comp.catalogoItemsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const paciente: IPaciente = { id: 456 };
      const discapacidad: IDiscapacidad = { id: 3326 };
      paciente.discapacidad = discapacidad;
      const persona: IPersona = { id: 26719 };
      paciente.persona = persona;
      const parroquiaNacimiento: IParroquiaTerritorio = { id: 29722 };
      paciente.parroquiaNacimiento = parroquiaNacimiento;
      const parroquiaResidencia: IParroquiaTerritorio = { id: 21404 };
      paciente.parroquiaResidencia = parroquiaResidencia;
      const autoidentificacionEtnica: ICatalogoItem = { id: 6890 };
      paciente.autoidentificacionEtnica = autoidentificacionEtnica;
      const nacionalidadEtnica: ICatalogoItem = { id: 6553 };
      paciente.nacionalidadEtnica = nacionalidadEtnica;
      const pueblo: ICatalogoItem = { id: 14532 };
      paciente.pueblo = pueblo;
      const tipoEmpresaTrabajo: ICatalogoItem = { id: 21754 };
      paciente.tipoEmpresaTrabajo = tipoEmpresaTrabajo;
      const profesionOcupacion: ICatalogoItem = { id: 7066 };
      paciente.profesionOcupacion = profesionOcupacion;
      const seguroSaludPrincipal: ICatalogoItem = { id: 18400 };
      paciente.seguroSaludPrincipal = seguroSaludPrincipal;
      const tipoBono: ICatalogoItem = { id: 18544 };
      paciente.tipoBono = tipoBono;
      const procedenciaRepresentante: ICatalogoItem = { id: 8066 };
      paciente.procedenciaRepresentante = procedenciaRepresentante;

      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      expect(comp.discapacidadsSharedCollection).toContain(discapacidad);
      expect(comp.personasSharedCollection).toContain(persona);
      expect(comp.parroquiaTerritoriosSharedCollection).toContain(parroquiaNacimiento);
      expect(comp.parroquiaTerritoriosSharedCollection).toContain(parroquiaResidencia);
      expect(comp.catalogoItemsSharedCollection).toContain(autoidentificacionEtnica);
      expect(comp.catalogoItemsSharedCollection).toContain(nacionalidadEtnica);
      expect(comp.catalogoItemsSharedCollection).toContain(pueblo);
      expect(comp.catalogoItemsSharedCollection).toContain(tipoEmpresaTrabajo);
      expect(comp.catalogoItemsSharedCollection).toContain(profesionOcupacion);
      expect(comp.catalogoItemsSharedCollection).toContain(seguroSaludPrincipal);
      expect(comp.catalogoItemsSharedCollection).toContain(tipoBono);
      expect(comp.catalogoItemsSharedCollection).toContain(procedenciaRepresentante);
      expect(comp.paciente).toEqual(paciente);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaciente>>();
      const paciente = { id: 123 };
      jest.spyOn(pacienteFormService, 'getPaciente').mockReturnValue(paciente);
      jest.spyOn(pacienteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paciente }));
      saveSubject.complete();

      // THEN
      expect(pacienteFormService.getPaciente).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pacienteService.update).toHaveBeenCalledWith(expect.objectContaining(paciente));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaciente>>();
      const paciente = { id: 123 };
      jest.spyOn(pacienteFormService, 'getPaciente').mockReturnValue({ id: null });
      jest.spyOn(pacienteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paciente: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: paciente }));
      saveSubject.complete();

      // THEN
      expect(pacienteFormService.getPaciente).toHaveBeenCalled();
      expect(pacienteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPaciente>>();
      const paciente = { id: 123 };
      jest.spyOn(pacienteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ paciente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pacienteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareDiscapacidad', () => {
      it('Should forward to discapacidadService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(discapacidadService, 'compareDiscapacidad');
        comp.compareDiscapacidad(entity, entity2);
        expect(discapacidadService.compareDiscapacidad).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareParroquiaTerritorio', () => {
      it('Should forward to parroquiaTerritorioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(parroquiaTerritorioService, 'compareParroquiaTerritorio');
        comp.compareParroquiaTerritorio(entity, entity2);
        expect(parroquiaTerritorioService.compareParroquiaTerritorio).toHaveBeenCalledWith(entity, entity2);
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
