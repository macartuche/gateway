import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IParroquia } from 'app/entities/establecimientos/parroquia/parroquia.model';
import { ParroquiaService } from 'app/entities/establecimientos/parroquia/service/parroquia.service';
import { IEntidad } from 'app/entities/establecimientos/entidad/entidad.model';
import { EntidadService } from 'app/entities/establecimientos/entidad/service/entidad.service';
import { IInstitucion } from 'app/entities/establecimientos/institucion/institucion.model';
import { InstitucionService } from 'app/entities/establecimientos/institucion/service/institucion.service';
import { ITipoEstablecimiento } from 'app/entities/establecimientos/tipo-establecimiento/tipo-establecimiento.model';
import { TipoEstablecimientoService } from 'app/entities/establecimientos/tipo-establecimiento/service/tipo-establecimiento.service';
import { IHorarioEstablecimiento } from 'app/entities/establecimientos/horario-establecimiento/horario-establecimiento.model';
import { HorarioEstablecimientoService } from 'app/entities/establecimientos/horario-establecimiento/service/horario-establecimiento.service';
import { IEstablecimiento } from '../establecimiento.model';
import { EstablecimientoService } from '../service/establecimiento.service';
import { EstablecimientoFormService } from './establecimiento-form.service';

import { EstablecimientoUpdateComponent } from './establecimiento-update.component';

