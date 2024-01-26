import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { EstablecimientoService } from 'app/entities/establecimientos/establecimiento/service/establecimiento.service';
import { DoctorEspecialidadEstablecimientoService } from '../service/doctor-especialidad-establecimiento.service';
import { IDoctorEspecialidadEstablecimiento } from '../doctor-especialidad-establecimiento.model';
import { DoctorEspecialidadEstablecimientoFormService } from './doctor-especialidad-establecimiento-form.service';

import { DoctorEspecialidadEstablecimientoUpdateComponent } from './doctor-especialidad-establecimiento-update.component';

describe('DoctorEspecialidadEstablecimiento Management Update Component', () => {
  let comp: DoctorEspecialidadEstablecimientoUpdateComponent;
  let fixture: ComponentFixture<DoctorEspecialidadEstablecimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let doctorEspecialidadEstablecimientoFormService: DoctorEspecialidadEstablecimientoFormService;
  let doctorEspecialidadEstablecimientoService: DoctorEspecialidadEstablecimientoService;
  let establecimientoService: EstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DoctorEspecialidadEstablecimientoUpdateComponent],
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
      .overrideTemplate(DoctorEspecialidadEstablecimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DoctorEspecialidadEstablecimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    doctorEspecialidadEstablecimientoFormService = TestBed.inject(DoctorEspecialidadEstablecimientoFormService);
    doctorEspecialidadEstablecimientoService = TestBed.inject(DoctorEspecialidadEstablecimientoService);
    establecimientoService = TestBed.inject(EstablecimientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Establecimiento query and add missing value', () => {
      const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = { id: 456 };
      const establecimiento: IEstablecimiento = { id: 21267 };
      doctorEspecialidadEstablecimiento.establecimiento = establecimiento;

      const establecimientoCollection: IEstablecimiento[] = [{ id: 19508 }];
      jest.spyOn(establecimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: establecimientoCollection })));
      const additionalEstablecimientos = [establecimiento];
      const expectedCollection: IEstablecimiento[] = [...additionalEstablecimientos, ...establecimientoCollection];
      jest.spyOn(establecimientoService, 'addEstablecimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ doctorEspecialidadEstablecimiento });
      comp.ngOnInit();

      expect(establecimientoService.query).toHaveBeenCalled();
      expect(establecimientoService.addEstablecimientoToCollectionIfMissing).toHaveBeenCalledWith(
        establecimientoCollection,
        ...additionalEstablecimientos.map(expect.objectContaining),
      );
      expect(comp.establecimientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const doctorEspecialidadEstablecimiento: IDoctorEspecialidadEstablecimiento = { id: 456 };
      const establecimiento: IEstablecimiento = { id: 16981 };
      doctorEspecialidadEstablecimiento.establecimiento = establecimiento;

      activatedRoute.data = of({ doctorEspecialidadEstablecimiento });
      comp.ngOnInit();

      expect(comp.establecimientosSharedCollection).toContain(establecimiento);
      expect(comp.doctorEspecialidadEstablecimiento).toEqual(doctorEspecialidadEstablecimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDoctorEspecialidadEstablecimiento>>();
      const doctorEspecialidadEstablecimiento = { id: 123 };
      jest
        .spyOn(doctorEspecialidadEstablecimientoFormService, 'getDoctorEspecialidadEstablecimiento')
        .mockReturnValue(doctorEspecialidadEstablecimiento);
      jest.spyOn(doctorEspecialidadEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ doctorEspecialidadEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: doctorEspecialidadEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(doctorEspecialidadEstablecimientoFormService.getDoctorEspecialidadEstablecimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(doctorEspecialidadEstablecimientoService.update).toHaveBeenCalledWith(
        expect.objectContaining(doctorEspecialidadEstablecimiento),
      );
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDoctorEspecialidadEstablecimiento>>();
      const doctorEspecialidadEstablecimiento = { id: 123 };
      jest.spyOn(doctorEspecialidadEstablecimientoFormService, 'getDoctorEspecialidadEstablecimiento').mockReturnValue({ id: null });
      jest.spyOn(doctorEspecialidadEstablecimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ doctorEspecialidadEstablecimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: doctorEspecialidadEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(doctorEspecialidadEstablecimientoFormService.getDoctorEspecialidadEstablecimiento).toHaveBeenCalled();
      expect(doctorEspecialidadEstablecimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDoctorEspecialidadEstablecimiento>>();
      const doctorEspecialidadEstablecimiento = { id: 123 };
      jest.spyOn(doctorEspecialidadEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ doctorEspecialidadEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(doctorEspecialidadEstablecimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEstablecimiento', () => {
      it('Should forward to establecimientoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(establecimientoService, 'compareEstablecimiento');
        comp.compareEstablecimiento(entity, entity2);
        expect(establecimientoService.compareEstablecimiento).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
