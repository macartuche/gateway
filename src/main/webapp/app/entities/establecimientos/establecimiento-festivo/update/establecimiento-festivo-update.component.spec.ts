import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IEstablecimiento } from 'app/entities/establecimientos/establecimiento/establecimiento.model';
import { EstablecimientoService } from 'app/entities/establecimientos/establecimiento/service/establecimiento.service';
import { IFestivo } from 'app/entities/establecimientos/festivo/festivo.model';
import { FestivoService } from 'app/entities/establecimientos/festivo/service/festivo.service';
import { IEstablecimientoFestivo } from '../establecimiento-festivo.model';
import { EstablecimientoFestivoService } from '../service/establecimiento-festivo.service';
import { EstablecimientoFestivoFormService } from './establecimiento-festivo-form.service';

import { EstablecimientoFestivoUpdateComponent } from './establecimiento-festivo-update.component';

describe('EstablecimientoFestivo Management Update Component', () => {
  let comp: EstablecimientoFestivoUpdateComponent;
  let fixture: ComponentFixture<EstablecimientoFestivoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let establecimientoFestivoFormService: EstablecimientoFestivoFormService;
  let establecimientoFestivoService: EstablecimientoFestivoService;
  let establecimientoService: EstablecimientoService;
  let festivoService: FestivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), EstablecimientoFestivoUpdateComponent],
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
      .overrideTemplate(EstablecimientoFestivoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EstablecimientoFestivoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    establecimientoFestivoFormService = TestBed.inject(EstablecimientoFestivoFormService);
    establecimientoFestivoService = TestBed.inject(EstablecimientoFestivoService);
    establecimientoService = TestBed.inject(EstablecimientoService);
    festivoService = TestBed.inject(FestivoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Establecimiento query and add missing value', () => {
      const establecimientoFestivo: IEstablecimientoFestivo = { id: 456 };
      const establecimiento: IEstablecimiento = { id: 10204 };
      establecimientoFestivo.establecimiento = establecimiento;

      const establecimientoCollection: IEstablecimiento[] = [{ id: 29609 }];
      jest.spyOn(establecimientoService, 'query').mockReturnValue(of(new HttpResponse({ body: establecimientoCollection })));
      const additionalEstablecimientos = [establecimiento];
      const expectedCollection: IEstablecimiento[] = [...additionalEstablecimientos, ...establecimientoCollection];
      jest.spyOn(establecimientoService, 'addEstablecimientoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimientoFestivo });
      comp.ngOnInit();

      expect(establecimientoService.query).toHaveBeenCalled();
      expect(establecimientoService.addEstablecimientoToCollectionIfMissing).toHaveBeenCalledWith(
        establecimientoCollection,
        ...additionalEstablecimientos.map(expect.objectContaining),
      );
      expect(comp.establecimientosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Festivo query and add missing value', () => {
      const establecimientoFestivo: IEstablecimientoFestivo = { id: 456 };
      const festivo: IFestivo = { id: 11815 };
      establecimientoFestivo.festivo = festivo;

      const festivoCollection: IFestivo[] = [{ id: 4866 }];
      jest.spyOn(festivoService, 'query').mockReturnValue(of(new HttpResponse({ body: festivoCollection })));
      const additionalFestivos = [festivo];
      const expectedCollection: IFestivo[] = [...additionalFestivos, ...festivoCollection];
      jest.spyOn(festivoService, 'addFestivoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ establecimientoFestivo });
      comp.ngOnInit();

      expect(festivoService.query).toHaveBeenCalled();
      expect(festivoService.addFestivoToCollectionIfMissing).toHaveBeenCalledWith(
        festivoCollection,
        ...additionalFestivos.map(expect.objectContaining),
      );
      expect(comp.festivosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const establecimientoFestivo: IEstablecimientoFestivo = { id: 456 };
      const establecimiento: IEstablecimiento = { id: 1785 };
      establecimientoFestivo.establecimiento = establecimiento;
      const festivo: IFestivo = { id: 7271 };
      establecimientoFestivo.festivo = festivo;

      activatedRoute.data = of({ establecimientoFestivo });
      comp.ngOnInit();

      expect(comp.establecimientosSharedCollection).toContain(establecimiento);
      expect(comp.festivosSharedCollection).toContain(festivo);
      expect(comp.establecimientoFestivo).toEqual(establecimientoFestivo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstablecimientoFestivo>>();
      const establecimientoFestivo = { id: 123 };
      jest.spyOn(establecimientoFestivoFormService, 'getEstablecimientoFestivo').mockReturnValue(establecimientoFestivo);
      jest.spyOn(establecimientoFestivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ establecimientoFestivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: establecimientoFestivo }));
      saveSubject.complete();

      // THEN
      expect(establecimientoFestivoFormService.getEstablecimientoFestivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(establecimientoFestivoService.update).toHaveBeenCalledWith(expect.objectContaining(establecimientoFestivo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstablecimientoFestivo>>();
      const establecimientoFestivo = { id: 123 };
      jest.spyOn(establecimientoFestivoFormService, 'getEstablecimientoFestivo').mockReturnValue({ id: null });
      jest.spyOn(establecimientoFestivoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ establecimientoFestivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: establecimientoFestivo }));
      saveSubject.complete();

      // THEN
      expect(establecimientoFestivoFormService.getEstablecimientoFestivo).toHaveBeenCalled();
      expect(establecimientoFestivoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEstablecimientoFestivo>>();
      const establecimientoFestivo = { id: 123 };
      jest.spyOn(establecimientoFestivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ establecimientoFestivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(establecimientoFestivoService.update).toHaveBeenCalled();
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

    describe('compareFestivo', () => {
      it('Should forward to festivoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(festivoService, 'compareFestivo');
        comp.compareFestivo(entity, entity2);
        expect(festivoService.compareFestivo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