describe('Establecimiento Management Update Component', () => {
  let comp: EstablecimientoUpdateComponent;
  let fixture: ComponentFixture<EstablecimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let establecimientoFormService: EstablecimientoFormService;
  let establecimientoService: EstablecimientoService;
  let parroquiaService: ParroquiaService;
  let entidadService: EntidadService;
  let institucionService: InstitucionService;
  let tipoEstablecimientoService: TipoEstablecimientoService;
  let horarioEstablecimientoService: HorarioEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), EstablecimientoUpdateComponent],
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
      .overrideTemplate(EstablecimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EstablecimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    establecimientoFormService = TestBed.inject(EstablecimientoFormService);
    establecimientoService = TestBed.inject(EstablecimientoService);
    parroquiaService = TestBed.inject(ParroquiaService);
    entidadService = TestBed.inject(EntidadService);
    institucionService = TestBed.inject(InstitucionService);
    tipoEstablecimientoService = TestBed.inject(TipoEstablecimientoService);
    horarioEstablecimientoService = TestBed.inject(HorarioEstablecimientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Parroquia query and add missing value', () => {
      const establecimiento: IEstablecimiento = { id: 456 };
      const parroquia: IParroquia = { id: 12127 };
      establecimiento.parroquia = parroquia;

      const parroquiaCollection: IParroquia[] = [{ id: 9923 }];
      jest.spyOn(parroquiaService, 'query').mockReturnValue(of(new HttpResponse({ body: parroquiaCollection })));
      const additionalParroquias = [parroquia];
      const expectedCollection: IParroquia[] = [...additionalParroquias, ...parroquiaCollection];
      jest.spyOn(parroquiaService, 'addParroquiaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      expect(parroquiaService.query).toHaveBeenCalled();
      expect(parroquiaService.addParroquiaToCollectionIfMissing).toHaveBeenCalledWith(
        parroquiaCollection,
        ...additionalParroquias.map(expect.objectContaining),
      );
      expect(comp.parroquiasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Entidad query and add missing value', () => {
      const establecimiento: IEstablecimiento = { id: 456 };
      const entidad: IEntidad = { id: 21585 };
      establecimiento.entidad = entidad;

      const entidadCollection: IEntidad[] = [{ id: 7724 }];
      jest.spyOn(entidadService, 'query').mockReturnValue(of(new HttpResponse({ body: entidadCollection })));
      const additionalEntidads = [entidad];
      const expectedCollection: IEntidad[] = [...additionalEntidads, ...entidadCollection];
      jest.spyOn(entidadService, 'addEntidadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      expect(entidadService.query).toHaveBeenCalled();
      expect(entidadService.addEntidadToCollectionIfMissing).toHaveBeenCalledWith(
        entidadCollection,
        ...additionalEntidads.map(expect.objectContaining),
      );
      expect(comp.entidadsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Institucion query and add missing value', () => {
      const establecimiento: IEstablecimiento = { id: 456 };
      const institucion: IInstitucion = { id: 18527 };
      establecimiento.institucion = institucion;

      const institucionCollection: IInstitucion[] = [{ id: 12092 }];
      jest.spyOn(institucionService, 'query').mockReturnValue(of(new HttpResponse({ body: institucionCollection })));
      const additionalInstitucions = [institucion];
      const expectedCollection: IInstitucion[] = [...additionalInstitucions, ...institucionCollection];
      jest.spyOn(institucionService, 'addInstitucionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      expect(institucionService.query).toHaveBeenCalled();
      expect(institucionService.addInstitucionToCollectionIfMissing).toHaveBeenCalledWith(
        institucionCollection,
        ...additionalInstitucions.map(expect.objectContaining),
      );
      expect(comp.institucionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TipoEstablecimiento query and add missing value', () => {
      const establecimiento: IEstablecimiento = { id: 456 };
      const tipo: ITipoEstablecimiento = { id: 25667 };
      establecimiento.tipo = tipo;

      const tipoEstablecimientoCollection: ITipoEstablecimiento[] = [{ id: 4559 }];
      jest.spyOn(tipoEstablecimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoEstablecimientoCollection })));
      const additionalTipoEstablecimientos = [tipo];
      const expectedCollection: ITipoEstablecimiento[] = [...additionalTipoEstablecimientos, ...tipoEstablecimientoCollection];
      jest.spyOn(tipoEstablecimientoService, 'addTipoEstablecimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      expect(tipoEstablecimientoService.query).toHaveBeenCalled();
      expect(tipoEstablecimientoService.addTipoEstablecimientoToCollectionIfMissing).toHaveBeenCalledWith(
        tipoEstablecimientoCollection,
        ...additionalTipoEstablecimientos.map(expect.objectContaining),
      );
      expect(comp.tipoEstablecimientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call HorarioEstablecimiento query and add missing value', () => {
      const establecimiento: IEstablecimiento = { id: 456 };
      const horario: IHorarioEstablecimiento = { id: 20108 };
      establecimiento.horario = horario;

      const horarioEstablecimientoCollection: IHorarioEstablecimiento[] = [{ id: 6406 }];
      jest.spyOn(horarioEstablecimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioEstablecimientoCollection })));
      const additionalHorarioEstablecimientos = [horario];
      const expectedCollection: IHorarioEstablecimiento[] = [...additionalHorarioEstablecimientos, ...horarioEstablecimientoCollection];
      jest.spyOn(horarioEstablecimientoService, 'addHorarioEstablecimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      expect(horarioEstablecimientoService.query).toHaveBeenCalled();
      expect(horarioEstablecimientoService.addHorarioEstablecimientoToCollectionIfMissing).toHaveBeenCalledWith(
        horarioEstablecimientoCollection,
        ...additionalHorarioEstablecimientos.map(expect.objectContaining),
      );
      expect(comp.horarioEstablecimientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const establecimiento: IEstablecimiento = { id: 456 };
      const parroquia: IParroquia = { id: 30479 };
      establecimiento.parroquia = parroquia;
      const entidad: IEntidad = { id: 26696 };
      establecimiento.entidad = entidad;
      const institucion: IInstitucion = { id: 29232 };
      establecimiento.institucion = institucion;
      const tipo: ITipoEstablecimiento = { id: 31082 };
      establecimiento.tipo = tipo;
      const horario: IHorarioEstablecimiento = { id: 27371 };
      establecimiento.horario = horario;

      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      expect(comp.parroquiasSharedCollection).toContain(parroquia);
      expect(comp.entidadsSharedCollection).toContain(entidad);
      expect(comp.institucionsSharedCollection).toContain(institucion);
      expect(comp.tipoEstablecimientosSharedCollection).toContain(tipo);
      expect(comp.horarioEstablecimientosSharedCollection).toContain(horario);
      expect(comp.establecimiento).toEqual(establecimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstablecimiento>>();
      const establecimiento = { id: 123 };
      jest.spyOn(establecimientoFormService, 'getEstablecimiento').mockReturnValue(establecimiento);
      jest.spyOn(establecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: establecimiento }));
      saveSubject.complete();

      // THEN
      expect(establecimientoFormService.getEstablecimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(establecimientoService.update).toHaveBeenCalledWith(expect.objectContaining(establecimiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstablecimiento>>();
      const establecimiento = { id: 123 };
      jest.spyOn(establecimientoFormService, 'getEstablecimiento').mockReturnValue({ id: null });
      jest.spyOn(establecimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ establecimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: establecimiento }));
      saveSubject.complete();

      // THEN
      expect(establecimientoFormService.getEstablecimiento).toHaveBeenCalled();
      expect(establecimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstablecimiento>>();
      const establecimiento = { id: 123 };
      jest.spyOn(establecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ establecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(establecimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareParroquia', () => {
      it('Should forward to parroquiaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(parroquiaService, 'compareParroquia');
        comp.compareParroquia(entity, entity2);
        expect(parroquiaService.compareParroquia).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEntidad', () => {
      it('Should forward to entidadService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entidadService, 'compareEntidad');
        comp.compareEntidad(entity, entity2);
        expect(entidadService.compareEntidad).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareInstitucion', () => {
      it('Should forward to institucionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(institucionService, 'compareInstitucion');
        comp.compareInstitucion(entity, entity2);
        expect(institucionService.compareInstitucion).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTipoEstablecimiento', () => {
      it('Should forward to tipoEstablecimientoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoEstablecimientoService, 'compareTipoEstablecimiento');
        comp.compareTipoEstablecimiento(entity, entity2);
        expect(tipoEstablecimientoService.compareTipoEstablecimiento).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareHorarioEstablecimiento', () => {
      it('Should forward to horarioEstablecimientoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(horarioEstablecimientoService, 'compareHorarioEstablecimiento');
        comp.compareHorarioEstablecimiento(entity, entity2);
        expect(horarioEstablecimientoService.compareHorarioEstablecimiento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
