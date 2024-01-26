import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITurno } from 'app/entities/citasmedicas/turno/turno.model';
import { TurnoService } from 'app/entities/citasmedicas/turno/service/turno.service';
import { CitaMedicaService } from '../service/cita-medica.service';
import { ICitaMedica } from '../cita-medica.model';
import { CitaMedicaFormService } from './cita-medica-form.service';

import { CitaMedicaUpdateComponent } from './cita-medica-update.component';

describe('CitaMedica Management Update Component', () => {
  let comp: CitaMedicaUpdateComponent;
  let fixture: ComponentFixture<CitaMedicaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let citaMedicaFormService: CitaMedicaFormService;
  let citaMedicaService: CitaMedicaService;
  let turnoService: TurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CitaMedicaUpdateComponent],
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
      .overrideTemplate(CitaMedicaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CitaMedicaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    citaMedicaFormService = TestBed.inject(CitaMedicaFormService);
    citaMedicaService = TestBed.inject(CitaMedicaService);
    turnoService = TestBed.inject(TurnoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Turno query and add missing value', () => {
      const citaMedica: ICitaMedica = { id: 456 };
      const turno: ITurno = { id: 26564 };
      citaMedica.turno = turno;

      const turnoCollection: ITurno[] = [{ id: 31318 }];
      jest.spyOn(turnoService, 'query').mockReturnValue(of(new HttpResponse({ body: turnoCollection })));
      const additionalTurnos = [turno];
      const expectedCollection: ITurno[] = [...additionalTurnos, ...turnoCollection];
      jest.spyOn(turnoService, 'addTurnoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ citaMedica });
      comp.ngOnInit();

      expect(turnoService.query).toHaveBeenCalled();
      expect(turnoService.addTurnoToCollectionIfMissing).toHaveBeenCalledWith(
        turnoCollection,
        ...additionalTurnos.map(expect.objectContaining),
      );
      expect(comp.turnosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const citaMedica: ICitaMedica = { id: 456 };
      const turno: ITurno = { id: 7615 };
      citaMedica.turno = turno;

      activatedRoute.data = of({ citaMedica });
      comp.ngOnInit();

      expect(comp.turnosSharedCollection).toContain(turno);
      expect(comp.citaMedica).toEqual(citaMedica);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICitaMedica>>();
      const citaMedica = { id: 123 };
      jest.spyOn(citaMedicaFormService, 'getCitaMedica').mockReturnValue(citaMedica);
      jest.spyOn(citaMedicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ citaMedica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: citaMedica }));
      saveSubject.complete();

      // THEN
      expect(citaMedicaFormService.getCitaMedica).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(citaMedicaService.update).toHaveBeenCalledWith(expect.objectContaining(citaMedica));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICitaMedica>>();
      const citaMedica = { id: 123 };
      jest.spyOn(citaMedicaFormService, 'getCitaMedica').mockReturnValue({ id: null });
      jest.spyOn(citaMedicaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ citaMedica: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: citaMedica }));
      saveSubject.complete();

      // THEN
      expect(citaMedicaFormService.getCitaMedica).toHaveBeenCalled();
      expect(citaMedicaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICitaMedica>>();
      const citaMedica = { id: 123 };
      jest.spyOn(citaMedicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ citaMedica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(citaMedicaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTurno', () => {
      it('Should forward to turnoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(turnoService, 'compareTurno');
        comp.compareTurno(entity, entity2);
        expect(turnoService.compareTurno).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
