import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ITurno } from 'app/entities/citasmedicas/turno/turno.model';
import { TurnoService } from 'app/entities/citasmedicas/turno/service/turno.service';
import { BloqueoTurnoService } from '../service/bloqueo-turno.service';
import { IBloqueoTurno } from '../bloqueo-turno.model';
import { BloqueoTurnoFormService } from './bloqueo-turno-form.service';

import { BloqueoTurnoUpdateComponent } from './bloqueo-turno-update.component';

describe('BloqueoTurno Management Update Component', () => {
  let comp: BloqueoTurnoUpdateComponent;
  let fixture: ComponentFixture<BloqueoTurnoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let bloqueoTurnoFormService: BloqueoTurnoFormService;
  let bloqueoTurnoService: BloqueoTurnoService;
  let turnoService: TurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), BloqueoTurnoUpdateComponent],
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
      .overrideTemplate(BloqueoTurnoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BloqueoTurnoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    bloqueoTurnoFormService = TestBed.inject(BloqueoTurnoFormService);
    bloqueoTurnoService = TestBed.inject(BloqueoTurnoService);
    turnoService = TestBed.inject(TurnoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Turno query and add missing value', () => {
      const bloqueoTurno: IBloqueoTurno = { id: 456 };
      const turno: ITurno = { id: 25220 };
      bloqueoTurno.turno = turno;

      const turnoCollection: ITurno[] = [{ id: 18289 }];
      jest.spyOn(turnoService, 'query').mockReturnValue(of(new HttpResponse({ body: turnoCollection })));
      const additionalTurnos = [turno];
      const expectedCollection: ITurno[] = [...additionalTurnos, ...turnoCollection];
      jest.spyOn(turnoService, 'addTurnoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ bloqueoTurno });
      comp.ngOnInit();

      expect(turnoService.query).toHaveBeenCalled();
      expect(turnoService.addTurnoToCollectionIfMissing).toHaveBeenCalledWith(
        turnoCollection,
        ...additionalTurnos.map(expect.objectContaining),
      );
      expect(comp.turnosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const bloqueoTurno: IBloqueoTurno = { id: 456 };
      const turno: ITurno = { id: 25920 };
      bloqueoTurno.turno = turno;

      activatedRoute.data = of({ bloqueoTurno });
      comp.ngOnInit();

      expect(comp.turnosSharedCollection).toContain(turno);
      expect(comp.bloqueoTurno).toEqual(bloqueoTurno);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBloqueoTurno>>();
      const bloqueoTurno = { id: 123 };
      jest.spyOn(bloqueoTurnoFormService, 'getBloqueoTurno').mockReturnValue(bloqueoTurno);
      jest.spyOn(bloqueoTurnoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bloqueoTurno });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bloqueoTurno }));
      saveSubject.complete();

      // THEN
      expect(bloqueoTurnoFormService.getBloqueoTurno).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(bloqueoTurnoService.update).toHaveBeenCalledWith(expect.objectContaining(bloqueoTurno));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBloqueoTurno>>();
      const bloqueoTurno = { id: 123 };
      jest.spyOn(bloqueoTurnoFormService, 'getBloqueoTurno').mockReturnValue({ id: null });
      jest.spyOn(bloqueoTurnoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bloqueoTurno: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: bloqueoTurno }));
      saveSubject.complete();

      // THEN
      expect(bloqueoTurnoFormService.getBloqueoTurno).toHaveBeenCalled();
      expect(bloqueoTurnoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBloqueoTurno>>();
      const bloqueoTurno = { id: 123 };
      jest.spyOn(bloqueoTurnoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ bloqueoTurno });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(bloqueoTurnoService.update).toHaveBeenCalled();
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
