import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HorarioEstablecimientoService } from '../service/horario-establecimiento.service';
import { IHorarioEstablecimiento } from '../horario-establecimiento.model';
import { HorarioEstablecimientoFormService } from './horario-establecimiento-form.service';

import { HorarioEstablecimientoUpdateComponent } from './horario-establecimiento-update.component';

describe('HorarioEstablecimiento Management Update Component', () => {
  let comp: HorarioEstablecimientoUpdateComponent;
  let fixture: ComponentFixture<HorarioEstablecimientoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let horarioEstablecimientoFormService: HorarioEstablecimientoFormService;
  let horarioEstablecimientoService: HorarioEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), HorarioEstablecimientoUpdateComponent],
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
      .overrideTemplate(HorarioEstablecimientoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioEstablecimientoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    horarioEstablecimientoFormService = TestBed.inject(HorarioEstablecimientoFormService);
    horarioEstablecimientoService = TestBed.inject(HorarioEstablecimientoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const horarioEstablecimiento: IHorarioEstablecimiento = { id: 456 };

      activatedRoute.data = of({ horarioEstablecimiento });
      comp.ngOnInit();

      expect(comp.horarioEstablecimiento).toEqual(horarioEstablecimiento);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioEstablecimiento>>();
      const horarioEstablecimiento = { id: 123 };
      jest.spyOn(horarioEstablecimientoFormService, 'getHorarioEstablecimiento').mockReturnValue(horarioEstablecimiento);
      jest.spyOn(horarioEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(horarioEstablecimientoFormService.getHorarioEstablecimiento).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(horarioEstablecimientoService.update).toHaveBeenCalledWith(expect.objectContaining(horarioEstablecimiento));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioEstablecimiento>>();
      const horarioEstablecimiento = { id: 123 };
      jest.spyOn(horarioEstablecimientoFormService, 'getHorarioEstablecimiento').mockReturnValue({ id: null });
      jest.spyOn(horarioEstablecimientoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioEstablecimiento: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioEstablecimiento }));
      saveSubject.complete();

      // THEN
      expect(horarioEstablecimientoFormService.getHorarioEstablecimiento).toHaveBeenCalled();
      expect(horarioEstablecimientoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioEstablecimiento>>();
      const horarioEstablecimiento = { id: 123 };
      jest.spyOn(horarioEstablecimientoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioEstablecimiento });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(horarioEstablecimientoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
